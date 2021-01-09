import React from "react";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";
import "./ImageCard.css"
const ImageCard = (props) => {
    const url = props.webformatURL;
    const tags = props.tags.split(', ');
    const height = props.imageHeight;
    const width = props.imageWidth;
    const views = props.views;
    const downloads = props.downloads;
    const likes = props.likes;
    const comments = props.comments;
    const pageUrl = props.pageURL;
    return (
        <div className="card">
            <img src={url} alt="img" />
            <div className="tags">
                {tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
            <div className="info">
                <div><span>Dimensions: </span>{width}X{height}</div>
                <div><span>Views: </span>{views}</div>
                <div><span>Downloads: </span>{downloads}</div>
            </div>
            <a id="url" href={pageUrl}><u>Download Image</u></a>
            <div className="like-comment">
                <div><span>{likes} </span><AiOutlineLike /></div>
                <div><span>{comments} </span><AiOutlineComment /></div>
            </div>
        </div>
    )
}
export default ImageCard;