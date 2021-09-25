import { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { Form , Button, Row, Col, Container} from 'react-bootstrap';
import axios from 'axios';
import { APIURL } from './Context';


async function loginUser(credentials) {
  const config1 = {headers: {
    "Accept":"application/json",
    "content-type":"application/json",
    "Access-Control-Allow-Credentials":"true",
    "Access-Control-Allow-Origin":"*"}};
  const config2 ={headers: {
    'content-type':'application/json',
    'Accept':'application/json'}};
    axios.defaults.withCredentials=true;
   return new Promise(resolve=>resolve(
    axios.get(`${APIURL}sanctum/csrf-cookie`,config1)
    .then(res=>{return axios.post(`${APIURL}api/login`,credentials,config2)})
  ));

}
export default function Login({setToken,setUserInfo}) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit =async e => {
    e.preventDefault();
    setLoading(true);
    const token = await loginUser({userName,password});
    if(token.data){
    setToken(token.data);
    setLoading(false);
  }
  }
  return( 
<Container className="mt-5 mb-5"><Row><Col className="bg-white rounded border pb-2" lg={{span:3,offset:4}}>
<Form onSubmit={handleSubmit}>
<h5 className="text-dark text-center">Login to OverFlow</h5>
  <Form.Group controlId="formBasicUserName">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" placeholder="User Name" onChange={e => setUserName(e.target.value)} required/>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>}
  </Button>
</Form>
    </Col></Row></Container>
  );
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}