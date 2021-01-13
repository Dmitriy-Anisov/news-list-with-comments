import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router';
import NewsItem from '../../Component/NewsItem/NewsItem';
import { deletePost, fetchNews } from '../../store/actions/mainActions';
import './Main.css';


const Main=()=>{
    const dispatch=useDispatch();
    const news=useSelector(state=>state.news);
    const history=useHistory();

    useEffect(()=>{
        dispatch(fetchNews());
    },[dispatch]);

    const changePageHandler=()=>{
        history.push('/add');
    };

    const removePostHandler=async id=>{
        await dispatch(deletePost(id));
        dispatch(fetchNews());
    };

    const openFullPosthandler=(id)=>{
        history.push('/news/'+id);
    };

    const newsDiv=(
        <div>
            {
                news.map(item=>{
                    return(
                        <NewsItem 
                            key={item.id}
                            image={item.image}
                            title={item.title}
                            date={item.date}
                            delete={()=>removePostHandler(item.id)}
                            fullPost={()=>openFullPosthandler(item.id)}
                        />
                    )
                })
            }
        </div>
    )

    return(
        <div className='container'>
            <div className='header'>
                <h4>POSTS</h4>
                <button className='btn' onClick={changePageHandler}>Add new post</button>
            </div>
            {newsDiv}
        </div>
    )
};

export default Main;