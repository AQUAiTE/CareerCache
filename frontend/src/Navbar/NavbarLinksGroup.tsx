import { useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { Box, Collapse, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import classes from './NavbarLinksGroup.module.css'
import { NavLink } from 'react-router-dom'

interface LinksGroupProps {
  icon: React.FC<any>
  label: string
  initiallyOpened?: boolean
  links?: { label: string; link: string }[]
  onLinkClick?: () => void
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, onLinkClick }: LinksGroupProps) {
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const isActive = (path: string) => window.location.pathname === path
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={NavLink}
      to={link.link}
      key={link.label}
      className={`${classes.link} ${isActive(link.link) ? classes.active : ''}`}
      onClick={onLinkClick}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
              style={{ transform: opened ? 'rotate(-90deg)' : 'none' }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
