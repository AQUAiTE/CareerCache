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

type RevenueChartProps = PaperProps

export default function AllTimeAnalytics ({ ...others }: RevenueChartProps) {
  const theme = useMantineTheme()

  const series = [
    {
      name: 'Applied',
      data: [45,120,237,341,400,450,500],
    },
    {
      name: 'Interviews',
      data: [15,30,55,71,101,114,121],
    },
    {
      name: 'Offers',
      data: [1,3,5,5,8,9,12],
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
      categories: [
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
      ],
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
          Applications All-Time
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