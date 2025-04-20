import { useEffect, useState } from "react";
import { Table, ScrollArea, Badge, Loader, Center } from "@mantine/core";

export interface EmailData {
  received: string;
  company: string;
  status: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER";
  role: string;
}

const getStatusColor = (status: EmailData["status"]) => {
  switch (status) {
    case "APPLIED":
      return "blue";
    case "INTERVIEW":
      return "yellow";
    case "OFFER":
      return "green";
    case "REJECTED":
      return "red";
    default:
      return "gray";
  }
};

export function EmailTable() {
  const [data, setData] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/email/get_db")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h={400}>
        <Loader />
      </Center>
    );
  }

  return (
    <ScrollArea h={400}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date Received</Table.Th>
            <Table.Th>Company</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Application Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, index) => (
            <Table.Tr key={index}>
              <Table.Td>{row.received}</Table.Td>
              <Table.Td>{row.company}</Table.Td>
              <Table.Td>{row.role}</Table.Td>
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
