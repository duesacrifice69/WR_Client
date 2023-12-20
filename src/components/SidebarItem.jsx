import { useState } from "react";
import "./SidebarItem.css";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
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
import { useNavigate } from "react-router-dom";

const navIcons = [
  // {
  //   text: "Dashboard",
  //   icon: <HomeOutlined />,
  // },
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
    icon: <Paid />,
  },
  {
    text: "Refunds",
    icon: <CurrencyExchange />,
  },
  {
    text: "User Management",
    icon: <ManageAccounts />,
  },
  {
    text: "Reports",
    icon: <Assessment />,
  },
];

const SidebarItem = ({ navItems }) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (isSubMenuAvl, item) => {
    if (active == item.MenuId) {
      setActive("");
    } else {
      setActive(item.MenuId);
    }
    if (item.Url) navigate(`${item.Url}`);
  };
  // if(item.subMenu){
  return (
    <List component="div" disablePadding>
      {navItems &&
        navItems.map((item) => {
          const isSubMenuAvl = item.subMenu && item.subMenu.length > 0;
          const isSubMenu = item.ParentId;
          return (
            <>
              <ListItemButton
                key={item.MenuId}
                sx={{ ml: isSubMenu ? "2.5rem" : "0rem" }}
                onClick={() => handleClick(isSubMenuAvl, item)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color:
                      active === item.MenuId
                        ? theme.palette.grey[100]
                        : theme.palette.secondary[500],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: isSubMenu ? "2rem" : "0rem",
                      color:
                        active === item.MenuId
                          ? theme.palette.grey[100]
                          : theme.palette.secondary[500],
                    }}
                  >
                    {navIcons.find((icon) => icon.text === item.IconName)?.icon}
                  </ListItemIcon>
                  {isSubMenuAvl && <ExpandMore sx={{ mr: "1rem" }} />}
                  <ListItemText
                    disableTypography
                    key={item.MenuId}
                    primary={
                      <Typography
                        style={{
                          fontWeight: !isSubMenu && "500",
                          color:
                            active === item.MenuId
                              ? theme.palette.grey[100]
                              : theme.palette.secondary[500],
                        }}
                      >
                        {item.MenuName}
                      </Typography>
                    }
                  />
                </div>
              </ListItemButton>
              {/* <Divider /> */}
              {isSubMenuAvl && (
                <Collapse
                  in={item.MenuId === active}
                  timeout="auto"
                  unmountOnExit
                >
                  <SidebarItem navItems={item.subMenu} />
                </Collapse>
              )}
            </>
          );
        })}
    </List>
  );
};

export default SidebarItem;
