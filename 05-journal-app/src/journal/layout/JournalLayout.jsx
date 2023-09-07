import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidh = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      sx={{ display: "flex" }}
    >
      <NavBar drawerWidh={drawerWidh} />

      <SideBar drawerWidh={drawerWidh} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
