import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const APIURL='http://localhost:8000/';

export const PostContext = createContext();

export const ACTIONS={
    GET_POSTS : 'get_posts',
    NEW_POST : 'new_post',
    REMOVE_POST : 'remove_post',
}

const reducer =(todos,action)=>{

    switch(action.type){
    case ACTIONS.GET_POSTS :
        return {allPosts: action.allPosts}
        case ACTIONS.NEW_POST :
            return {...todos, allPosts : [action.new,...todos.allPosts]}
            case ACTIONS.REMOVE_POST : 
            return {allPosts : removePost(todos.allPosts,action.id)}
        default : 
        return todos;
    }
}
const removePost = (allPosts,postID)=>{
    const restPosts = allPosts.filter(item=> item.id !== postID);
    return restPosts;
}
export function PostProvider(props) {
    
    const [todos,dispatch]=useReducer(reducer,{allPosts:[]});

    useEffect(()=>{
        const allPosts=async()=> await axios.get(`${APIURL}api/index`)
        .then(res=>{
            dispatch({type: ACTIONS.GET_POSTS, allPosts:res.data.sort((a,b)=>b.id - a.id) });
        });
        allPosts();
    },[]);

return(
    <PostContext.Provider value={{todos,dispatch}}>
        {props.children}
    </PostContext.Provider>
);
}