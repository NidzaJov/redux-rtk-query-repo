import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUsers, faPaperclip, faPhotoVideo, faBezierCurve, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

import { UsersList } from './features/users/UsersList';
import { SingleUserPage } from './features/users/SingleUserPage'
import { EditUserPage } from './features/users/EditUserPage';
import { TodosList } from './features/todos/TodosList';
import { SingleAlbumPage } from './features/albums/SingleAlbumPage';
import { SinglePicturePage } from './features/pictures/SinglePicturePage';
import { SvgPage } from './features/pictures/SvgPage';
import { MediaPage} from './features/media/MediaPage';
import { ApendixPage } from './features/apendix/ApendixPage'
import { CommentsForPostPage } from './features/comments/CommentsForPostPage';
import { MainLayout } from '../src/views/MainLayout';

library.add(faSearch, faUsers, faPaperclip, faPhotoVideo, faBezierCurve, faClipboardCheck);

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
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
            <Route exact path="/apendix" element={<ApendixPage />} />
            <Route exact path="/posts/:postId/comments" element={<CommentsForPostPage />} />
            <Route exact path="/" element={<Navigate to="/users"/>}>
            </Route>
          </Routes>
        </MainLayout>
      </div>
    </Router>
    
  );
}

export default App;
