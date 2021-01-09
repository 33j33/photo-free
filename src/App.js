import React, { useEffect, useState } from 'react';
import './App.css';
import ImageCard from "./components/ImageCard";
import SearchImage from "./components/SearchImage";
import Loader from "react-loader-spinner";
import { AiFillVideoCamera } from "react-icons/ai"

function App() {
  const [imagesData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [queryObject, setQueryObject] = useState({ searchTerm: "", orientation: "" });

  const searchHandler = (textInput, orientation) => setQueryObject({ searchTerm: textInput, orientation: orientation });

  // useEffect runs only when `queryObject`state changes 
  // and it changes when user presses search
  useEffect(() => {
    const fetchData = async () => {
      const q = queryObject.searchTerm;
      const orientation = queryObject.orientation;
      console.log(queryObject);
      const url = `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${q}&orientation=${orientation}`
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImageData(data.hits)
        setIsLoading(false);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [queryObject]);
  return (
    <div className="App">
      <div className="header">
        <h1 className="title"><AiFillVideoCamera /> Pixels</h1>
        <p>Search Creative Commons License Images</p>
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
    </div>
  );
}

export default App;
