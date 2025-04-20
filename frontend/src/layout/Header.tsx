import { AppShell, Burger, Title, useMantineTheme } from '@mantine/core'

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
      <Title pl={10}>CareerCache</Title>
    </AppShell.Header>
  )
}