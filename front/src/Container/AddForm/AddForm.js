import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { addPost } from '../../store/actions/mainActions';
import './AddForm.css';

const AddForm=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const [post, setPost] = useState({
        title: "",
        description: "",
        image: ""
    });

    const inputChangeHandler = event => {
        const {name, value} = event.target;
        setPost(prevState => {
            return {...prevState, [name]: value}
        })
      };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setPost(prevState =>({
            ...prevState,
            [name]: file
            })
        )
    };

    const returnToMainPageHandler=()=>{
        history.push('/');
    };

    const submitFrom=async e=>{
        e.preventDefault();
        const formData = new FormData();
        Object.keys(post).forEach(key => {
            formData.append(key, post[key])
        });
        await dispatch(addPost(formData));
        returnToMainPageHandler();
    };

    return(
        <div className='container'>
            <div className='header'>
                <h4>NEW POST</h4>
                <button className='btn' onClick={returnToMainPageHandler}>Posts</button>
            </div>
            <form onSubmit={(e)=>submitFrom(e)}>
                <input type='text' required className='input-form' 
                    name='title' placeholder='Title' 
                    onChange={(event)=>inputChangeHandler(event)}/>
                <textarea type='text' required placeholder='Description' 
                    name='description' className='input-form' 
                    onChange={(event)=>inputChangeHandler(event)}/>
                <input type='file' 
                    name='image'
                    onChange={(event)=>fileChangeHandler(event)} />
                <button type='submit' className='btn'>Add Post</button>
            </form>
        </div>
    )
};
export default AddForm;