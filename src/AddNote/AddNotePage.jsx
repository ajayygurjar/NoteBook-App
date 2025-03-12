import React, { useState, useContext } from "react";
import { NoteBookContext } from "../context/noteBook-context";
import Modal from "../UI/Modal"; 
import AddNoteForm from "./AddNoteForm"; 

const AddNotePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); 
  const { notes, addNotes, deleteNote, editNote } = useContext(NoteBookContext);

  const handleFormState = () => {
    setShowForm((prev) => !prev);
    setSelectedNote(null);
    
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowForm(true); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>NoteBook</h1>
      <label htmlFor="search">Search:</label>
      <input
        id="search"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <h6>Total Notes: {notes.length}</h6>
      <h6>Showing: {filteredNotes.length} notes</h6>

      <button onClick={handleFormState}>Add New Note</button>

      {showForm && (
        <Modal onClose={handleFormState}>
          <AddNoteForm
            onHandleState={handleFormState}
            note={selectedNote}
            addNotes={addNotes}
            editNote={editNote}
          />
        </Modal>
      )}

      <div>
        <h2>Notes</h2>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default AddNotePage;
