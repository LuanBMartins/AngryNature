import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import DeleteIcon from '@mui/icons-material/Delete';
import StormIcon from '@mui/icons-material/Storm';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

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
  {
    title: "Doações",
    icon: <LocalAtmIcon />,
    link: "/donations",
  },
]