import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FeedIcon from '@mui/icons-material/Feed';
import DeleteIcon from '@mui/icons-material/Delete';
import StormIcon from '@mui/icons-material/Storm';

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Minha conta",
    icon: <ManageAccountsIcon />,
    link: "/useraccount",
  },
  {
    title: "Meus fenomenos",
    icon: <StormIcon />,
    link: "/myphenomena",
  },
]