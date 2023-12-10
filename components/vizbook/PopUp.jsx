import { Dialog, Slide } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopUp({ children, open, handleClose }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="dialog-slide-description"
      maxWidth="lg"
      sx={{
        margin: "auto",
        display: "grid",
        placeContent: "center",
        maxHeight: "90vh",
        "& .MuiDialog-paper": {
          maxHeight: "90vh",

        },
        "&::-webkit-scrollbar": {
          // display: "none",
          width: "3px",
        },
        "&::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "5px",
          backgroundColor: "#e4e4e4",
          outline: "1px solid slategrey",
        },

      }}
    >
      {children}
    </Dialog>
  );
}
