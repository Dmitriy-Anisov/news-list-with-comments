import { FETCH_COMMENTS_SUCCESS, FETCH_NEWS_ERROR, FETCH_NEWS_SUCCESS, FETCH_ONE_POST_SUCCESS } from "../actionTypes/mainActionTypes";

const initialState={
    news:[],
    error:null,
    onePost:[{
        title:'',
        description:'',
        date:''
    }],
    comments:[]
};

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case FETCH_NEWS_SUCCESS:
            return {...state,news:action.value};
        case FETCH_NEWS_ERROR:
            return {...state, error:action.error};
        case FETCH_ONE_POST_SUCCESS:
            return {...state,onePost:action.value};
        case FETCH_COMMENTS_SUCCESS:
            return {...state,comments:action.value};
        default:
            return state;
    }
}
export default reducer;