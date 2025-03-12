import React from "react";
import { NoteContextProvider } from  './context/noteBook-context';

import AddNotePage from "./AddNote/AddNotePage";

const App = () => {
  return (
    <NoteContextProvider>
      <AddNotePage/>
      
    </NoteContextProvider>
  );
};

export default App;
