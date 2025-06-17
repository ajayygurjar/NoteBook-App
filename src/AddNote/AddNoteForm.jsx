import React, { useRef, useContext, useEffect } from "react";
import { NoteBookContext } from "../context/noteBook-context";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

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
       <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {note ? "Edit Note" : "Add New Note"}
              </Card.Title>
              <Form onSubmit={handleForm}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Note Title</Form.Label>
                  <Form.Control
                    type="text"
                    ref={titleRef}
                    placeholder="Enter title"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    ref={descriptionRef}
                    placeholder="Enter description"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    {note ? "Update" : "Add Note"}
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AddNoteForm;
