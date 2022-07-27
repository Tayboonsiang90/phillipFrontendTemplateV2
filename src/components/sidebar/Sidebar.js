import React from "react";
import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { sidebarLabel1 } from "./consts/sidebarLabel1";
import { sidebarLabel2 } from "./consts/sidebarLabel2";

import logo from "../../media/logo.jpg";

const drawerWidth = 220;

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <img src={logo} alt="Logo" style={{ height: "64px" }} />
            <Divider />
            <List>
                {sidebarLabel1.map((item, index) => (
                    <ListItem key={item.id} disablePadding onClick={() => navigate(item.route)}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {sidebarLabel2.map((item, index) => (
                    <ListItem key={item.id} disablePadding onClick={() => navigate(item.route)}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export { Sidebar, drawerWidth };
