import React, { useRef, useContext, useEffect } from "react";
import { NoteBookContext } from "../context/noteBook-context";

const AddNoteForm = ({ onHandleState, note }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { addNotes, editNote } = useContext(NoteBookContext);

  // If it's an edit operation, populate the form fields with the existing note's details
  useEffect(() => {
    if (note) {
      titleRef.current.value = note.title;
      descriptionRef.current.value = note.description;
    }
  }, [note]);

  const handleForm = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    
    if (note) {
      editNote(note._id, title, description);  
    } else {
      addNotes(title, description); 
    }

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    onHandleState();  
  };

  const handleClose = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    onHandleState();
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <label htmlFor="title">Note Title</label>
        <input id="title" type="text" ref={titleRef} required />

        <label htmlFor="description">Description</label>
        <input id="description" type="text" ref={descriptionRef} required />

        <button type="submit">{note ? "Update " : "Add Note"}</button>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </form>
    </>
  );
};

export default AddNoteForm;
