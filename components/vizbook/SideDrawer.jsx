import { Drawer, useTheme } from "@mui/material";

const SideDrawer = ({ openDrawer, toggleDrawer, children }) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={toggleDrawer(false)}
      sx={{
        width: 320,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        height: "90vh",
        marginTop: "10vh",
        background: "transparent",
        alignItems: "center",
        "& .MuiDrawer-paper": {
          color: "white",
          background:
            theme?.palette.mode == "light"
              ? "rgba(0, 0, 0, 0.6)"
              : "rgba(0, 0, 0, 0.9)",
          paddingTop: "10vh",
          [theme?.breakpoints?.down("sm")]: {
            width: "100vw",
            marginLeft: "auto",
          },
        },
      }}
    >
      {children}
    </Drawer>
  );
};

export default SideDrawer;
