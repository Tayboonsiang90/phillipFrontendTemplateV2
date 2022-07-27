import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#003553",
            contrastText: "#ff9900",
        },
        secondary: {
            main: "#ff9900",
            contrastText: "#003553",
        },
        error: {
            main: "#f74b4b",
            contrastText: "#e0e0e0",
        },
        warning: {
            main: "#ffd162",
            contrastText: "#e0e0e0",
        },
        success: {
            main: "#75c237",
            contrastText: "#e0e0e0",
        },
        info: {
            main: "#10a0de",
            contrastText: "#e0e0e0",
        },
        divider: "#e0e0e0",
        background: {
            default: "#202020",
            paper: "#2d2d2d",
        },
        text: {
            primary: "#e0e0e0",
        },
    },
});
