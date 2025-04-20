import { 
  Text, 
  Title, 
  Container, 
  Stack, 
  Group, 
  Card, 
  List, 
  ThemeIcon,
  Button, 
  Space,
  Divider
} from '@mantine/core';
import { IconBriefcase, IconChartBar, IconCalendarStats, IconChevronRight } from '@tabler/icons-react';

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        {/* Hero Section */}
        <div>
          <Title order={1} align="center" mb="md">Welcome to CareerCache</Title>
          <Text size="lg" align="center" mb="xl">
            Track, organize and visualize your job search journey in one place
          </Text>
          <Divider my="md" />
        </div>

        {/* Main Feature */}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart" mb="md">
            <div>
              <Title order={3}>Track Your Job Search Responses</Title>
              <Text color="dimmed">Save time and reduce headaches with automated email tracking</Text>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light">
              <IconBriefcase size={24} />
            </ThemeIcon>
          </Group>
          
          <Text mb="md">
            CareerCache automatically organizes your email responses into categories:
          </Text>
          
          <List spacing="sm" size="md" center icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconChevronRight size={16} />
            </ThemeIcon>
          }>
            <List.Item>Application confirmations</List.Item>
            <List.Item>Interview requests</List.Item>
            <List.Item>Job offers</List.Item>
          </List>
        </Card>

        {/* Analytics Feature */}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart" mb="md">
            <div>
              <Title order={3}>Visualize Your Progress</Title>
              <Text color="dimmed">Track your job search metrics over different time periods</Text>
            </div>
            <ThemeIcon size="xl" radius="md" variant="light">
              <IconChartBar size={24} />
            </ThemeIcon>
          </Group>
          
          <Text mb="md">
            View comprehensive analytics of your job search journey across multiple timeframes:
          </Text>
          
          <Group grow mb="md">
            <Card withBorder p="xs" radius="md">
              <Group position="center">
                <ThemeIcon size="md" color="blue" variant="light">
                  <IconCalendarStats size={16} />
                </ThemeIcon>
                <Text size="sm">Last 30 days</Text>
              </Group>
            </Card>
            <Card withBorder p="xs" radius="md">
              <Group position="center">
                <ThemeIcon size="md" color="blue" variant="light">
                  <IconCalendarStats size={16} />
                </ThemeIcon>
                <Text size="sm">6 months</Text>
              </Group>
            </Card>
            <Card withBorder p="xs" radius="md">
              <Group position="center">
                <ThemeIcon size="md" color="blue" variant="light">
                  <IconCalendarStats size={16} />
                </ThemeIcon>
                <Text size="sm">1 year</Text>
              </Group>
            </Card>
            <Card withBorder p="xs" radius="md">
              <Group position="center">
                <ThemeIcon size="md" color="blue" variant="light">
                  <IconCalendarStats size={16} />
                </ThemeIcon>
                <Text size="sm">All time</Text>
              </Group>
            </Card>
          </Group>
          
          <Text size="sm" color="dimmed">
            The 6-month bar chart helps you identify trends in your application process over time.
          </Text>
        </Card>

        {/* Call to Action */}
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text align="center" mb="md">
            Ready to stay organized and motivated in your job search?
          </Text>
          <Group position="center">
            <Button size="lg" variant="filled">
              Get Started with Analytics
            </Button>
          </Group>
          <Space h="md" />
          <Text size="sm" color="dimmed" align="center">
            Have questions or feedback? We're here to help you on your career journey!
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}