import React, { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import axios from "axios"; // Importing Axios for HTTP requests
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  // State variables
  const [persons, setPersons] = useState([]); // State for storing persons data
  const [newName, setNewName] = useState(""); // State for new person's name
  const [newNumber, setNewNumber] = useState(""); // State for new person's number
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [idCounter, setIdCounter] = useState(1); // State for generating person IDs
  const [isLoading, setIsLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State for potential errors
  const [showMessage, setShowMessage] = useState("");
  useEffect(() => {
    // Effect for fetching initial list of persons
    fetchInitialList();
  }, []);

  const fetchInitialList = () => {
    // Function to fetch initial list of persons from the server
    axios
      .get("http://localhost:3001/initialList")
      .then((response) => {
        setPersons(response.data);
        setIdCounter(response.data.length + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  const handleChangeName = (event) => {
    const newName = event.target.value;
    const hasNoDigits = !/\d/.test(newName);
    if (hasNoDigits) {
      setNewName(newName);
    }
  };

  const handleChangeNumber = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^\d-]/g, "");
    setNewNumber(numericValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isDataValid = newName && newNumber;
    if (!isDataValid) {
      return;
    }
    const personExists = personAlreadyExists(newName, newNumber);
    if (personExists) {
      alert(`${newName} or ${newNumber} already exists!`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    axios
      .post("http://localhost:3001/initialList", newPerson)
      .then((response) => {
        setPersons((prevPersons) => [...prevPersons, response.data]);
        setNewName("");
        setNewNumber("");
        console.log("New person added to the server:", response.data);
        setShowMessage(`Added ${newName} ${newNumber}`); // Set success message
        setTimeout(() => {
          setShowMessage(""); // Clear message after a few seconds
        }, 3000); // Adjust time as needed (3000 milliseconds = 3 seconds)
      })
      .catch((error) => {
        console.log("Error adding new person:", error);
        setShowMessage("Failed to add person. Please try again.");
        setTimeout(() => {
          setShowMessage(""); // Clear message after a few seconds
        }, 3000); // Adjust time as needed (3000 milliseconds = 3 seconds)
      });
  };

  const personAlreadyExists = (name, number) => {
    return persons.some(
      (person) =>
        person.name.toLowerCase() === name.toLowerCase() ||
        person.number === number
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    // Handler for deleting a person
    const personToDelete = persons.find((person) => person.id === id);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (!shouldDelete) return;
    axios
      .delete(`http://localhost:3001/initialList/${id}`)
      .then((response) => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        console.log("Person deleted from the server:", response.data);
        if (!personToDelete) {
          alert(
            `Information ${personToDelete} was already deleted from the server`
          );
        }
      })
      .catch((error) => {
        console.log("Error deleting person:", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={showMessage} />
      <Filter id="search" value={searchTerm} onChange={handleSearch}>
        filter shown with:
      </Filter>
      <hr />
      <h3>Add a name and number below:</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons list={searchPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;
