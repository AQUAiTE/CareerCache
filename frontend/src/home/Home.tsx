import { Text, Title } from '@mantine/core';

export default function Home() {
  return (
    <div>
      <Title order={3}>Welcome to CareerCache!</Title>
      <Text>
        CareerCache is a web application that tracks the email replies you receive in relation to your job search!
        <br />
        <br />
        It organizes them into application received confirmations, interview requests, and job offers to save you time and headache!
        You can view your progress over different time periods, including the last 30 days, 6 months, 1 year, and all time.
        The application is designed to help you stay organized and motivated in your job search.
        With CareerCache, you can easily visualize your journey and watch as you perform better.
        <br />
        <br />
        To get started, navigate to the analytics section of the application.
        Most of the charts are regular tracking graphs, with the exception of the 6-month bar chart.
        This chart allows you to see your applications in each of the last six months to help you identify trends.
        If you have any questions or feedback, feel free to reach out to us.
        We hope you enjoy using CareerCache and find it helpful in your career journey!
      </Text>
    </div>
  )
}
