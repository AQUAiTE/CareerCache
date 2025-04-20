import {
  IconCalendarStats,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
} from '@tabler/icons-react'
import { AppShell, ScrollArea } from '@mantine/core'
import { LinksGroup } from './NavbarLinksGroup'

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Time Analytics',
    icon: IconCalendarStats,
    initiallyOpened: true,
    links: [
      { label: 'Past 30 Days', link: '/' },
      { label: 'Past 6 Months', link: '/' },
      { label: 'Past Year', link: '/' },
      { label: 'All Time', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  {
    label: 'Security',
    icon: IconLock,
    initallyOpened: true,
    links: [
      { label: 'Change password', link: '/' }
    ],
  },
]

export default function Navbar() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />)

  return (
    <AppShell.Navbar>
      <ScrollArea >
        <div>{links}</div>
      </ScrollArea>
    </AppShell.Navbar>
  )
}
