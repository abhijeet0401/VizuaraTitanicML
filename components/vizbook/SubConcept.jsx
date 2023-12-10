import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import DatasetViewer from "./DatasetViewer";
import theme from "../../helpers/theme";
import { useRef } from "react";
import DataAttributeViewer from "./DataAttributeViewer";
import AttributeSelector from "./AttributeSelector";
import Chart from './Chart'
import ML from "./ML";
import InfoAlerts from "./InfoAlerts";
import QnA from "./QnA";
import Predict from "./Predict";
const SubConcept = ({ children, data, id, pageNo, vizTree }) => {
  const theme = useTheme();
  const ref = useRef();

  const isMidUp = useMediaQuery(theme?.breakpoints.up("md"));
  const isSmUp = useMediaQuery(theme?.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "30px 30px",
        background:
          theme?.palette.mode == "light"
            ? "rgba(255, 255, 255, 1)"
            : "rgba(255, 255, 255, 0.11)",
        gap: "10px",
        // border: "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: "20px",
        width: "100%",
        [theme?.breakpoints.down("lg")]: {
          width: "96%",
          margin: "0px 0px",
          alignItems: "center",
        },

        ...(pageNo == 0 && {
          width: "96%",
          margin: "0px 0px",
          alignItems: "center",
        }),
      }}
      id={id}
    >
      {pageNo > 0 && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "grid",
              placeContent: "center",
              borderRadius: "25.1351px",
              width: "100px",
              height: "21px",
              //   border: "0.837838px solid rgba(160, 160, 160, 0.7)",
              background:
                "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
            }}
          >
            <Typography sx={{ fontSize: "10px", color: "white" }}>
              {`Sub-concept ${pageNo}.${id}`}
            </Typography>
          </Box>
        </Box>
      )}

      {data?.title && (
        <Typography
          variant="h4"
          sx={{
            fontWeight: "700",
            color: theme?.typography?.color,
            textAlign: pageNo == 0 ? "center" : "left",
          }}
        >
          {data?.title}
        </Typography>
      )}
    
      {data?.intro && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: "200",
            color: theme?.typography?.color,
            // color: "white",

            textAlign: pageNo == 0 ? "center" : "left",
          }}
        >
          <ReactQuill theme="bubble" readOnly value={data?.intro} />
        </Typography>
      )}
     
      {data?.attribute && (
        <AttributeSelector/>
      )}
      {data?.ml && (
        <ML/>
      )}
        {data?.predict && (
        <Predict/>
          
      )}
    {data?.dataattribute && (
           <DataAttributeViewer/>
          )}
      {pageNo == 0 && (
        <img src={vizTree} width={isMidUp ? "600px" : "100%"} margin="auto" />
      )}
      {data?.chart && (
           <Chart/>
          )}
      {data?.image && (
        <img
          src={data?.image}
          width={isMidUp ? "600px" : "100%"}
          margin="auto"
        />
      )}
      {data?.video && (
        <video
          ref={ref}
          style={{
            width: isMidUp ? "100%" : isSmUp ? "104%" : "110%",
            borderRadius: "7px",
          }}
          controls
          controlsList="nodownload"
          preload="metadata"
          src={`${data.video}#t=2.00`}
          onPlay={() => {
            ref.current.currentTime = 0;
          }}
        >
          {/* <source  type="video/mp4" /> */}
        </video>
      )}
      {data?.csv && (
        <>
        
        <DatasetViewer />
        </>
      )} 
      {data?.qna && (
        <>
        
        <QnA />
        </>
      )}    
      {data?.virtualLab && (
        <iframe
          src={data?.virtualLab}
          width={"100%"}
          style={{ aspectRatio: "1/0.7", borderRadius: "7px" }}
        />
      )}
        {data?.mlsummary && (
        <InfoAlerts></InfoAlerts>
      )}
      {data?.audio && (
        <Box
          sx={{
            display: "flex",
            flexDirection: isMidUp ? "row" : "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/vizuaradelta.appspot.com/o/Images%2FScience%2FShared%2Fhappyloop2.gif?alt=media&token=62c17c23-990e-4ce2-9976-346b7b1018f8"
            style={{
              width: isMidUp ? "50%" : "100%",
              height: isMidUp ? "auto" : "auto",
            }}
          />
          
          <video
            controls
            controlsList="nodownload"
            style={{ width: isMidUp ? "50%" : "100%", height: "50px" }}
          >
            <source src={data?.audio} type="audio/mp3" />
          </video>
        </Box>
      )}

      {data?.summary && (
        <Typography
          variant="h3"
          sx={{
            fontWeight: "200",
            color: theme?.typography?.color,
            textAlign: pageNo == 0 ? "center" : "left",
            margin: pageNo == 0 ? "auto" : "left",
          }}
        >
          <ReactQuill theme="bubble" readOnly value={data?.summary} />
        </Typography>
      )}
      {data?.takeAway && (
        <Box
          sx={{
            display: "flex",
            height: "auto",
            width: "90%",
            borderRadius: "10px",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "200",
              color: theme?.typography?.color,
              textAlign: pageNo == 0 ? "center" : "left",
              margin: pageNo == 0 ? "auto" : "left",
            }}
          >
            {data?.takeAway}
          </Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default SubConcept;
