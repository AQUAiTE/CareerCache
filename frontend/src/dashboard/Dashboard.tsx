import { Container, Title, Paper } from '@mantine/core';
import { EmailTable } from './EmailTable';

export default function Dashboard() {
  return (
    <Container size='xl' py='xl'>
      <Title order={1} mb='lg'>
        Job Application Dashboard
      </Title>
      <Paper shadow='sm' p='md' radius='md'>
        <EmailTable />
      </Paper>
    </Container>
  );
}
