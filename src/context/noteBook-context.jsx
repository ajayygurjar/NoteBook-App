import { useState } from "react";
import React from "react";


const NoteBookContext = React.createContext();


const NoteContextProvider = (props) => {
  
  const [notes, setNotes] = useState([]);

  
  const addNotes = (title, description) => {
    const newNote = {
      id: Date.now(), 
      title,
      description,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  
  const handleClose = () => {
  
    console.log("Handle Close");
  };

  
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  
  const editNote = (id, newTitle, newDescription) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, title: newTitle, description: newDescription }
          : note
      )
    );
  };

  
  const value = { notes, addNotes, handleClose, deleteNote, editNote };

  return (
    <NoteBookContext.Provider value={value}>
      {props.children}
    </NoteBookContext.Provider>
  );
};

export { NoteContextProvider, NoteBookContext };
