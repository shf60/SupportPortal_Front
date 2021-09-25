import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ACTIONS, APIURL, PostContext } from "./Context";

const deletePost = async(id)=>{
    const token=JSON.parse(localStorage.getItem('token'));
    // console.log(token.token);
    const config={headers:{
    "Authorization":`Bearer ${token.token}`,
    "Accept":"application/json",
    "content-type":"application/json",
    "Access-Control-Allow-Credentials":"true",
    "Access-Control-Allow-Origin":"*"
    }}
    axios.defaults.withCredentials=true;
    return new Promise(resolve=>
        resolve(axios.delete(`${APIURL}api/index/${id}`,config))
    );
}

export function Posts(props){

const {todos,dispatch} =useContext(PostContext);
const userID =JSON.parse(localStorage.getItem('token'));
const deletePost1 =async(id) => {
    
    let deleted = await deletePost(id);
     

    deleted && dispatch({type:ACTIONS.REMOVE_POST , id : id});
  }
const allPosts= todos.allPosts.length !==0 ? todos.allPosts.map((val,index)=>
<details className="border border-light shadow-sm bg-light text-start rounded m-2" key={val.id}>
    <summary className="p-3">{val.subject}</summary>
    <p>{val.story}</p>
    <small>Tags: <ins>{val.tags}</ins></small>
   {userID && userID.user.id === val.user_id &&<div>
<Button variant="outline-danger" className="px-2 pt-0 pb-0 mx-1 pull-right" onClick={()=>deletePost1(val.id)}>
<i className="fa fa-trash fs-5"></i></Button>
<Button variant="outline-warning" className="px-2 pt-0 pb-0 mx-1 pull-right" onClick={()=>"nothing by now"}>
<i className="fa fa-edit fs-5"></i></Button></div>
   }<small className="pull-right">created by user ID {val.user_id}</small><div style={{height:'20px'}}></div>
</details>
    ) : <div className="text-light text-center"><h5 >There is nothing to retrieve</h5>
    <small>Glad to see the issue and your resolution here for the rest of us!</small>
    </div>
return(<>
{allPosts}
    </>);
}