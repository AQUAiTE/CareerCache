import {
  ActionIcon,
  Group,
  Paper,
  PaperProps,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons-react'
import Chart from 'react-apexcharts'

import Surface from './Surface'
import { useMediaQuery } from '@mantine/hooks'
import { indexToMonthName } from './utils'

type RevenueChartProps = PaperProps

export default function PastYearAnalytics ({ ...others }: RevenueChartProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 768px)', true, {
    getInitialValueInEffect: false,
  })
  const pastYearMonth = (new Date().getMonth() + 12) % 12
  const months = [
    indexToMonthName(pastYearMonth, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 1, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 2, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 3, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 4, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 5, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 6, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 7, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 8, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 9, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 10, isMobile ? true : false),
    indexToMonthName(pastYearMonth + 11, isMobile ? true : false),
  ]

  const series = [
    {
      name: 'Applied',
      data: [15,20,31,38,45,50,60,70,80,90,100,110],
    },
    {
      name: 'Interviews',
      data: [1,2,4,6,7,10,11,11,13,14,15,18],
    },
    {
      name: 'Offers',
      data: [0,0,0,0,0,0,0,1,1,1,2,3],
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
          Past Year of Applications
        </Text>
        <ActionIcon variant='subtle'>
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Group>
      {/*@ts-ignore*/}
      <Chart
        options={options}
        series={series}
        type='area'
        height={350}
        width={'100%'}
      />
    </Surface>
  )
}
