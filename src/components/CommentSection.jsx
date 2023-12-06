import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ActionButtons from "./ActionButtons";

function CommentSection({
  commentList,
  setCommentList,
  commentObject,
  setCommentObject,
  handleAddComments,
  index,
  masterData,
  setMasterData,
  uniqueId,

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
    const updatedCommentList = [...commentList];
    updatedCommentList[editingIndex]?.replies?.push(newReply);

    // Update the state with the modified commentList
    setCommentList(updatedCommentList);

    // Reset the commentObject and showReplyBox
    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
    setShowReplyBox(false);
 
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
                  height: "130px",
                  marginTop: "20px",
                  background: "#cecfce",
                  paddingTop: "15px",
                  borderRadius: "10px", 
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
                }}
              >
                <div
                  className="commentContent"
                  style={{
                    alignItems: "start",
                    textAlign: "left",
                    padding: "0px 15px 0px 15px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="postedName">{commentList[index]?.name}</div>
                    <div className="postedDate">{commentList[index]?.commentedOn.toLocaleString()}</div>
                  </div>
                  <div className="postedComment" style={{ paddingTop: "10px" }}>
                    {editMode && index === editingIndex ? (
                      <TextField
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                        size="small"
                        onChange={(event) => {
                          setCommentObject({
                            ...commentList[editingIndex],
                            comment: event.target.value,
                            // name: commentList[editingIndex].name,
                            // replies: commentList[editingIndex].replies,
                            // commentedOn:""
                          });
                        }}
                      />
                    ) : (
                      commentList[index]?.comment
                    )}
                  </div>

                  <div className="actionButtons">
                    <ActionButtons
                      editMode={editMode}
                      setEditMode={setEditMode}
                      commentList={commentList}
                      setCommentList={setCommentList}
                      commentObject={commentObject}
                      setCommentObject={setCommentObject}
                      editingIndex={editingIndex}
                      setEditingIndex={setEditingIndex}
                      showReplyBox={showReplyBox}
                      setShowReplyBox={setShowReplyBox}
                      index={index}
                      masterData={masterData}
                      setMasterData={setMasterData}
                      uniqueId={uniqueId}
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
                      height: "280px",
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
                        sx={{
                          width: "280px",
                          backgroundColor: "white" 
          
                        }}
                        onChange={(event) => {
                          setCommentObject({
                            ...commentObject,
                            name: event.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="commentField" style={{ margin: "40px" }}>
                      <TextField
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                        sx={{
                          width: "280px",
                          backgroundColor: "white" 
          
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
              <CommentSection
                commentList={reply.replies}
                setCommentList={setCommentList}
                commentObject={commentObject}
                setCommentObject={setCommentObject}
                handleAddComments={handleAddComments}
                index={index}
                editMode={editMode}
                setEditMode={setEditMode}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                masterData={masterData}
                setMasterData={setMasterData}
                uniqueId={reply.id}

              />
            </>
          ))}
      </div>
    </div>
  );
}

export default CommentSection;
