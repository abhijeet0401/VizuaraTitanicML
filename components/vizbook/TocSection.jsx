import { Lock } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const TocSection = ({ data, id, current, enabled, progress, url }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        position: "relative",
      }}
    >
      {current && (
        <span
          style={{
            height: "45px",
            background:
              "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
            width: "3px",
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "0 12px 12px 0 ",
          }}
        ></span>
      )}
      <Stack sx={{ textAlign: "left" }} spacing={1}>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Box
            sx={{
              display: "grid",
              placeContent: "center",
              borderRadius: "25.1351px",
              width: "80px",
              height: "21px",
              border: current
                ? null
                : "0.837838px solid rgba(160, 160, 160, 0.7)",
              background: current
                ? "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)"
                : "",
            }}
          >
            <Typography
              sx={{ fontSize: "10px", color: current ? "white" : "gray" }}
            >
              Concept {id}
            </Typography>
          </Box>
          {!enabled && <Lock fontSize="7px" style={{ color: "gray" }} />}
        </Box>
        <Link href={enabled ? `${url}${data?.link}` : ""}>
          <Typography
            variant="body1"
            sx={{
              cursor: enabled ? "pointer" : "not-allowed",
              backgroundImage: theme?.palette?.color?.main,
              backgroundClip: "text",
              backgroundSize: "100%",
              backgroundRepeat: "repeat",
              WebkitBackgroundClip: "text",
              color: current ? "transparent" : theme?.palette?.primary?.main,
            }}
          >
            {data?.title}
          </Typography>
        </Link>
      </Stack>
      {id > 0 && enabled && <CircularProgressWithLabel value={progress} />}
    </Box>
  );
};

export default TocSection;
