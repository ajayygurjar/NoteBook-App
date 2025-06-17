import React, { useState, useContext } from "react";
import { NoteBookContext } from "../../context/noteBook-context";
import Modal from "../UI/Modal"; 
import AddNoteForm from "./AddNoteForm"; 
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";

const AddNotePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); 
  const { notes, addNotes, deleteNote, editNote } = useContext(NoteBookContext);
  const [searchQuery, setSearchQuery] = useState("");



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

  
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Container className="my-4">
      <Row className="mb-3">
        <Col>
          <h1 className="text-center">Notebook</h1>
        </Col>
      </Row>

      <Row className="mb-4 align-items-center">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={4} className="text-md-end mt-2 mt-md-0">
          <Button onClick={handleFormState}>Add New Note</Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <p>Total Notes: {notes.length} | Showing: {filteredNotes.length}</p>
        </Col>
      </Row>

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

      <Row>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
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
    </Container>
  );
};

export default AddNotePage;
