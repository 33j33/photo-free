import React, { useState } from 'react';
import "./Pagination.css";

const Pagination = ({ paginate }) => {

    const MAX_PAGES = 5;
    const buttons = [1, 2, 3, 4, 5];
    const [index, setIndex] = useState(1);

    // Tackle edge cases.
    const checkIndex = (i) => {
        if (i < 1) {
            return 1;
        }
        if (i > MAX_PAGES) {
            return MAX_PAGES;
        }
        return i;
    }
    const prevPage = () => {
        setIndex((prevIndex) => checkIndex(prevIndex - 1));
        paginate(index);
        console.log(index);
    }
    const nextPage = () => {
        setIndex((prevIndex) => checkIndex(prevIndex + 1));
        paginate(index);
        console.log(index);
    }
    // const handleClick = (elem) => {
    //     setIndex(elem);
    //     paginate(index);
    // }

    return (
        <div className="pagination">
            <button onClick={prevPage}>&laquo;</button>
            {buttons.map((elem) => (
                // Add active class to the button which is equal to the index state
                <button
                    key={elem}
                    className={elem === index ? "active" : null}
                >
                    {elem}
                </button>
            ))
            }
            {/* <button >1</button>
            <button className="active" >2</button>
            <button >3</button>
            <button >4</button>
            <button >5</button> */}
            <button onClick={nextPage}>&raquo;</button>
        </div>
    )
}

export default Pagination;