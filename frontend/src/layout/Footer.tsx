import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function Footer() {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 425px)');

  return (
    isMobile ? (
      <AppShell.Footer p='sm' bg={theme.colors.dark[8]}>
        Made using React + Mantine &lt;3
      </AppShell.Footer>
    ) : (
      <AppShell.Footer p='sm' bg={theme.colors.dark[8]} style={{
          width: 'calc(100% - 200px)',
          marginLeft: '200px'
        }}
      >
        Made using React + Mantine &lt;3
      </AppShell.Footer>
    )
  )
}