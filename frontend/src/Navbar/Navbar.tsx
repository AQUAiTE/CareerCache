/**
 * Adapted from https://github.com/design-sparx/mantine-analytics-dashboard
 * Used as a template, replacing the data and adjusting the containers
 */
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconStar,
} from '@tabler/icons-react'
import { AppShell, Box, Group, ScrollArea, ThemeIcon, UnstyledButton, useMantineTheme } from '@mantine/core'

import classes from './NavbarLinksGroup.module.css'
import { LinksGroup } from './NavbarLinksGroup'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Welcome', icon: IconStar, link: '/' },
  { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
  {
    label: 'Time Analytics',
    icon: IconCalendarStats,
    initiallyOpened: true,
    links: [
      { label: 'Past 30 Days', link: '/thirty-days' },
      { label: 'Past 6 Months', link: '/six-months' },
      { label: 'Past Year', link: '/year' },
      { label: 'All Time', link: '/alltime' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics, link: '/analytics' },
]

interface NavbarProps {
  toggle: () => void
}

export default function Navbar({ toggle }: NavbarProps) {
  const theme = useMantineTheme()
  const isActive = (path: string) => location.pathname === path

  const links = tabs.map((tab) => 
    tab.links ? (
      <LinksGroup
        {...tab}
        key={tab.label}
        onLinkClick={toggle}
      />
    ) : (
      <NavLink
        to={tab.link || '/'}
        className={`${classes.sololink} ${isActive(tab.link) ? classes.active : ''}`}
        key={tab.label}
      >
        <UnstyledButton key={tab.label} onClick={toggle} className={classes.control}>
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <tab.icon size={18} />
              </ThemeIcon>
                <Box ml="md">
                  {tab.label}
                </Box>
            </Box>
          </Group>
        </UnstyledButton>
      </NavLink>
    )

  )
  return (
    <AppShell.Navbar style={{
      borderRadius: 20,
      background: `linear-gradient(180deg, ${theme.colors.cyan[9]}, ${theme.colors.cyan[5]})`,
    }}>
      <ScrollArea >
        <div>{links}</div>
      </ScrollArea>
    </AppShell.Navbar>
  )
}
