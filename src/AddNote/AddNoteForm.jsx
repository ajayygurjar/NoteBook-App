import React, { useRef, useContext } from "react";
import { NoteBookContext } from "../context/noteBook-context"; 

const AddNoteForm = ({ onHandleState }) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { addNotes } = useContext(NoteBookContext); 

  const handleForm = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    
    addNotes(title, description);

    
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

        <button type="submit">Add Note</button>
        <button type="button" onClick={handleClose}>Close</button>
      </form>
    </>
  );
};

export default AddNoteForm;
