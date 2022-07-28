import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

import { useMetamaskConnectContext } from "../../contexts/metamaskConnectProvider";

const Navbar = () => {
    let { metamaskSetupOperations, connectWallet, currentAccountAddress, metamaskExistCheck, currentChainId, currentAccountGasBal, setCurrentAccountAddress, setMetamaskExistCheck, setCurrentChainId, setCurrentAccountGasBal } = useMetamaskConnectContext();

    // Component Did Mount (Runs once on mounting)
    useEffect(() => {
        metamaskSetupOperations();

        // A (MINUTE_MS) timed function to retrieve new data from the contract
        const interval = setInterval(() => {
            console.log("Refreshing data...");
            metamaskSetupOperations();
        }, process.env.REACT_APP_REFRESH_RATE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} noWrap="true">
                    DAO Insurance Demo App
                </Typography>
                {/* Button appears when metamask isn't installed */}
                {!metamaskExistCheck && (
                    <Link href="https://metamask.io/download/" underline="none" target="_blank" rel="noreferrer">
                        <Button variant="contained" color="secondary">
                            Download Metamask
                        </Button>
                    </Link>
                )}
                {/* Button appears when metamask is installed and user isn't connected  */}
                {metamaskExistCheck && !currentAccountAddress && (
                    <Button variant="contained" color="secondary" onClick={connectWallet}>
                        Connect To Metamask
                    </Button>
                )}
                {/* Button appears when metamask is installed and user is connected */}
                {metamaskExistCheck && currentAccountAddress && (
                    <>
                        <div className="pe-3 d-flex justify-content-center">
                            <div className="text-end">
                                <Typography>
                                    Connected to{" "}
                                    <Typography color="info.contrastText" component="span">
                                        {currentAccountAddress}
                                    </Typography>
                                </Typography>
                                <Typography>
                                    <i className="fa-brands fa-ethereum"></i> GAS Balance:{" "}
                                    <Typography color="info.contrastText" component="span">
                                        {currentAccountGasBal}
                                    </Typography>
                                </Typography>
                                <div></div>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setCurrentAccountAddress("");
                            }}
                        >
                            Disconnect
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
