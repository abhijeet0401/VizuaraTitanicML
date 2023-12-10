import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRef } from "react";
import { Link } from "react-scroll";

import { useState } from "react";



const ContBtn = ({
  size,
  enabled,
  setEnabled,
  next,
  id,
  subConceptArr,
  handleNext,
  unitProgress,
  setDivId,
  currentPageNo,
  totalPageNo,
  setShowFeedback,
  activeChapterId,
  params,
  uploadTimeSpend
}) => {
  // const ctx = useAuth();
  const [progressHook, setProgressHook] = useState(0);


  const updateProgress = (id_number) => {
    //check whether the progress array already exists
    
    
    let progressArray = [0, 0, 0, 0];
    

    let totalProgress = 0;
    // let progressPerPage = [...progressPercent]
    for (let i = 0; i < currentPageNo; i++) {
      if (i == currentPageNo - 1) {
        // progressPerPage[currentPageNo - 1] = id_number * unitProgress
        totalProgress = totalProgress + id_number * unitProgress;
      } else {
        // progressPerPage[i] = subConceptArr[i] * unitProgress
        totalProgress = totalProgress + subConceptArr[i] * unitProgress;
      }
    }
    // setProgressPercent(progressPerPage)
    setProgressHook(totalProgress);
    vizbookUserData(totalProgress);

    if (totalProgress > progressArray[0]) {
      progressArray[0] = totalProgress;
      submitProgress(progressArray);
    }
  };

  //question and user data
  const vizbookUserData = async (totalProgress) => {
    // setLoading(true);
    // const userRef = doc(
    //   db,
    //   "users",
    //   ctx?.user?.email,
    //   "chapterData",
    //   `${params?.class?.replace("class", "")}S${params?.chapter?.replace(
    //     "chapter",
    //     ""
    //   )}`,
    //   "progress",
    //   "vizbook"
    // );

    // const userRes = await getDoc(userRef);

    // if (userRes.exists()) {
    //   await setDoc(
    //     userRef,
    //     {
    //       progress: totalProgress,
    //     },
    //     { merge: true }
    //   );
    // } else {
    //   await setDoc(
    //     userRef,
    //     {
    //       progress: unitProgress,
    //     },
    //     { merge: true }
    //   );
    // }
  };

  const submitProgress = async (progressArray) => {
    // let data = {};
    // data[activeChapterId] = progressArray;
    // const docRef = doc(db, `users/${ctx?.user?.email}`);
    // await setDoc(docRef, data, { merge: true });
  };

  const openNextPage = (id_number) => {
    updateProgress(id_number);
    handleNext(true);
    // bgsound3.current?.play();
  };

  const showNext = (id_number) => {
    updateProgress(id_number);

    setDivId(id_number + 1);

    if (parseInt(id_number + 1) == size) {
      let index = enabled?.lastIndexOf(true);
      updateArr(index + 1);
    }
  };
  const updateArr = (index) => {
    const updatedArr = [...enabled];
    updatedArr[index] = true;
    setEnabled(updatedArr);
  };
  const showFeedbackPop = (id_number) => {
    uploadTimeSpend()
    updateProgress(id_number);
    setShowFeedback(true);
  };

  // const classes = useStyles();

  // useEffect(() => {
  //   if (!classes) {
  //     return <Loading />;
  //   }
  // }, [classes]);

  return (
    <Box sx={{ textAlign: "center" }}>
      {next ? (
        currentPageNo == totalPageNo - 1 ? (
          <Button
            sx={{
              background:
                "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
              boxShadow: "0px 10px 20px rgba(74, 74, 74, 0.2)",
              borderRadius: "40px",
              height: "45px",
              padding: "5px 20px",
              width: "200px",
              color: "white",
            }}
            onClick={() => {
              showFeedbackPop(id);
            }}
          >
            Click to Finish
          </Button>
        ) : (
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
            onClick={() => {
              openNextPage(id);
            }}
          >
            Next page
            <ArrowForwardIosOutlined />
          </Button>
        )
      ) : (
        <Link
          containerId="sub"
          onClick={() => {
            showNext(id);
          }}
          to={`${id + 1}`}
          spy={true}
          smooth={true}
          style={{ textAlign: "center" }}
        >
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
          >
            Continue
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default ContBtn;
