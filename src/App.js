import React, { useEffect, useState } from 'react';
import './App.css';
import ImageCard from "./components/ImageCard";
import SearchImage from "./components/SearchImage";
import Loader from "react-loader-spinner";
import { AiFillVideoCamera } from "react-icons/ai"
import Pagination from "./components/Pagination";

function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [imagesData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryObject, setQueryObject] = useState({ searchTerm: "", orientation: "" });

  // Callback handler receives input from `text-input` and `select` elements
  // constructs an object using the input and passes to state setter function
  const searchHandler = (textInput, orientation) => setQueryObject({ searchTerm: textInput, orientation: orientation });

  const paginate = (pageNum) => setPageNumber(pageNum);
  // useEffect runs only when `queryObject`state changes 
  // and the state changes when user presses search
  useEffect(() => {
    const fetchData = async () => {
      const q = queryObject.searchTerm;
      const orientation = queryObject.orientation;
      console.log(queryObject, pageNumber);
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&orientation=${orientation}&page=${pageNumber}`
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImageData(data.hits)
        setIsLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [queryObject, pageNumber]);

  return (
    <div className="App">
      <div className="header">
        <h1 className="title"><AiFillVideoCamera /> Pixels</h1>
        <p>Search free to use images</p>
        <SearchImage searchHandler={searchHandler} />
      </div>
      {isLoading === false && imagesData.length === 0 && <h3>No Images Founds</h3>}

      {isLoading ?
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
        :
        <div className="image-grid">
          {imagesData.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      }
      <Pagination paginate={paginate} />
    </div>
  );
}

export default App;
