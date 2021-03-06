import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faUsers, faPaperclip, faPhotoVideo,
   faBezierCurve, faClipboardCheck, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faGoogle, faLinkedin, faYoutube} from '@fortawesome/free-brands-svg-icons'

import { UsersList } from './features/users/views/UsersList';
import { SingleUserPage } from './features/users/views/SingleUserPage'
import { EditUserPage } from './features/users/views/EditUserPage';
import { TodosList } from './features/todos/views/TodosList';
import { SingleAlbumPage } from './features/albums/SingleAlbumPage';
import { SinglePicturePage } from './features/pictures/views/SinglePicturePage';
import { SvgPage } from './features/pictures/views/SvgPage';
import { MediaPage} from './features/media/MediaPage';
import { ApendixPage } from './features/apendix/ApendixPage'
import { CommentsForPostPage } from './features/comments/views/CommentsForPostPage';
import { MainLayout } from '../src/views/MainLayout';

library.add(faSearch, faUsers, faPaperclip, faPhotoVideo, faBezierCurve, faClipboardCheck, faCaretDown,
  faFacebook, faTwitter, faGoogle, faLinkedin, faYoutube);

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route exact path="/editUser/:userId" element={<EditUserPage />} />
            <Route exact path='/users' element={<UsersList />} />
            <Route exact path="/users/:userId" element={<SingleUserPage />} />
            <Route exact path="/todos" element={<TodosList />} />
            <Route exact path="/albums/:albumId" element={<SingleAlbumPage />} />
            <Route exact path="/photos/:pictureId" element={<SinglePicturePage />}/>
            <Route exact path="/svg" element={<SvgPage />} />
            <Route exact path="/media" element={<MediaPage />} />
            <Route exact path="/apendix" element={<ApendixPage />} />
            <Route exact path="/posts/:postId/comments" element={<CommentsForPostPage />} />
            <Route exact path="/" element={<Navigate to="/users"/>} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;