import Navbar from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { MetamaskConnectProvider } from "./contexts/metamaskConnectProvider";

import { drawerWidth } from "./components/sidebar/Sidebar";

function App() {
    return (
        <div className="App">
            <MetamaskConnectProvider>
                <Sidebar />
                <Box component="main" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
                    <Navbar />
                    <Outlet />
                </Box>
            </MetamaskConnectProvider>
        </div>
    );
}

export default App;
