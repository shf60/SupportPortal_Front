import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form, Modal, Col } from "react-bootstrap";
import { ACTIONS, APIURL, PostContext } from "./Context";

export default function CreatePost() {
    const [lgShow, setLgShow] = useState(false);
    const [data,setData] = useState({});
    const {dispatch} =useContext(PostContext);
    const token =JSON.parse(localStorage.getItem('token'));

    const postSubmit = (e)=>{
    e.preventDefault();
    const config={headers:{
        "Authorization":`Bearer ${token.token}`,
        "Accept":"application/json",
    "content-type":"application/json",
    "Access-Control-Allow-Credentials":"true",
    "Access-Control-Allow-Origin":"*"
    }}
    axios.defaults.withCredentials=true;
    
    axios.get(`${APIURL}sanctum/csrf-cookie`,config)
    .then(res=>{return axios.post(`${APIURL}api/index`,{...data,user_id:token.user.id},config)
    .then(res=>{dispatch({type:ACTIONS.NEW_POST, new: res.data}); setLgShow(false)})})
    }
    return (<div>
      <Col lg={2} xs={12}>
        <Button variant="secondary" onClick={() => setLgShow(true)} style={{width:'100%'}}> <i className="fa fa-plus"></i>
        {' '}Create Post</Button></Col>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              New Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={postSubmit}>
  <Form.Group className="mb-3" controlId="post.ControlSubject">
    <Form.Label>Subject</Form.Label>
    <Form.Control type="text" placeholder="Explain the issue" onChange={(e)=>setData({...data,subject:e.target.value})}/>
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="post.ControlTextarea1">
    <Form.Label>Senario Explanation</Form.Label>
    <Form.Control as="textarea" rows={3} onChange={(e)=>setData({...data,story:e.target.value})}/>
    
  </Form.Group>
  <Form.Group className="mb-3" controlId="post.ControlTags">
    <Form.Label>Hashtag</Form.Label>
    <Form.Control type="text" placeholder="Add tag" onChange={(e)=>setData({...data,tags:e.target.value})}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }