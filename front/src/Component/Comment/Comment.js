import React from 'react';
import './Comment.css';

const Comment=props=>{
    let author='Anonymus';
    if(props.author!==''){
        author=props.author;
    }

    return(
        <div className='comment'>
            <div>
                <h3>
                    {author}
                </h3>
                <p>
                    {props.message}
                </p>
            </div>
            <button className='btn-delete' onClick={props.remove}>Delete</button>
        </div>
    )
}
export default Comment;