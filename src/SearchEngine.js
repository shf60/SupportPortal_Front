import axios from "axios";
import React,{ useContext, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { ACTIONS, APIURL, PostContext } from "./Context";


export default function SearchEngine(props){
const [searchPhrase,setSearchPhrase] = useState();
const {dispatch} = useContext(PostContext);
const [loading,setLoading] = useState(false);
    const searchPost = async(e)=>{
    e.preventDefault();
    setLoading(!loading);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {headers:{
    "Authorization":`Bearer ${token.token}`,
    "Accept":"application/json",
    "content-type":"application/json",
    "Access-Control-Allow-Credentials":"true",
    "Access-Control-Allow-Origin":"*"
}}
        searchPhrase ? await axios.get(`${APIURL}api/index/search/${searchPhrase}`,config)
        .then(res=>{dispatch({type: ACTIONS.GET_POSTS, allPosts:res.data })}) :
       await axios.get(`${APIURL}api/index`,config)
        .then(res=>{dispatch({type: ACTIONS.GET_POSTS, allPosts:res.data.sort((a,b)=>b.id - a.id) })})
        setLoading(false);
    }
    return(<>
        <Form className="col-lg-6 col-xs-12 border p-0" onSubmit={searchPost}>
        <div><Form.Control type="search" placeholder="Search"        
        onChange={(e)=>setSearchPhrase(e.target.value)}/>
        <a href="#44" className="search-icon" onClick={searchPost}><i className="fa fa-search"></i></a>
        </div></Form>
         <Row className="justify-content-md-center">
          {loading && <span className="spinner-border spinner-border-md text-light"
          role="status" aria-hidden="true"> </span>}
          </Row>
         </>
    );
}