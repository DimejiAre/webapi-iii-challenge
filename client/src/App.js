import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : ''

function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    axios.get(baseUrl + '/api/users')
      .then(res => {
        debugger
        setUsers(res.data)
      })
      .catch(err => {
        debugger
      })
  },[])
  return (
    <div className="App">
      <h2>User App</h2>
      {users?
      users.map(user => (
        <div>
          <h2>Name: {user.name}</h2>
          <p>ID: {user.id}</p>
        </div>
      )): null}
    </div>
  );
}

export default App;
