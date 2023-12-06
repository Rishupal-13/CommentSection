import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function ActionButtons({
  editMode,
  setEditMode,
  index,
  commentList,
  setCommentList,
  commentObject,
  setCommentObject,
  editingIndex,
  setEditingIndex,
  showReplyBox,
  setShowReplyBox,
  masterData,
  setMasterData,
  uniqueId,
  
}) {
  const handleEdit = () => {
    setEditingIndex(index);

    setEditMode(true);
  };
  const handleSave = () => {
    const updatedCommentList = [...commentList];

    // If in edit mode, replace the comment at the editingIndex
    if (editMode && editingIndex !== null) {
      updatedCommentList[editingIndex] = commentObject;
    } 

    console.log(updatedCommentList);

    setCommentList(updatedCommentList);
    setEditMode(false);
    setEditingIndex(null);
    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: "",
      replies: [],
    });
    setEditMode(false);
  };
  const handleReply = () => {
    setEditingIndex(index);

    setShowReplyBox(true);
  };
  const handleDelete=(index) => {
    const updatedCommentList = commentList.filter((item, i) => item.id !== uniqueId);
    setCommentList(updatedCommentList);

  }
  console.log(uniqueId);
  return (
    <div>
      <IconButton
        size="small"
        aria-label="delete"
        sx={{
          // position: "absolute",
          marginLeft: "368px",
          top: "0",
          right: "0",
          color:"white",
          background:"black"
        }}
          onClick={() => handleDelete(index)}
      >
        <DeleteIcon />
      </IconButton>
      {editMode && index === editingIndex ? (
        <div>
          {" "}
          <Button variant="text" size="small" onClick={handleSave}>
            Save
          </Button>
          <Button variant="text" size="small" onClick={handleCancel}>
            Cancel
          </Button>{" "}
        </div>
      ) : (
        <div>
          <Button variant="text" size="small" onClick={handleReply}>
            Reply
          </Button>
          <Button variant="text" size="small" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
