import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Looks3Icon from "@mui/icons-material/Looks3";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

import GasFaucet from "../../../pages/gasFaucet/GasFaucet";
import Faq from "../../../pages/Faq/Faq";
import Page3 from "../../../pages/Page3/Page3";

export const sidebarLabel2 = [
    {
        id: 0,
        icon: <LocalGasStationIcon />,
        label: "GAS Faucet",
        route: "gas-faucet",
        page: <GasFaucet />,
    },
    {
        id: 1,
        icon: <QuestionMarkIcon />,
        label: "FAQ",
        route: "faq",
        page: <Faq />,
    },
    {
        id: 2,
        icon: <Looks3Icon />,
        label: "Page Three",
        route: "page3",
        page: <Page3 />,
    },
];
