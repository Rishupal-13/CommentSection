import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentSection from "./CommentSection"
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./style.css";

function CommentBox() {
  const webData = JSON.parse(localStorage.getItem('commentKey'))
console.log(webData);
  const [commentList, setCommentList] = useState([]);
  const [masterData, setMasterData] = useState(localStorage.getItem("commentKey")==null?[]: JSON.parse(localStorage.getItem("commentKey")));
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
  const [newCommentCheck, setNewCommentCheck] = useState(false);

  const handlePost = () => {
   
     document.getElementById("outlined-basic-comment").value="";
     document.getElementById("outlined-basic-name").value="";
  
    if (
      commentObject.name.trim() === "" ||
      commentObject.comment.trim() === ""
    ) {
      // If either name or comment is missing, do not proceed with posting
      return;
    }

    const newCommentObject = {
      id: Date.now(),
      name: commentObject.name,
      comment: commentObject.comment,
      commentedOn: new Date(),
      replies: [],
    };
    debugger;

  
      setMasterData([...masterData, newCommentObject]);
      localStorage.setItem("commentKey", JSON.stringify([...masterData, newCommentObject]));
    

    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
    setEditMode(false);
    setEditingIndex(null);
    setNewCommentCheck(true)
  };
  const handleSort = () => {
    const sortedCommentList = [...masterData];
  
    sortedCommentList?.sort((a, b) => {
      // Ensure that both a and b have a valid commentedOn property
      const timeA = a?.commentedOn instanceof Date ? a.commentedOn.getTime() : 0;
      const timeB = b?.commentedOn instanceof Date ? b.commentedOn.getTime() : 0;
  
      // Toggle between ascending and descending order
      const sortOrder = isAscending ? 1 : -1;
  
      return sortOrder * (timeA - timeB);
    });
  
    setMasterData(sortedCommentList);
    localStorage.setItem("commentKey", JSON.stringify(sortedCommentList));
    setIsAscending(!isAscending); // Toggle the sorting order
  };
  

 
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
          <div className="commentBox">
            <div className="heading"> Comment</div>
            <div className="nameField">
              <TextField
                id="outlined-basic-name"
                label="Name"
                variant="outlined"
                size="medium"
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

            <div className="commentFieldBox">
              <TextField
                id="outlined-basic-comment"
                label="Comment"
                variant="outlined"
                size="medium"
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
            <div className="postButton">
              <Button variant="contained" onClick={handlePost}>
                Post
              </Button>
            </div>
          </div>
        </Box>
        <div className="sortingByDate">
          <h4>sort by Date and Time </h4>
          <IconButton aria-label="delete" size="small" onClick={handleSort}>
            <ArrowUpwardIcon />
          </IconButton>
        </div>
        <CommentSection
          commentList={webData}
          setCommentList={setCommentList}
          commentObject={commentObject}
          setCommentObject={setCommentObject}
          uniqueId={uniqueId}
          masterData={webData}
          setMasterData={setMasterData}
          newCommentCheck={newCommentCheck}
          setNewCommentCheck={setNewCommentCheck}
        />
      </div>
    </div>
  );
}

export default CommentBox;
