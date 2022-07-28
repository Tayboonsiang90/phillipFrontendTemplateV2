// This is a context for Metamask, to store connected wallet details

/* DEPENDENCIES
 */
import React, { useContext, useState } from "react";

/* STANDARD FUNCTIONS
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const MetamaskConnectContext = React.createContext();

// For subpages that require the context to use
export function useMetamaskConnectContext() {
    return useContext(MetamaskConnectContext);
}

/* MAIN
 */
export function MetamaskConnectProvider({ children }) {
    // State variables
    const [currentAccountAddress, setCurrentAccountAddress] = useState("");
    const [currentAccountGasBal, setCurrentAccountGasBal] = useState(0);
    const [metamaskExistCheck, setMetamaskExistCheck] = useState(false);
    const [currentChainId, setCurrentChainId] = useState(0);

    // Checks if metamask is installed and checks if wallet is connected
    const metamaskSetupOperations = async () => {
        try {
            console.log("Setting up Metamask...")
            // The metamask provider object
            const { ethereum } = window;

            if (!ethereum) {
                // If metamask is not installed
                setMetamaskExistCheck(false);
                console.log("Metamask is not installed on this user's computer!");
            } else {
                // If metamask is installed
                setMetamaskExistCheck(true);
                console.log("Metamask is installed on this user's computer!");
                // Loading the current chainID
                await updateChainId(ethereum);
                // Loading the current connected account
                await updateConnectedAccount(ethereum);
                // Switch network to the correct network
                await switchToCorrectNetwork();

                // Loading onEvent handlers for metamask
                console.log("Loading onEvent handlers...");
                window.ethereum.on("chainChanged", async () => {
                    await updateChainId(ethereum);
                    await updateConnectedAccount(ethereum);
                });
                window.ethereum.on("accountsChanged", async () => {
                    await updateConnectedAccount(ethereum);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to update Chain Id state to current
    const updateChainId = async (ethereum) => {
        console.log("Checking ChainID and updating");
        await sleep(500);
        const chainId = ethereum.networkVersion;
        console.log("ChainID Found:", chainId);
        await setCurrentChainId(Number(chainId));
    };

    // Function to update current account address and balances of ETH and Vote tokens
    const updateConnectedAccount = async (ethereum) => {
        console.log("Checking connected accounts and updating");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccountAddress(account);
            checkAddressEthBalance(account);
        } else {
            console.log("No authorized account found");
        }
    };

    // Function written to prompt user to connect his metamask wallet
    const connectWallet = async () => {
        try {
            console.log("Connecting to wallet...")
            const { ethereum } = window;

            if (!ethereum) {
                alert("Metamask is not installed! Please install it. ");
                return;
            }

            // Connect wallet request
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            // Switch network request
            await switchToCorrectNetwork();

            console.log("Connected", accounts[0]);
            setCurrentAccountAddress(accounts[0]);
            checkAddressEthBalance(accounts[0]);
        } catch (error) {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                alert("You have declined the wallet connection. Please try again. ");
            } else {
                console.error(error);
            }
        }
    };

    // Function written to switch networks to the correct network if the user isn't on the right network
    const switchToCorrectNetwork = async () => {
        try {
            console.log("Changing Network to Rinkeby...");
            if (!window.ethereum) throw new Error("Metamask isn't found!");
            // Attempt to switch the chain to the correct chain
            try {
                await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x" + Number(process.env.REACT_APP_CHAINID).toString(16) }],
                });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    try {
                        console.log({
                            chainId: process.env.REACT_APP_CHAINID.toString(16), // A 0x-prefixed hexadecimal string
                            chainName: process.env.REACT_APP_CHAINNAME,
                            nativeCurrency: {
                                name: process.env.REACT_APP_NATIVECURRENCY_NAME,
                                symbol: process.env.REACT_APP_NATIVECURRENCY_SYMBOL, // 2-6 characters long
                                decimals: process.env.REACT_APP_NATIVECURRENCY_DECIMALS,
                            },
                            rpcUrls: [process.env.REACT_APP_RPC_URL],
                        });
                        // Request to add a new chain with these parameters
                        await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: "0x" + Number(process.env.REACT_APP_CHAINID).toString(16), // A 0x-prefixed hexadecimal string
                                    chainName: process.env.REACT_APP_CHAINNAME,
                                    nativeCurrency: {
                                        name: process.env.REACT_APP_NATIVECURRENCY_NAME,
                                        symbol: process.env.REACT_APP_NATIVECURRENCY_SYMBOL, // 2-6 characters long
                                        decimals: Number(process.env.REACT_APP_NATIVECURRENCY_DECIMALS),
                                    },
                                    rpcUrls: [process.env.REACT_APP_RPC_URL],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.log(addError);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Function written to update user's eth and vote token balance state for a given address
    const checkAddressEthBalance = async (address) => {
        try {
            console.log("Checking User's Balance");
            if (!window.ethereum) throw new Error("Metamask isn't found!");
            let ethQuantity = await window.ethereum.request({
                method: "eth_getBalance",
                params: [address, "latest"],
            });

            setCurrentAccountGasBal(Number((parseInt(ethQuantity, 16) / 10 ** 18).toFixed(2)));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MetamaskConnectContext.Provider value={{ metamaskSetupOperations, connectWallet, currentAccountAddress, metamaskExistCheck, currentChainId, currentAccountGasBal, setCurrentAccountAddress, setMetamaskExistCheck, setCurrentChainId, setCurrentAccountGasBal }}>
            {children}
        </MetamaskConnectContext.Provider>
    );
}
