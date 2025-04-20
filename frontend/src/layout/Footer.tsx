import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export default function Footer() {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery('(max-width: 425px)');

  return (
    isMobile ? (
      <AppShell.Footer p='sm' style={{
        borderRadius: 10,
        background: `linear-gradient(45deg, ${theme.colors.dark[8]}, ${theme.colors.dark[5]})`,
        height: 50
      }}>
        Made using React + Mantine &lt;3
      </AppShell.Footer>
    ) : (
      <AppShell.Footer p='sm' style={{
          width: 'calc(100% - 200px)',
          marginLeft: '200px',
          borderRadius: 10,
          background: `linear-gradient(45deg, ${theme.colors.dark[8]}, ${theme.colors.dark[5]})`,
        }}
      >
        Made using React + Mantine &lt;3
      </AppShell.Footer>
    )
  )
}