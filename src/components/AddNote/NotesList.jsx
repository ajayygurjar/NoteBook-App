import React, { useContext } from "react";
import { NoteBookContext } from "../../context/noteBook-context";
import Modal from "../UI/Modal";
import AddNoteForm from "./AddNoteForm";
import { Row, Col, Card, Button } from "react-bootstrap";

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
     <div className="my-4">
      <h2 className="text-center mb-4">Notes</h2>
      <Row>
        {notes.length > 0 ? (
          notes.map((note) => (
            <Col md={4} sm={6} xs={12} className="mb-3" key={note._id}>
              <Card>
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text>{note.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(note)}>Edit</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteNote(note._id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col><p>No notes found.</p></Col>
        )}
      </Row>

      {isEditModalOpen && selectedNote && (
        <Modal onClose={closeModal}>
          <AddNoteForm onHandleState={closeModal} note={selectedNote} />
        </Modal>
      )}
    </div>
  );
};

export default NotesList;
