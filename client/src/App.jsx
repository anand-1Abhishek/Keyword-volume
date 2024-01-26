import React, { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [searchVolume, setSearchVolume] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/search-volume",
        {
          keyword,
        }
      );
      setSearchVolume(response.data.searchVolume);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);

    // Clear searchVolume when editing the input
    setSearchVolume(null);
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container m-5 d-flex flex-column gap-5 align-items-center">
      <h1> <span style={{color : "#f05600"}}>Etsy</span> Keyword Search Volume</h1>
      <div className="input-group relative my-auto my-5 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search any word"
          value={keyword}
          onChange={handleInputChange}
          onKeyDown={handleInputChange}
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          onClick={handleSearch}
          className="btn  btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
        <div className="container mt-4 d-flex justify-content-center align-items-center w-100">
          {searchVolume !== null && (
            <p style={{fontSize : "20px"}} className="fs-3" >
              <>Search Volume for "{keyword}" : {searchVolume} times per month</>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
