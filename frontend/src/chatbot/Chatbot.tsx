import { Container, Title, Paper, Text, Center } from "@mantine/core";

export default function Chatbot() {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="lg">
        CareerChat AI Assistant
      </Title>
      <Paper shadow="sm" p="xl" radius="md">
        <Center h={400}>
          <Text size="lg" c="dimmed">
            CHATBOT HERE
          </Text>
        </Center>
      </Paper>
    </Container>
  );
}
