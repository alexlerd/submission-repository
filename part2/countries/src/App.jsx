import React, { useState } from "react";
import CountryList from "./components/CountyList";
import SearchBar from "./components/SearchBar";
// import WeatherApp from "./components/WeatherApp";

const App = () => {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text) => {
    setSearchText(text);
  };

  return (
    <>
      <p>Find countries: </p>
      <SearchBar handleTextChange={handleTextChange} />
      <CountryList searchText={searchText} />
      {/* <WeatherApp /> */}
    </>
  );
};

export default App;
