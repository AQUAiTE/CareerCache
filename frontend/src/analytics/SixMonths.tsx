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
import { indexToMonthName } from './utils'

type RevenueChartProps = PaperProps

export default function SixMonthsAnalytics ({ ...others }: RevenueChartProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 768px)', true, {
    getInitialValueInEffect: false,
  })

  const sixMonthsAgo = (new Date().getMonth() - 6 + 12)
  const months = [
    indexToMonthName(sixMonthsAgo, isMobile ? true : false),
    indexToMonthName(sixMonthsAgo + 1, isMobile ? true : false),
    indexToMonthName(sixMonthsAgo + 2, isMobile ? true : false),
    indexToMonthName(sixMonthsAgo + 3, isMobile ? true : false),
    indexToMonthName(sixMonthsAgo + 4, isMobile ? true : false),
    indexToMonthName(sixMonthsAgo + 5, isMobile ? true : false),
  ]

  const series = [
    {
      name: 'Applied',
      data: [31,50,47,44,52,60],
    },
    {
      name: 'Interviews',
      data: [7,5,4,4,3,8],
    },
    {
      name: 'Offers',
      data: [0,0,1,1,0,2],
    }
  ]

  const options: any = {
    chart: {
      height: 350,
      type: 'area',
      fontFamily: 'Open Sans, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'category',
      categories: months,
      labels: {
        style: {
          colors: theme.white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.colors.green
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    colors: [
      theme.colors[theme.primaryColor][5],
      theme.colors.cyan[9],
      theme.colors.green[9]
    ],
    legend: {
      labels: {
        colors: theme.white,
      },
    },
  }

  return (
    <Surface component={Paper} {...others} style={{
      borderRadius: 15
    }}>
      <Group justify='space-between' mb='md'>
        <Text size='lg' fw={600} pl={10}>
          Past Six Months of Applications
        </Text>
        <ActionIcon variant='subtle'>
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={series}
        type='bar'
        height={350}
        width={'100%'}
      />
    </Surface>
  )
}
