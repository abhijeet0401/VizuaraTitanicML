import { useEffect, useState } from "react";
import theme from "../../helpers/theme";
import TocSection from "./TocSection";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const TOC = ({ tableOfContents, url, pageNo, next, progress }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "30px 30px",
        gap: "10px",
        padding: "10px 0px",
        minHeight: "30vh",
        width: "324px",
        background:
          theme?.palette?.mode == "light"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.11)", // border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
      }}
    >
      {tableOfContents?.map((item, index) => {
        return (
          <TocSection
            key={index}
            data={item}
            id={index}
            current={pageNo == index}
            enabled={index < next + 1}
            url={url}
            progress={
              index < pageNo ? 100 : index == pageNo ? progress * 100 : 0
            }
          />
        );
      })}
    </Box>
  );
};

export default TOC;
