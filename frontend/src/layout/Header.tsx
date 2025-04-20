import { AppShell, Burger, Text } from '@mantine/core'

export default function Header({opened, toggle}: {opened: boolean; toggle: () => void}) {
  return (
    <AppShell.Header bg="var(--mantine-color-grape-9)" display='flex' style={{ alignItems: 'center' }}>
      <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
      <Text>CareerCache</Text>
    </AppShell.Header>
  )
}