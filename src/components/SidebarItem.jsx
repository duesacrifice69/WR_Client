import { useState } from 'react';
import './SidebarItem.css';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import Collapse from '@mui/material/Collapse';
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
    ExpandMore
  } from "@mui/icons-material";

const navIcons = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Registration",
      icon: null,
    },
    {
      text: "Company",
      icon: <BusinessOutlined />,
    },
    {
      text: "Vehicle",
      icon: <LocalShippingOutlined />,
    },
    {
      text: "Payments",
      icon: <Paid />
    },
    {
      text: "Refunds",
      icon: <CurrencyExchange />
    },
    {
      text: "User Management",
      icon: <ManageAccounts />
    },
    {
      text: "Reports",
      icon: <Assessment />
    },
  ];

const SidebarItem = ({navItems}) => {
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState("");
    const theme = useTheme();

    const handleClick = (isSubMenuAvl, MenuId) => {
        if(active == MenuId){
           setActive("")
        } 
        else {
            setActive(MenuId);
            if(isSubMenuAvl) setOpen(!open);
        } 
      }  
    // if(item.subMenu){
        return (
                <List component="div" disablePadding>
                     {/* { item.subMenu.map((child) => <SidebarItem item={child} />) } */}
                    {navItems && navItems.map((item, index) => {
                      const isSubMenuAvl = item.subMenu && item.subMenu.length > 0;
                      return(
                      <>
                         <ListItemButton key={item.MenuId}  sx={{ m: "2 rem 0 0.5rem 2.5rem" }} onClick={() => handleClick(isSubMenuAvl, item.MenuId)}>
                              <ListItemIcon sx={{
                                ml: "1rem",
                                color:
                                    active === item.MenuId
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[200],
                                }}>
                                  {(navIcons.find(icon => icon.text === item.MenuName)?.icon) }
                              </ListItemIcon>
                              <ListItemText key={item.MenuId} primary={item.MenuName} />
                              {isSubMenuAvl &&  <ExpandMore />}
                          </ListItemButton>
                          <Divider />
                         {isSubMenuAvl && 
                         <Collapse in={item.MenuId === active} timeout="auto" unmountOnExit>
                            <SidebarItem navItems={item.subMenu} />
                         </Collapse>
                         }
                          </> 
                        ); 
   
                       })}
                </List>
        )
}


export default SidebarItem;