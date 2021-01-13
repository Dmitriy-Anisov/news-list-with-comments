import React from 'react';
import './NewsItem.css';

const NewsItem=props=>{
    let image=`http://localhost:8000/uploads/${props.image}`;
    if(!props.image){
        image='http://placekitten.com/200/200';
    };
    

    return(
        <div className='news-item'>
            <img className='image' src={image} alt='pic'/>
            <div>
                <h4>{props.title}</h4>
                <p> at {props.date}</p>
                <button className='btn-delete' onClick={props.delete}>Delete</button>
                <button className='btn' onClick={props.fullPost}>Full Post</button>
            </div>
        </div>
    )
}
export default NewsItem;