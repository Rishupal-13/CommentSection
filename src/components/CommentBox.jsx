import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { commentData } from "../Data/commentsData";
import CommentSection from "./CommentSection";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
function CommentBox() {
  const [commentList, setCommentList] = useState(commentData);
  const [masterData, setMasterData] = useState(commentData);
  const [commentObject, setCommentObject] = useState({
    id: "",
    name: "",
    comment: "",
    commentedOn: null,
    replies: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // New state for the editing index
  const [uniqueId, setUniqueId] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const handleAddComments = (commentId, comment) => {
    console.log(commentId, comment, "heyyy handleaddcomment");
  };
  // const handlePost = () => {
  //   let newDate = new Date();

  //   setCommentObject({ ...commentObject, commentedOn: newDate , id: Date.now()});
  //   if (
  //     commentObject.name.trim() !== "" &&
  //     commentObject.comment.trim() !== ""
  //   ) {
  //     const newCommentList = [...commentList, commentObject];
  //     setCommentList(newCommentList);
  //     setCommentObject({ id:"",name: "", comment: "", commentedDate: "" , replies:[]});
  //   }

  // };
  const handlePost = () => {
    const newCommentObject = {
      id: Date.now(),
      name: commentObject.name,
      comment: commentObject.comment,
      commentedOn: new Date(),
      replies: [],
    };

    if (editMode && editingIndex !== null) {
      const updatedCommentList = [...commentList];
      updatedCommentList[editingIndex] = newCommentObject;
      setCommentList(updatedCommentList);
    } else {
      setCommentList([...commentList, newCommentObject]);
    }

    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
    setEditMode(false);
    setEditingIndex(null);
  };
  const handleSort = () => {
    const sortedCommentList = [...commentList];
  
    sortedCommentList.sort((a, b) => {
      const timeA = a.commentedOn.getTime();
      const timeB = b.commentedOn.getTime();
  
      // Toggle between ascending and descending order
      const sortOrder = isAscending ? 1 : -1;
  
      return sortOrder * (timeA - timeB);
    });
  
    setCommentList(sortedCommentList);
    setIsAscending(!isAscending); // Toggle the sorting order
  };
  

  console.log("commentList", commentList);
  console.log("commentObject", commentObject);

  return (
    <div className="postComment">
      <div className="commentSection">
        <Box
          component="form"
          sx={{
            width: "400px",
            height: "260px",
            margin: "30px 30px 0px 30px",
            background: "#cecfce",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="commentBox"
            style={{ alignItems: "start", textAlign: "left" }}
          >
            <div className="heading" style={{ padding: "10px" }}>
              {" "}
              Comment
            </div>
            <div className="nameField">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="medium"
                value={commentObject?.name}
                sx={{
                  width: "350px",
                  backgroundColor: "white",
                }}
                onChange={(event) => {
                  setCommentObject({
                    ...commentObject,
                    name: event.target.value,
                  });
                }}
              />
            </div>

            <div className="commentField" style={{ marginTop: "40px" }}>
              <TextField
                id="outlined-basic"
                label="Comment"
                variant="outlined"
                size="medium"
                value={commentObject?.comment}

                sx={{
                  width: "350px",
                  backgroundColor: "white",
                }}
                onChange={(event) => {
                  setCommentObject({
                    ...commentObject,
                    comment: event.target.value,
                  });
                }}
              />
            </div>
            <div
              className="postButton"
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "20px",
              }}
            >
              <Button variant="contained" onClick={handlePost}>
                Post
              </Button>
            </div>
          </div>
        </Box>
        <div
          className="sortingByDate"
          style={{ display: "flex", marginLeft:"200px"}}
        >
          <h4>sort by Date and Time </h4>
          <IconButton aria-label="delete" size="small" onClick={handleSort}>
            <ArrowUpwardIcon />
          </IconButton>
        </div>
        <CommentSection
          commentList={commentList}
          setCommentList={setCommentList}
          commentObject={commentObject}
          setCommentObject={setCommentObject}
          uniqueId={uniqueId}
          handleAddComments={handleAddComments}
          masterData={masterData}
          setMasterData={setMasterData}
        />
      </div>
    </div>
  );
}

export default CommentBox;
