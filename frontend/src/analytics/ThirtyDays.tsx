import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconDotsVertical } from '@tabler/icons-react'
import Chart from 'react-apexcharts'
import Surface from './Surface'

type Last30DaysChartProps = PaperProps

export default function ThirtyDaysAnalytics({ ...others }: Last30DaysChartProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 768px)', true, {
    getInitialValueInEffect: false,
  })

  const today = new Date()
  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(today.getDate() - 30)

  const dates: string[] = []
  const appliedData: number[] = []
  const interviewsData: number[] = []
  const offersData: number[] = []

  for (let i = 0; i < 31; i++) {
    const date = new Date(thirtyDaysAgo)
    date.setDate(thirtyDaysAgo.getDate() + i)
    dates.push(date.toISOString().slice(0, 10))
    appliedData.push(Math.floor(Math.random() * 20) + 10)
    interviewsData.push(Math.floor(Math.random() * 5))
    offersData.push(Math.floor(Math.random() * 2))
  }

  const series = [
    { name: 'Applied', data: appliedData },
    { name: 'Interviews', data: interviewsData },
    { name: 'Offers', data: offersData },
  ]

  const options: any = {
    chart: {
      height: 350,
      type: 'area',
      fontFamily: 'Open Sans, sans-serif',
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'category',
      categories: dates,
      labels: {
        rotate: 0,
        formatter: (value: string) => {
        if (value === dates[0] || value === dates[dates.length - 1]) {
          return value
        }
          return ''
        },
        style: {
          colors: theme.white,
          fontSize: isMobile ? '10px' : '12px',
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
      x: { format: 'yyyy-MM-dd' },
    },
    colors: [
      theme.colors[theme.primaryColor][5],
      theme.colors.cyan[9],
      theme.colors.green[9],
    ],
    legend: {
      labels: {
        colors: theme.white,
      },
    },
  }

  return (
    <Surface component={Paper} {...others} style={{ borderRadius: 15 }}>
      <Group justify="space-between" mb="md">
        <Text size="lg" fw={600} pl={10}>
          Past 30 Days of Applications
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
  )
}
