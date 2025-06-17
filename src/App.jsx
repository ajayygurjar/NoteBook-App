import React from "react";
import { NoteContextProvider } from './context/noteBook-context';
import AddNotePage from "./components/AddNote/AddNotePage";
import { Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <NoteContextProvider>
      <Container className="my-5">
        <Card className="p-4 border-primary shadow" style={{ backgroundColor: '#e3f2fd' }}>
          <AddNotePage />
        </Card>
      </Container>
    </NoteContextProvider>
  );
};

export default App;
