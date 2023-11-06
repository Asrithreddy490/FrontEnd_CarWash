import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/adminHome',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'User',
    path: '/admin/listUser',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text'
  },
  {
    title: 'Washer',
    path: '/admin/listWashers',
    icon: <FaIcons.FaUserTie />,
    cName: 'nav-text'
  },
  {
    title: 'WashPack',
    path: '/admin/ListWashPack',
    icon: <IoIcons.IoIosWater />,
    cName: 'nav-text'
  },
  
];
