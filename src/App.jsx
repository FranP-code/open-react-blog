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

  //Determine user's language at the start of the app
  React.useEffect(() => {

    //If are almacenated user's language, set it for the app
    let ls_language = localStorage.getItem('favoriteLanguage')

    if (ls_language && availableLanguages.includes(ls_language)) {
      setLanguage(ls_language)
      return
    
    } else {
      //Get user's language
      let userLanguage = window.navigator.userLanguage || window.navigator.language;
       
      if (userLanguage.includes('en')) {
        userLanguage = "english"
      }
      if (userLanguage.includes('es')) {
        userLanguage = "spanish"
      }
      //If the language not is in the available languages constant, set english as default
      if (!availableLanguages.includes(ls_language)) {
        userLanguage = "english"
      }

      //Set user's language on app and localstorage
      setLanguage(userLanguage)
      localStorage.setItem('favoriteLanguage', userLanguage)
    }
  }, [])

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