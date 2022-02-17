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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create-account">
            <PageThree />
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
