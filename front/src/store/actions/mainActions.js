import { FETCH_COMMENTS_SUCCESS, FETCH_NEWS_ERROR, FETCH_NEWS_SUCCESS, FETCH_ONE_POST_ERROR, FETCH_ONE_POST_SUCCESS } from "../actionTypes/mainActionTypes";
import axios from '../../axios';

export const fetchNewsSuccess=value=>({type:FETCH_NEWS_SUCCESS,value});
export const fetchNewsError=error=>({type:FETCH_NEWS_ERROR,error});

export const fetchNews=()=>{
    return async dispatch=>{
        try {
            const response = await axios.get('/news');
            dispatch(fetchNewsSuccess(response.data));
        } catch(e) {
            dispatch(fetchNewsError(e));
        }
    }
};

export const addPost=(object)=>{
    return async ()=>{
          await axios.post('/news', object); 
    }
};

export const deletePost=(id)=>{
    return async ()=>{
          await axios.delete('/news/'+id); 
    }
};

export const fetchOnePostSuccess=value=>({type:FETCH_ONE_POST_SUCCESS,value});


export const fetchOnePost=(id)=>{
    return async dispatch=>{
        try {
            const response = await axios.get('/news/'+id);
            dispatch(fetchOnePostSuccess(response.data));
        } catch(e) {
            dispatch(fetchNewsError(e));
        }
    }
};

export const fetchCommentsSuccess=value=>({type:FETCH_COMMENTS_SUCCESS,value});

export const fetchComments=(id)=>{
    return async dispatch=>{
        try {
            const response = await axios.get('/comments?news_id='+id);
            dispatch(fetchCommentsSuccess(response.data));
        } catch(e) {
            dispatch(fetchNewsError(e));
        }
    }
};

export const addComment=(object)=>{
    return async ()=>{
          await axios.post('/comments', object); 
    }
};

export const deleteComment=(id)=>{
    return async ()=>{
          await axios.delete('/comments/'+id); 
    }
};