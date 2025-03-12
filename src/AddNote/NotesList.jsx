import React, { useContext } from "react";
import { NoteBookContext } from "../context/noteBook-context";

const NotesList = ({ notes }) => {
  const { deleteNote } = useContext(NoteBookContext); 

  return (
    <div>
      <h2>Notes</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NotesList;
