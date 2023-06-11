import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [currentResult, setCurrentResult] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const fetchSearchHistory = () => {
    axios
      .get("https://word-counter-urd7.onrender.com/urls")
      .then((response) => {
        setSearchHistory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleWordCount = () => {
    setIsLoading(true);

    const endpoint = "https://word-counter-urd7.onrender.com/insights";
    const data = {
      url: url,
    };

    axios
      .post(endpoint, data)
      .then((response) => {
        setCurrentResult(response.data);
        fetchSearchHistory();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRemoveEntry = (id) => {
    const endpoint = `https://word-counter-urd7.onrender.com/delete/${id}`;

    axios
      .delete(endpoint)
      .then(() => {
        fetchSearchHistory();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveData = (data) => {
    const endpoint = "https://word-counter-urd7.onrender.com/urls";

    axios
      .get(endpoint, data)
      .then(() => {
        fetchSearchHistory();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFavEntry = (id, isFavourite) => {
    const endpoint = `https://word-counter-urd7.onrender.com/${
      isFavourite ? "unfavorite" : "favorite"
    }/${id}`;

    axios
      .put(endpoint)
      .then(() => {
        const updatedSearchHistory = searchHistory.map((item) => {
          if (item._id === id) {
            return { ...item, favourite: !isFavourite };
          }
          return item;
        });
        setSearchHistory(updatedSearchHistory);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app">
      <div>
        <h1>Webpage Word Counter</h1>
        <div className="input-container">
          <TextField
            label="Enter Website URL"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
          />
          <Button
            variant="contained"
            onClick={handleWordCount}
            style={{ padding: "15px", margin: "5px" }}
          >
            Get insights
          </Button>
        </div>

        {isLoading ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>
            <h2>Search History</h2>
          </div>
        )}
      </div>
      <div className="table-container">
        {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "10%" }}>Domain Name</TableCell>
                  <TableCell style={{ width: "5%" }} align="center">
                    Word Count
                  </TableCell>
                  <TableCell style={{ width: "5%" }} align="center">
                    Favourite
                  </TableCell>
                  <TableCell style={{ width: "10%" }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">{item.wordCount}</TableCell>
                    <TableCell align="center">
                      {item.favourite.toString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleFavEntry(item._id, item.favourite)}
                        style={{ marginRight: "5px" }}
                      >
                        {item.favourite ? "Unfavorite" : "Favorite"}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleRemoveEntry(item._id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div>
            <h3>No search history yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
