import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function ActionButtons({
  editMode,
  setEditMode,
  index,

  commentObject,
  setCommentObject,
  editingIndex,
  setEditingIndex,
  showReplyBox,
  setShowReplyBox,
  masterData,
  setMasterData,
  uniqueId,
  currentArray,
  newCommentCheck,
  setNewCommentCheck,
}) {
  const handleEdit = () => {
    setEditingIndex(index);

    setEditMode(true);
  };
  const handleSave = () => {
    const updatedCommentList = [...masterData];

    // If in edit mode, replace the comment at the editingIndex
    if (editMode && editingIndex !== null) {
      // updatedCommentList[editingIndex] = commentObject;
      for (let i = 0; i < masterData.length; i++) {
        if (masterData[i]?.id === uniqueId) {
          updatedCommentList[editingIndex] = commentObject;
        } else {
          for (let j = 0; j < masterData[i]?.replies?.length; j++) {
            if (masterData[i].replies[j]?.id === uniqueId) {
              updatedCommentList[i].replies[j] = commentObject;
            }
          }
        }
      }
    }

    setMasterData(updatedCommentList);
    setEditMode(false);
    setEditingIndex(null);
    setNewCommentCheck(false);
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
  const handleDelete = () => {
    // Assuming 'uniqueId' is the ID of the comment you want to delete
    const updatedMasterData = masterData
      .map((item) => {
        // If the current item matches the uniqueId, return null to filter it out
        if (item.id === uniqueId) {
          return null;
        }

        // If the current item has replies, filter out any with the matching uniqueId
        if (item.replies && item.replies.length > 0) {
          item.replies = item.replies.filter((reply) => reply.id !== uniqueId);
        }

        return item;
      })
      .filter(Boolean);


    setMasterData(updatedMasterData);
    setEditingIndex(null);
    setCommentObject({
      id: "",
      name: "",
      comment: "",
      commentedOn: null,
      replies: [],
    });
    setEditMode(false);
    setNewCommentCheck(false);
  };

  return (
    <div>
      <IconButton
        size="small"
        aria-label="delete"
        sx={{
          marginLeft: "368px",
          top: "0",
          right: "0",
          color: "white",
          background: "black",
          fontSize: "16px",
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
          {(currentArray?.replies?.length !== 0 || newCommentCheck) && (
            <Button variant="text" size="small" onClick={handleReply}>
              Reply
            </Button>
          )}

          <Button variant="text" size="small" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default ActionButtons;
