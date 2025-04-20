import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineTheme,
  Center,
  Loader,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { EmailData } from "../dashboard/EmailTable";
import Surface from "./Surface";

type RevenueChartProps = PaperProps;

interface YearlyData {
  applied: number;
  interviews: number;
  offers: number;
  rejections: number;
}

export default function AllTimeAnalytics({ ...others }: RevenueChartProps) {
  const theme = useMantineTheme();
  const [yearlyData, setYearlyData] = useState<Record<string, YearlyData>>({});
  const [years, setYears] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/email/get_db");
        const data: EmailData[] = await response.json();

        // Process data by year
        const processedData: Record<string, YearlyData> = {};

        // First, count occurrences by year
        data.forEach((email) => {
          const year = new Date(email.received).getFullYear().toString();

          if (!processedData[year]) {
            processedData[year] = {
              applied: 0,
              interviews: 0,
              offers: 0,
              rejections: 0,
            };
          }

          switch (email.status) {
            case "APPLIED":
              processedData[year].applied++;
              break;
            case "INTERVIEW":
              processedData[year].interviews++;
              break;
            case "OFFER":
              processedData[year].offers++;
              break;
            case "REJECTED":
              processedData[year].rejections++;
              break;
          }
        });

        // Sort years chronologically
        const sortedYears = Object.keys(processedData).sort();

        // Calculate cumulative totals
        let cumulativeApplied = 0;
        let cumulativeInterviews = 0;
        let cumulativeOffers = 0;
        let cumulativeRejections = 0;

        sortedYears.forEach((year) => {
          cumulativeApplied += processedData[year].applied;
          cumulativeInterviews += processedData[year].interviews;
          cumulativeOffers += processedData[year].offers;
          cumulativeRejections += processedData[year].rejections;

          processedData[year].applied = cumulativeApplied;
          processedData[year].interviews = cumulativeInterviews;
          processedData[year].offers = cumulativeOffers;
          processedData[year].rejections = cumulativeRejections;
        });

        setYears(sortedYears);
        setYearlyData(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Surface component={Paper} {...others} style={{ borderRadius: 15 }}>
        <Center h={400}>
          <Loader />
        </Center>
      </Surface>
    );
  }

  const series = [
    {
      name: "Applied",
      data: years.map((year) => yearlyData[year]?.applied || 0),
    },
    {
      name: "Interviews",
      data: years.map((year) => yearlyData[year]?.interviews || 0),
    },
    {
      name: "Offers",
      data: years.map((year) => yearlyData[year]?.offers || 0),
    },
    {
      name: "Rejected",
      data: years.map((year) => yearlyData[year]?.rejections || 0),
    },
  ];

  const options: any = {
    chart: {
      height: 350,
      type: "area",
      fontFamily: "Open Sans, sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: years,
      labels: {
        style: {
          colors: theme.white,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.colors.green,
        },
      },
    },
    tooltip: {
      x: {
        format: "yyyy",
      },
    },
    colors: [
      theme.colors[theme.primaryColor][5],
      theme.colors.cyan[9],
      theme.colors.green[9],
      theme.colors.red[9],
    ],
    legend: {
      labels: {
        colors: theme.white,
      },
    },
  };

  return (
    <Surface
      component={Paper}
      {...others}
      style={{
        borderRadius: 15,
      }}
    >
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600} pl={10}>
          Applications All-Time (Cumulative)
        </Text>
        <ActionIcon variant="subtle">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </Surface>
  );
}
