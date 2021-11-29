import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FeedIcon from '@mui/icons-material/Feed';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


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
    title: "Minhas publicações",
    icon: <FeedIcon />,
    link: "/myposts",
  },
  {
    title: "Sair",
    icon: <ExitToAppIcon color="error"/>,
    link: "/"
  },
]