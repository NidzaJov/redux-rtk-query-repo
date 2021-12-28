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
import { EditUserPage } from './features/users/EditUserPage';
import { TodosList } from './features/todos/TodosList';
import { SingleAlbumPage } from './features/albums/SingleAlbumPage';
import { SinglePicturePage } from './features/pictures/SinglePicturePage';
import { SvgPage } from './features/pictures/SvgPage';
import { MediaPage} from './features/media/MediaPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/editUser/:userId" element={<EditUserPage />}>
          </Route>
          <Route exact path='/users' element={<UsersList />}>
          </Route>
          <Route exact path="/users/:userId" element={<SingleUserPage />}>
          </Route>
          <Route exact path="/todos" element={<TodosList />} />
          <Route exact path="/albums/:albumId" element={<SingleAlbumPage />} />
          <Route exact path="/photos/:pictureId" element={<SinglePicturePage />}/>
          <Route exact path="/svg" element={<SvgPage />} />
          <Route exact path="/media" element={<MediaPage />} />
          <Route exact path="/" element={<Navigate to="/users"/>}>
          </Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
