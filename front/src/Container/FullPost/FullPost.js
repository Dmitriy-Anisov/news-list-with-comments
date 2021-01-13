import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addComment, deleteComment, fetchComments, fetchOnePost } from '../../store/actions/mainActions';
import './FullPost.css';
import Comment from '../../Component/Comment/Comment';

const FullPost=()=>{
    const params=useParams();
    const history=useHistory();
    const dispatch=useDispatch();
    const post=useSelector(state=>state.onePost);
    const comments=useSelector(state=>state.comments);
    const [newComment, setNewComment] = useState({
        message: "",
        author: "",
        news_id:params.id
    });
    
    const inputChangeHandler = event => {
        const {name, value} = event.target;
        setNewComment(prevState => {
            return {...prevState, [name]: value}
        })
      };

      const submitFrom=async e=>{
        e.preventDefault();
        await dispatch(addComment(newComment));
        dispatch(fetchComments(params.id));
    };

    useEffect(()=>{
        dispatch(fetchOnePost(params.id));
        dispatch(fetchComments(params.id));
    },[dispatch]);

    const returnToMainPageHandler=()=>{
        history.push('/');
    };

    const deleteCommentHandler=async id=>{
        await dispatch(deleteComment(id));
        dispatch(fetchComments(params.id));
    };

    const commentDiv=(
        <div>
            {
                comments.map(com=>{
                    return(
                        <Comment 
                            key={com.id}
                            author={com.author}
                            message={com.message}
                            remove={()=>deleteCommentHandler(com.id)}
                        />
                    )
                })
            }
        </div>
    )

    return(
        <div className='container'>
            <div className='header'>
                <h4>FULL POST</h4>
                <button className='btn' onClick={returnToMainPageHandler}>Posts</button>
            </div>
            <div className='full-post'>
                <h3>{post[0].title}</h3>
                <p>{post[0].date}</p>
                <p>{post[0].description}</p>
            </div>
            {commentDiv}
            <form onSubmit={(e)=>submitFrom(e)}>
                <input type='text' required className='input-form' 
                        name='message' placeholder='Message' 
                        onChange={(event)=>inputChangeHandler(event)}/>
                <input type='text' className='input-form' 
                        name='author' placeholder='Author' 
                        onChange={(event)=>inputChangeHandler(event)}/>
                <button type='submit' className='btn'>Add Comment</button>
            </form>
        </div>
    )
}
export default FullPost;