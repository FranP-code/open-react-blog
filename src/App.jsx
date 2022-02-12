import './App.css';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import MainHeader from './components/MainHeader/MainHeader';
import TitleOne from './components/Titles/TitleOne';
import TitleTwo from './components/Titles/TitleTwo';

function App() {
  return (
    <div className="App">
      <MainHeader/>
      <TitleTwo text={"Write your post"} />
      <TitleOne text={"Share with the world"}/>
      <ButtonComponent text={"Create Account"} mainPage={true}/>
    </div>
  );
}

export default App;
