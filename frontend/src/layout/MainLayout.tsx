import { AppShell, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Header from './Header'
import Footer from './Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      style={{
        background: `linear-gradient(45deg, ${theme.colors.cyan[9]}, ${theme.colors.cyan[5]})`,
      }}
    >
      <Header opened={opened} toggle={toggle}/>
      <Navbar toggle={toggle} />
      <AppShell.Main pb={50}>
        <Outlet />
      </AppShell.Main>
      <Footer />
    </AppShell>
  )
}