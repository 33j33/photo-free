import React, { useState } from 'react';
import "./SearchImage.css"

const SearchImage = ({ searchHandler }) => {
    const [input, setInput] = useState('');
    const [orientation, setOrientation] = useState('');

    const handleChange = (event) => {
        setOrientation(event.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        searchHandler(input, orientation);
    }

    return (
        <form onSubmit={onSubmit} className="form">
            <input
                label="Keyword"
                placeholder="Search Keyword"
                variant="outlined"
                type="text"
                id="query"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <select className="select-orient"
                labelId="orientation"
                id="orientation"
                value={orientation}
                onChange={handleChange}
            >
                <option value="horizontal">Landscape</option>
                <option value="vertical">Potrait</option>
                <option value="all">Both</option>
            </select>
            <button className="btn" type="submit">Search</button>
        </form>
    )
}
export default SearchImage;