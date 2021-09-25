import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { APIURL, PostProvider } from './Context';
import { Posts } from './Posts';
import Login from './Login';
import SearchEngine from './SearchEngine';
import { Container, Row } from 'react-bootstrap';
import useToken from './useToken.js';
import axios from 'axios';
import CreatePost from './CreatePost';

export async function  logout() {
  const token=JSON.parse(localStorage.getItem('token'));
  const config={headers:{
"Authorization":`Bearer ${token.token}`,
"Accept":"application/json",
"content-type":"application/json",
"Access-Control-Allow-Credentials":"true",
"Access-Control-Allow-Origin":"*"
}}
  axios.defaults.withCredentials=true;
  await axios.post(`${APIURL}api/logout`,{},config)
  .then(res=> localStorage.removeItem('token'))
  .catch(err=> console.log(err));
  
}

function App() {
  const {token,setToken} = useToken();
  const userInfo= token && (<div className="d-flex float-right m-0 p-0">
<a href="#ff" onClick={()=>(logout() && setToken(''))} className="power-icon bg-secondary m-1"><i className="fa fa-power-off"></i></a>
<p className="text-light m-1">{token.user.name}</p>
  </div>);
  return (
    <header className="App-header">
    <PostProvider token={token}>
    <img src={logo} className="App-logo float-end m-4" alt="logo" />
    {token && userInfo}
      <h1 className="text-light text-center">OverFlow</h1>
      {!token ? <Login setToken={setToken} /> : 
      <Container>
      <Row className="d-flex justify-content-center"><SearchEngine/></Row>
      <CreatePost/>
      <Posts/>
      </Container>}
    </PostProvider>
    </header>
  );
}

export default App;
