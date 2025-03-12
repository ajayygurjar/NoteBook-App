import React, { useContext } from "react";
import { NoteBookContext } from "../context/noteBook-context";
import Modal from "../UI/Modal";
import AddNoteForm from "./AddNoteForm";

const NotesList = ({ notes }) => {
  const { deleteNote } = useContext(NoteBookContext);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState(null); 

  const handleEdit = (note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div>
      <h2>Notes</h2>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
            <button onClick={() => handleEdit(note)}>Edit</button>
          </div>
        ))
      ) : (
        <p>No notes found</p>
      )}

      
      {isEditModalOpen && selectedNote && (
        <Modal onClose={closeModal}>
          <AddNoteForm
            onHandleState={closeModal}
            note={selectedNote} 
          />
        </Modal>
      )}
    </div>
  );
};

export default NotesList;
