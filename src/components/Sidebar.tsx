import {
  AccountCircle,
  AdminPanelSettings,
  ExitToApp,
  HomeRounded,
  ShoppingCartRounded,
  Store,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  GlobalStyles,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Sheet,
  Typography,
} from '@mui/joy'
import { Link } from 'react-router-dom'

import { closeSidebar } from '../utils/sidebar'

import ColorSchemeToggle from './UI/ColorSchemeToggle'

const exitLogin = () => {
  sessionStorage.removeItem('isLoggedIn')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('username')
  sessionStorage.removeItem('role')
}

export default function Sidebar() {
  const isAdmin = sessionStorage.getItem('role') === 'ADMIN'
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1200,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">🍅 西红柿读书 </Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <HomeRounded />
              <ListItemContent>
                <Link to="/">
                  <Typography level="title-sm">首页</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Store />
              <ListItemContent>
                <Link to="/books">
                  <Typography level="title-sm">购买书籍</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ShoppingCartRounded />
              <ListItemContent>
                <Link to="/cart">
                  <Typography level="title-sm">购物车</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 0,
          }}
        >
          <ListItem>
            <ListItemButton role="menuitem">
              <AccountCircle />
              <ListItemContent>
                <Link to="/profile">
                  <Typography level="title-sm">个人中心</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          {isAdmin && (
            <ListItem>
              <ListItemButton role="menuitem">
                <AdminPanelSettings />
                <ListItemContent>
                  <Link to="/dashboard">
                    <Typography level="title-sm">管理中心</Typography>
                  </Link>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
          <ListItem>
            <ListItemButton role="menuitem" onClick={exitLogin}>
              <ExitToApp />
              <ListItemContent>
                <Link to="/">
                  <Typography level="title-sm">退出登录</Typography>
                </Link>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  )
}
