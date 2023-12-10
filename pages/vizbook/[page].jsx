import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIosNewOutlined, Close, Menu } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import HomeIcon from '@mui/icons-material/Home'; 
import SideDrawer from '../../components/vizbook/SideDrawer';
import TOC from '../../components/vizbook/TOC';
import SubConcept from '../../components/vizbook/SubConcept';
import PopUp from '../../components/vizbook/PopUp';
import ContBtn from "@/components/vizbook/ContBtn";
import ThemeMenu from "@/components/vizbook/ThemeSwitcher";
import mockData from '../../data/mockData.json'; // Assuming you have this mock data file
import mockdetailpage from '../../data/mockdetailpage';
import content from '../../data/content.json'
import Home from "@mui/icons-material/Home";
const Vizbook = () => {
  let i = 0 ; 
  const router = useRouter();
  const params = router?.query;
  const loc = router?.asPath;

  //converting params to small letters
  params.class = params?.class?.toLowerCase();
  // params.subject =
  //   params?.subject == "icsemaths"
  //     ? "icsemaths"
  //     : params?.subject == "icsescience"
  //     ? "icsescience"
  //     : ctx?.syllabus == "icse"
  //     ? ctx?.syllabus?.concat(params?.subject?.toLowerCase())
  //         : params?.subject?.toLowerCase();

  params.subject = params?.subject?.toLowerCase();
  params.chapter = params?.chapter?.toLowerCase();
  params.page = params?.page?.toLowerCase();

  // if (ctx?.syllabus == "icse") {
  //   if (params?.subject == "maths") {
  //     params.subject = "icsemaths";
  //   }
  //   if (params?.subject == "science") {
  //     params.subject = "icsescience";
  //   }
  // }
  const theme = useTheme();

  const isMidUp = useMediaQuery(theme?.breakpoints.up("md"));


  //states
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [url, setURL] = useState("");
  const [totalPageNo, setTotalPageNo] = useState(0);
  const [currentPageNo, setCurrentPageNo] = useState(-1);
  const [divId, setDivId] = useState(1);
  const [enabled, setEnabled] = useState([]);
  const [current, setCurrent] = useState([]);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [timeSpend, setTimeSpend] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [unitProgress, setUnitProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [subConceptArr, setSubConceptArr] = useState([]);
  const [openNext, setOpenNext] = useState(false);
  const [openTree, setOpenTree] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState(null);
  const [activeChapter, setActiveChapter] = useState([]);
  const [bookTime, setBookTime] = useState(0);

  //functions

  //get chapter details
  const chapterData = async () => {
    // console.log("syllabus", params?.subject.split("icse")[1]);

   
    console.log('This is RES data in Chapter Data ');
    console.log(JSON.stringify(mockdetailpage, null, 2)); 

    let removeLastPart = router?.asPath?.substring(
      0,
      router?.asPath?.lastIndexOf("/")
    );
    setURL(removeLastPart);
    console.log(url);
    const pageNumber = params?.page?.includes("page")
      ? params?.page?.replace("page", "")
      : 0;
    console.log(pageNumber)
    setCurrentPageNo(parseInt(pageNumber));
    setTotalPageNo(mockdetailpage?.pageNo);
    setSubConceptArr(
      mockdetailpage?.subConceptPerPage || mockdetailpage?.SubConceptPerPage
    );
    setTableOfContents(mockdetailpage.TOC);
    
  };
  function extractIntFromString(str) {
    const match = str?.match(/\d+/); // Regular expression to match digits
    return match ? parseInt(match[0], 10) : null; // Convert matched string to integer
  }
  //get page data
  const pageData = async () => {
    let extractedInt
    console.log('hello')
    if(router?.query?.page?.toString()!='intro'){
       extractedInt = extractIntFromString(router?.query.page?.toString());
    }
    else{
      extractedInt=0;
    }

    let totalcontent = content;
    setData([]);
    if (true) {
      setData(totalcontent[extractedInt]);
    } else {
      return <h1>Chapter not found...</h1>;
    }
    let subjectSelection;
    if (params?.subject == "science" || params?.subject == "icsescience") {
      subjectSelection = "S";
    }
    if (params?.subject == "maths" || params?.subject == "icsemaths") {
      subjectSelection = "M";
    }

    setActiveChapterId(
      `${params?.class?.replace(
        "class",
        ""
      )}${subjectSelection}${params?.chapter?.replace("chapter", "")}`
    );
    console.log(activeChapter);
    i=i+1;
  };

  useEffect(() => {
    setStart(bookTime);
  }, [router]);

  useEffect(() => {
    setStart(bookTime);
  }, []);

  // useEffect(() => {
  //   if (ctx?.syllabus == "icse") {
  //     if (params?.subject == "maths") {
  //       params.subject = "icsemaths";
  //     }
  //     if (params?.subject == "science") {
  //       params.subject = "icsescience";
  //     }
  //   }
  // }, [ctx?.syllabus]);

  const arrayConstructor = () => {
    setCurrent([]);
    setEnabled([]);
    for (let i = 0; i < totalPageNo; i++) {
      if (i == params?.page?.slice(-1)) {
        setCurrent((enabled) => [...enabled, true]);
      } else {
        setCurrent((enabled) => [...enabled, false]);
      }
      if (
        i <= params?.page?.replace("page", "") ||
        params?.page?.includes("intro")
      ) {
        setEnabled((enabled) => [...enabled, true]);
      } else {
        setEnabled((enabled) => [...enabled, false]);
      }
    }
  };

  //calculate progress
  const ProgressCalc = () => {
    let totalSubConcept = 0;
    subConceptArr?.forEach((subConcept) => {
      totalSubConcept += subConcept;
    });
    // const unitProgress = 100 / totalSubConcept
    setUnitProgress(100 / totalSubConcept);
  };

  //toggle side drawer
  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  //handle next page pop up
  const handleNext = (value) => {
    setOpenNext(value);
    setEnd(bookTime);
  };

  //open or close feedback
  const handleFeedback = async (value) => {
    setShowFeedback(value);
    setEnd(bookTime);
    // showFeedback && (await uploadTimeSpend());
  };

  //handle tree pop up
  const handleTree = (value) => {
    setOpenTree(value);
  };

  //fn to go to next page
  const handleClickNextPage = async () => {
    currentPageNo > 0
    // bgsound3?.current.play();
    handleNext(false);
    router.push(`${url}/page${currentPageNo + 1}`);
  };
  

  //fetch time from firebase
  const fetchTimeSpend = async () => {
  
  };

  //upload to firebase
  const uploadTimeSpend = async () => {
    // console.log("Interval is: ", bookTime);
    // setEnd(Date.now());
    let currentTimeSpend = Math.abs(end - start);

    // console.log("End is: ", end);
    const totalTime = currentTimeSpend + timeSpend[currentPageNo - 1];
    let newArr = [...timeSpend];
    newArr[currentPageNo - 1] = totalTime;
  
  };

  //useEffects

  useEffect(() => {
    const interval = setInterval(() => {
      setBookTime((bookTime) => bookTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    setDivId(1);
  }, [router]);

  useEffect(() => {
    if (divId > 0 && subConceptArr[currentPageNo - 1] > 0) {
      setProgressPercent((divId - 1) / subConceptArr[currentPageNo - 1]);
    }
  }, [divId]);

  useEffect(() => {
    if (router) {
      chapterData();
      pageData();
    }
  }, [router]);

  useEffect(() => {
    arrayConstructor();
  }, [totalPageNo]);

  useEffect(() => {
    activeChapterId && currentPageNo > 0 && fetchTimeSpend();
  }, [activeChapterId, currentPageNo]);

  useEffect(() => {
    ProgressCalc();
  }, [subConceptArr]);

  return (
    // Main container
    <>
      {/* <Navbar /> */}
      <Grid
        container
        sx={{
          display: "flex",
          flexWrap: "no-wrap",
          alignItems: "center",
          background: theme?.palette?.background?.main,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* header for chapter name */}
        <Grid
          item
          sx={{
            width: "100%",
            height: "50px",
            paddingLeft: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background:
              "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%);",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => {
                user?.email == "anyuser@freeaccess.vizuara.com"
                  ? router.push(`/`)
                  : router.push(
                      params?.subject?.slice(0, 4) == "icse"
                        ? `/student-portal/${params?.class}/${
                            params?.subject.split("icse")[1]
                          }`
                        : `/student-portal/${params?.class}/${params?.subject}`
                    );
              }}
            >
              <ArrowBackIosNewOutlined sx={{ color: "white" }} />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
              {/* {params?.chapter?.replace("chapter", "Chapter ")} : {isMidUp ? ChapterDataBackendCBSE[params?.class?.replace("class", "")]?.[params?.subject]?.find(o => o.id == params?.chapter.replace("chapter", ""))?.title :
                ChapterDataBackendCBSE[params?.class?.replace("class", "")]?.[params?.subject]?.find(o => o.id == params?.chapter.replace("chapter", ""))?.title.split(" ")[0] + "..."} */}
              Vizuara AI Labs: Titanic ML
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <ThemeMenu />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(!open)}
              sx={{
                zIndex: 1301,
                [theme?.breakpoints.up("lg")]: {
                  display: "none",
                },
              }}
            >
              {open ? <Close style={{ color: "white" }} /> : <Menu />}
            </IconButton>
            {/* side drawer */}
            <SideDrawer toggleDrawer={toggleDrawer} openDrawer={open}>
              <TOC
                progress={progressPercent}
                tableOfContents={tableOfContents}
                pageNo={currentPageNo}
                url={url}
                next={enabled.lastIndexOf(true)}
              />
            </SideDrawer>
          </Box>
        </Grid>

        {/* container for subConcept and TOC */}
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            overflow: "hidden",
            alignItems: "start",
            width: "100vw",
            // hide drawer for smaller screen
            [theme?.breakpoints.down("lg")]: {
              padding: "0 0px",
            },
          }}
        >
          <Box
            id="sub"
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              gap: "30px",
              alignItems: "end",
              margin: "0px 30px",
              height: "90vh",
              overflowX: "hidden",
              width: "60%",
              overflowY: "scroll",
              padding: "30px 0px",
              "&::-webkit-scrollbar": {
                display: "none",
                // width: "0px",
              },
              "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                display: "none",
                backgroundColor: "#e4e4e4",
                outline: "1px solid slategrey",
              },
              [theme?.breakpoints.down("lg")]: {
                width: "90%",
                margin: "0px 0px",
                alignItems: "center",
              },
              [theme?.breakpoints.down("md")]: {
                width: "100%",
                margin: "0px 0px",
                alignItems: "center",
              },
            }}
          >
            {/* map sub concepts */}
            {data?.content?.map((contentData, index) => {
              return (
                divId > index && (
                  //  Sub concept component
                  <SubConcept
                    key={index}
                    data={contentData}
                    id={contentData.id}
                    pageNo={currentPageNo}
                    vizTree={data?.vizTree}
                  >
                    {/* continue btn */}
                    {currentPageNo > 0 ? (
                      <ContBtn
                        currentPageNo={currentPageNo}
                        totalPageNo={totalPageNo}
                        url={url}
                        size={data?.content?.length}
                        enabled={enabled}
                        setEnabled={setEnabled}
                        unitProgress={unitProgress}
                        subConceptArr={subConceptArr}
                        id={parseInt(contentData.id)}
                        setDivId={setDivId}
                        uploadTimeSpend={uploadTimeSpend}
                        // progressPercent={progressPercent}
                        // setProgressPercent={setProgressPercent}
                        setShowFeedback={setShowFeedback}
                        next={
                          contentData.id == data?.content?.length ? true : false
                        }
                        activeChapterId={activeChapterId}
                        handleNext={handleNext}
                        params={params}
                      />
                    ) : (
                      <Button
                        sx={{
                          background:
                            "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                          boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
                          borderRadius: "40px",
                          height: "45px",
                          padding: "5px 20px",
                          color: "white",
                          width: "200px",
                          margin: "auto",
                        }}
                        onClick={handleClickNextPage}
                      >
                        Start Learning
                      </Button>
                    )}
                  </SubConcept>
                )
              );
            })}
          </Box>
          <Box
            sx={{
              [theme?.breakpoints.down("lg")]: {
                display: "none",
              },
            }}
          >
            {/* table of contents */}
            <TOC
              progress={progressPercent}
              tableOfContents={tableOfContents}
              pageNo={currentPageNo}
              url={url}
              next={enabled.lastIndexOf(true)}
            />
          </Box>
        </Grid>

        {/* pop up for next page */}
        <PopUp open={openNext} handleClose={handleNext}>
          <DialogTitle>
            <Typography
              variant="h6"
              sx={{ fontWeight: "700", textAlign: "center" }}
            >
              {currentPageNo < totalPageNo - 1 &&
                `Your new VizTree has started to grow!`}
              {currentPageNo == totalPageNo - 1 &&
                `Your new VizTree is fully grown!`}
            </Typography>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              src={data?.vizTree}
              style={{
                height: !isMidUp ? "auto" : "",
                width: "300px",
                objectFit: "cover",
              }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{
                background:
                  "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
                borderRadius: "40px",
                height: "45px",
                padding: "5px 20px",
                width: "150px",
                color: "white",
              }}
              onClick={handleClickNextPage}
            >
              Continue
            </Button>
            <Button
              sx={{
                border:
                  "1px solid linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                background:
                  "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
                borderRadius: "40px",
                height: "45px",
                padding: "5px 20px",
                width: "150px",
                "&:hover": {
                  background:
                    "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                  color: "white",
                },
              }}
              onClick={() => {
                handleNext(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </PopUp>



        {/* tree icon */}
        {currentPageNo > 0 && (
          <Avatar
            onClick={() => {
              handleTree(true);
            }}
            sx={{
              cursor: "pointer",
              position: "fixed",
              bottom: "30px",
              right: "30px",
              background:
                "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
            }}
          >
            <Home
              
              width="40"
              height="30"
              layout="intrinsic"
            />
          </Avatar>
        )}

        {/* pop up for tree */}
        <PopUp open={openTree} handleClose={handleTree}>
          <DialogTitle>
            <Typography
              variant="h6"
              sx={{ fontWeight: "700", textAlign: "center" }}
            >
              {currentPageNo < totalPageNo - 1 &&
                `Your new VizTree has started to grow!`}
              {currentPageNo == totalPageNo - 1 &&
                `Your new VizTree is growing!`}{" "}
            </Typography>
          </DialogTitle>

          <DialogContent
            sx={{
              textAlign: "center",
              overflowX: "hidden",
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
            <img
              src={data?.vizTree}
              style={{
                width: isMidUp ? "500px" : "90%",
                height: "auto",
              }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              sx={{
                border: "1px solid #FF9900",
                background:
                  "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
                borderRadius: "40px",
                height: "45px",
                padding: "5px 20px",
                width: "150px",
                "&:hover": {
                  background:
                    "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
                  color: "white",
                },
              }}
              onClick={() => {
                handleTree(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </PopUp>
      </Grid>
    </>
  );
};
export default Vizbook;

