import React, { useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userData = useSelector((state) => state.user.data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
       <Sidebar
        userData={userData || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} />
       
        <Box flexGrow={1}>
          <Navbar 
            userData={userData || {}}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isNonMobile={isNonMobile}
          />
          <Outlet />
        </Box> 
    </Box>
  )
}

export default Layout