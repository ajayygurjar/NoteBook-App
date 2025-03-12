import { useState,useContext } from "react";
import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList"; 
import { NoteBookContext } from "../context/noteBook-context";

const AddNotePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  const { notes } = useContext(NoteBookContext); 

  
  const handleFormState = () => {
    setShowForm((prev) => !prev);
  };

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
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

      {!showForm && <button onClick={handleFormState}>Add Note</button>}
      {showForm && <AddNoteForm onHandleState={handleFormState} />}

      <NotesList notes={filteredNotes} /> 
    </div>
  );
};

export default AddNotePage;
