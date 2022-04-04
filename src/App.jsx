import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import LanguageContext from './contexts/LanguageContext'

import MainPage from './Pages/Welcome/MainPage/MainPage';
import DescriptionPage from './Pages/Welcome/DescriptionPage/DescriptionPage';
import GoToUserPage from './Pages/Welcome/GoToUserPage/GoToUserPage';
import RegisterUserPage from './Pages/CreateAccount/RegisterUserPage/RegisterUserPage';
import UserProfile from './Pages/User/UserProfile/UserProfile';
import CreatePost from './Pages/User/CreatePost/CreatePost';
import ViewPost from './Pages/User/ViewPost/ViewPost';

function App() {

  const availableLanguages = [
    "english",
    "spanish"
  ]
  const [language, setLanguage] = useState('english')

  return (
    <div className="App">
      <LanguageContext.Provider value={{availableLanguages, language, setLanguage}}>
        <Router>
          <Switch>
            <Route path="/create-account">
              <RegisterUserPage />
            </Route>
            <Route path="/:username/post/:postId">
              <ViewPost />
            </Route>
            <Route path="/:username/write/:postId?">
              <CreatePost />
            </Route>
            <Route path="/:username">
              <UserProfile />
            </Route>
            <Route path="/">
              <MainPage />
              <DescriptionPage />
              <GoToUserPage />
            </Route>
          </Switch>
        </Router>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;