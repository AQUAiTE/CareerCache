import { Container, Title, Paper, Grid, Center, Loader } from '@mantine/core';
import ReactApexChart from 'react-apexcharts';
import { EmailData } from '../dashboard/EmailTable';
import { useEffect, useState } from 'react';


const calculateChartData = (data: EmailData[]) => {
  const totals: Record<EmailData['status'], number> = {
    'APPLIED': 0,
    'INTERVIEW': 0,
    'REJECTED': 0,
    'OFFER': 0,
  };

  data.forEach((item) => {
    totals[item.status]++;
  });

  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(totals).map(([status, count]) => ({
    status: status as EmailData['status'],
    percentage: (count / total) * 100,
  }));

  return {
    totals: Object.entries(totals).map(([status, count]) => ({
      status: status as EmailData['status'],
      count,
    })),
    percentages,
  };
};

export default function Analytics() {
  const [data, setData] = useState<EmailData[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:8000/email/get_db")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <Center h={400}>
          <Loader />
        </Center>
      );
    }

  const { totals, percentages } = calculateChartData(data);

  const totalChartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: totals.map((item) => item.status),
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
        },
      },
    },
    colors: ['#228BE6', '#FCC419', '#40C057'],
    title: {
      text: 'Total Emails by Category',
      align: 'center' as const,
      style: {
        color: '#fff',
      },
    },
  };

  const percentageChartOptions = {
    ...totalChartOptions,
    title: {
      text: 'Email Distribution by Category (%)',
      align: 'center' as const,
      style: {
        color: '#fff',
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value.toFixed(1)}%`,
        style: {
          colors: '#fff',
        },
      },
    },
  };

  const totalChartSeries = [
    {
      name: 'Total Emails',
      data: totals.map((item) => item.count),
    },
  ];

  const percentageChartSeries = [
    {
      name: 'Percentage',
      data: percentages.map((item) => Number(item.percentage.toFixed(1))),
    },
  ];

  return (
    <Container size='xl' py='xl'>
      <Title order={1} mb='lg'>
        Email Analytics
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow='sm' p='md' radius='md'>
            <ReactApexChart
              options={totalChartOptions}
              series={totalChartSeries}
              type='bar'
              height={350}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow='sm' p='md' radius='md'>
            <ReactApexChart
              options={percentageChartOptions}
              series={percentageChartSeries}
              type='bar'
              height={350}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
