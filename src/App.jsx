import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import TitleOne from './components/Titles/TitleOne';
import TitleTwo from './components/Titles/TitleTwo';

function App() {
  return (
    <div className="App">
      <MainHeader/>
      <TitleTwo text={"Write your post"} />
      <TitleOne text={"Share with the world"}/>
    </div>
  );
}

export default App;
