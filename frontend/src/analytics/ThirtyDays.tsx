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
import { useMediaQuery } from "@mantine/hooks";
import { IconDotsVertical } from "@tabler/icons-react";
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { EmailData } from "../dashboard/EmailTable";
import Surface from "./Surface";

type Last30DaysChartProps = PaperProps;

interface DailyData {
  applied: number;
  interviews: number;
  offers: number;
  rejections: number;
}

export default function ThirtyDaysAnalytics({
  ...others
}: Last30DaysChartProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 768px)", true, {
    getInitialValueInEffect: false,
  });
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState<Record<string, DailyData>>({});
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/email/get_db");
        const data: EmailData[] = await response.json();
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        const dateList: string[] = [];
        const processedData: Record<string, DailyData> = {};

        for (let i = 0; i < 31; i++) {
          const date = new Date(thirtyDaysAgo);
          date.setDate(thirtyDaysAgo.getDate() + i);
          const dateStr = date.toISOString().slice(0, 10);
          dateList.push(dateStr);
          processedData[dateStr] = {
            applied: 0,
            interviews: 0,
            offers: 0,
            rejections: 0,
          };
        }

        data.forEach((email) => {
          const emailDate = new Date(email.received).toISOString().slice(0, 10);
          if (processedData[emailDate]) {
            switch (email.status) {
              case "APPLIED":
                processedData[emailDate].applied++;
                break;
              case "INTERVIEW":
                processedData[emailDate].interviews++;
                break;
              case "OFFER":
                processedData[emailDate].offers++;
                break;
              case "REJECTED":
                processedData[emailDate].rejections++;
                break;
            }
          }
        });

        let totalApplied = 0;
        let totalInterviews = 0;
        let totalOffers = 0;
        let totalRejections = 0;

        dateList.forEach((date) => {
          totalApplied += processedData[date].applied;
          totalInterviews += processedData[date].interviews;
          totalOffers += processedData[date].offers;
          totalRejections += processedData[date].rejections;

          processedData[date].applied = totalApplied;
          processedData[date].interviews = totalInterviews;
          processedData[date].offers = totalOffers;
          processedData[date].rejections = totalRejections;
        });

        setDates(dateList);
        setDailyData(processedData);
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
      data: dates.map((date) => dailyData[date]?.applied || 0),
    },
    {
      name: "Interviews",
      data: dates.map((date) => dailyData[date]?.interviews || 0),
    },
    {
      name: "Offers",
      data: dates.map((date) => dailyData[date]?.offers || 0),
    },
    {
      name: "Rejected",
      data: dates.map((date) => dailyData[date]?.rejections || 0),
    },
  ];

  const options: any = {
    chart: {
      height: 350,
      type: "area",
      fontFamily: "Open Sans, sans-serif",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "category",
      categories: dates,
      labels: {
        rotate: 0,
        formatter: (value: string) => {
          if (value === dates[0] || value === dates[dates.length - 1]) {
            return value;
          }
          return "";
        },
        style: {
          colors: theme.white,
          fontSize: isMobile ? "10px" : "12px",
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
      x: { format: "yyyy-MM-dd" },
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
    <Surface component={Paper} {...others} style={{ borderRadius: 15 }}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600} pl={10}>
          Past 30 Days of Applications (total)
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
        width="100%"
      />
    </Surface>
  );
}
