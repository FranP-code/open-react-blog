import './App.css';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';
import PageTwoAndHalf from './components/Pages/PageTwoAndHalf';
import PageThree from './components/Pages/PageThree/PageThree';
import PageFour from './components/Pages/PageFour/PageFour';
import PageFive from './components/Pages/PageFive/PageFive';
import PageSix from './components/Pages/PageSix/PageSix';

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create-account">
            <PageThree />
          </Route>
          <Route path="/:username/post/:postId">
            <PageSix />
          </Route>
          <Route path="/:username/write/:postId?">
            <PageFive />
          </Route>
          <Route path="/:username">
            <PageFour />
          </Route>
          <Route path="/">
            <PageOne />
            <PageTwo />
            <PageTwoAndHalf />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;