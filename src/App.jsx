import './App.css';
import PageOne from './components/Pages/PageOne';
import PageTwo from './components/Pages/PageTwo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PageThree from './components/Pages/PageThree/PageThree';
import PageFour from './components/Pages/PageFour/PageFour';
import PageFive from './components/Pages/PageFive/PageFive';
import PageSix from './components/Pages/PageSix/PageSix';
import React from 'react'
// import 'console.image'

function App() {

  React.useEffect(() => {
    
    function consoleLog(seconds, message, image) {

      if (image) {

        console.image(image)
        return
      }

      setTimeout(() => {
        console.log(message)
      }, seconds * 1000);
    }

    consoleLog(0, false, "https://c.tenor.com/0F1IPiIH2IAAAAAM/chimavara-capivara.gif")
    consoleLog(3, "Oh! what a curious guy...")
    consoleLog(4, "Don't forget to check the repo of this project:")
    consoleLog(4.5, "https://github.com/FranP-code/open-react-blog")
    consoleLog(7, "\nWTF console.image, why the npm module don't work and the images appear double?")  
  }, [])

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
          <Route path="/:username/write">
            <PageFive />
          </Route>
          <Route path="/:username">
            <PageFour />
          </Route>
          <Route path="/">
            <PageOne />
            <PageTwo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;