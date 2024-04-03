// SearchBar Component
import React, { useState } from "react";

const SearchBar = ({ handleTextChange }) => {
  // Pass the handleTextChange function as a prop
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    handleTextChange(event.target.value);
  };

  return (
    <form>
      <input type="text" value={text} onChange={handleChange} />
    </form>
  );
};

export default SearchBar;
