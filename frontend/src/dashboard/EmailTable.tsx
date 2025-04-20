import { Table, ScrollArea, Badge } from "@mantine/core";

export interface EmailData {
  dateReceived: string;
  company: string;
  status: "APPLICATION CONFIRMED" | "INTERVIEW REQUESTED" | "JOB OFFERED";
}

const mockData: EmailData[] = [
  {
    dateReceived: "2024-04-20",
    company: "Tommy's Toontown",
    status: "APPLICATION CONFIRMED",
  },
  {
    dateReceived: "2024-04-19",
    company: "John's Joyrides",
    status: "INTERVIEW REQUESTED",
  },
  {
    dateReceived: "2024-04-18",
    company: "Dino's Diner",
    status: "JOB OFFERED",
  },
];

const getStatusColor = (status: EmailData["status"]) => {
  switch (status) {
    case "APPLICATION CONFIRMED":
      return "blue";
    case "INTERVIEW REQUESTED":
      return "yellow";
    case "JOB OFFERED":
      return "green";
    default:
      return "gray";
  }
};

export function EmailTable() {
  return (
    <ScrollArea h={400}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date Received</Table.Th>
            <Table.Th>Company</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mockData.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td>{row.dateReceived}</Table.Td>
              <Table.Td>{row.company}</Table.Td>
              <Table.Td>
                <Badge color={getStatusColor(row.status)}>{row.status}</Badge>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
