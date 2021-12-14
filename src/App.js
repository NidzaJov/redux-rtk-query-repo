import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';

import { UsersList } from './features/users/UsersList';
import { SingleUserPage } from './features/users/SingleUserPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/users' element={<UsersList />}>
          </Route>
          <Route exact path="/users/:userId" element={<SingleUserPage />}>
          </Route>
          <Route exact path="/" element={<Navigate to="/users"/>}>
          </Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
