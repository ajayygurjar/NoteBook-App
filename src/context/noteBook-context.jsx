/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


const NoteBookContext = createContext();

const NoteContextProvider = (props) => {
  const [notes, setNotes] = useState([]);
  const apiUrl = "https://crudcrud.com/api/3fbd229434e245d08ac6a935b123a9b6/notes"; 


  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  
  const addNotes = async (title, description) => {
    try {
      const response = await axios.post(apiUrl, { title, description });
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  
  const editNote = async (id, newTitle, newDescription) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, { title: newTitle, description: newDescription });
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title: newTitle, description: newDescription } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  
  
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NoteBookContext.Provider value={{ notes, addNotes, editNote, deleteNote }}>
      {props.children}
    </NoteBookContext.Provider>
  );
};

export { NoteContextProvider, NoteBookContext };
