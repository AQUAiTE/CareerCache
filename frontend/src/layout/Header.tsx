import { AppShell, Burger, Text, useMantineTheme } from '@mantine/core'

export default function Header({opened, toggle}: {opened: boolean; toggle: () => void}) {
  const theme = useMantineTheme()
  return (
    <AppShell.Header display='flex' style={{
        alignItems: 'center',
        borderRadius: 10,
        background: `linear-gradient(90deg, ${theme.colors.cyan[9]}, ${theme.colors.cyan[5]})`,
      }}
    >
      <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
      <Text ml={10}>CareerCache</Text>
    </AppShell.Header>
  )
}