import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ActionButtons from "./ActionButtons";
import "./style.css";

function CommentSection({
  commentList,
  setCommentList,
  commentObject,
  setCommentObject,
  index,
  masterData,
  setMasterData,
  uniqueId,
  newCommentCheck,
  setNewCommentCheck,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // New state for the editing index
  const [showReplyBox, setShowReplyBox] = useState(false);

  const hanldeAdd = () => {
    const newReply = {
      id: Date.now(),
      name: commentObject.name,
      comment: commentObject.comment,
      commentedOn: new Date(),
      replies: [],
    };

    // Update the commentList by adding the new reply to the replies field of the current comment
    const updatedCommentList = [...masterData];
    updatedCommentList[editingIndex]?.replies?.push(newReply);

    // Update the state with the modified commentList
    setMasterData(updatedCommentList);

    // Reset the commentObject and showReplyBox
    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
    setShowReplyBox(false);
    setNewCommentCheck(true);
  };
  const handleEditComment = (event, reply) => {
    const commentObjectClone = { ...reply };

    commentObjectClone.comment = event.target.value;

    commentObjectClone.commentedOn = new Date();

    setCommentObject(commentObjectClone);
  };
  return (
    <div>
      <div style={{ paddingLeft: "30px" }}>
        {commentList &&
          commentList.length > 0 &&
          commentList.map((reply, index) => (
            <>
              <Box
                component="form"
                sx={{
                  width: "400px",
                  height: "145px",
                  marginTop: "20px",
                  background: "#cecfce",
                  paddingTop: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="commentContent">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="postedName">{reply?.name}</div>
                    <div className="postedDate">
                      {reply?.commentedOn.toLocaleString()}
                    </div>
                  </div>
                  <div className="postedComment">
                    {editMode && index === editingIndex ? (
                      <TextField
                        id="outlined-basic"
                        label=""
                        variant="outlined"
                        size="small"
                        defaultValue={reply?.comment}
                        onChange={(event) => {
                          handleEditComment(event, reply);
                        }}
                      />
                    ) : (
                      reply?.comment
                    )}
                  </div>

                  <div className="actionButtons">
                    <ActionButtons
                      editMode={editMode}
                      setEditMode={setEditMode}
                      commentObject={commentObject}
                      setCommentObject={setCommentObject}
                      editingIndex={editingIndex}
                      setEditingIndex={setEditingIndex}
                      showReplyBox={showReplyBox}
                      setShowReplyBox={setShowReplyBox}
                      index={index}
                      masterData={masterData}
                      setMasterData={setMasterData}
                      uniqueId={reply.id}
                      currentArray={reply}
                      newCommentCheck={newCommentCheck}
                      setNewCommentCheck={setNewCommentCheck}
                    />
                  </div>
                </div>
              </Box>

              {showReplyBox && index === editingIndex && (
                <div className="replyBox">
                  <Box
                    component="form"
                    sx={{
                      width: "400px",
                      height: "220px",
                      margin: "30px",
                      background: "#cecfce",
                    }}
                  >
                    <div className="heading"> Comment</div>
                    <div className="nameField">
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "280px",
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

                    <div className="commentField">
                      <TextField
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "280px",
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
                      <Button variant="text" onClick={hanldeAdd}>
                        Post
                      </Button>
                    </div>
                  </Box>
                </div>
              )}
              {reply?.replies && reply.replies.length > 0 && (
                <CommentSection
                  commentList={reply.replies}
                  setCommentList={setCommentList}
                  commentObject={commentObject}
                  setCommentObject={setCommentObject}
                  index={index}
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                  masterData={masterData}
                  setMasterData={setMasterData}
                  uniqueId={reply.id}
                  newCommentCheck={newCommentCheck}
                  setNewCommentCheck={setNewCommentCheck}
                />
              )}
            </>
          ))}
      </div>
    </div>
  );
}

export default CommentSection;
