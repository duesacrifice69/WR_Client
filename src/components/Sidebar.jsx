import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Collapse,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  HomeOutlined,
  BusinessOutlined,
  LocalShippingOutlined,
  Paid,
  CurrencyExchange,
  ManageAccounts,
  Assessment,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FlexBetween from "./FlexBetween";
import profileImage from "../assets/profile.jpeg";
import SidebarItem from "./SidebarItem";

const Sidebar = ({
  userData,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  // const { pathname } = useLocation();
  // const [active, setActive] = useState("");
  const theme = useTheme();
  const navItems = useSelector((state) => state.app.menuItems);
  // useEffect(() => {
  //   setActive(pathname.substring(1));
  // }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[500],
              backgroundColor: theme.palette.grey[900],
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    display="table-cell"
                    justifyContent="center"
                    textAlign="center"
                  >
                    WATER RECLAMATION
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <SidebarItem navItems={navItems} />
          </Box>

          <Box position="relative" bottom="1rem" marginTop="1rem">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 0rem 3rem"
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {userData.userName}
                </Typography>
                <Typography
                  fontWeight="bold"
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {userData.employeeNo}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
