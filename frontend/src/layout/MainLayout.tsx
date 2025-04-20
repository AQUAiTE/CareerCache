import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Navbar from '../Navbar/Navbar'

export default function MainLayout() {
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
    >
      <Header opened={opened} toggle={toggle}/>
      <Navbar />
      <Main />
      <Footer />
    </AppShell>
  )
}