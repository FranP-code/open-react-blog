import React, { useContext } from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

import LanguageContext from '../../../contexts/LanguageContext'

import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import Arrow from '../../../components/Arrow/Arrow';
import MainHeader from '../../../components/MainHeader/MainHeader';
import TitleOne from '../../../components/Titles/TitleOne';
import TitleTwo from '../../../components/Titles/TitleTwo';

const MainPage = (props) => {

    const FlexContainer = styled.div`
        display: flex;
        
        align-items: center;
        
        height: 70vh;
        margin-bottom: 5vh;

        @media (max-width: 640px) {
            height: 55vh;
        }
    `

    const MainContent = styled.div`
        display: flex;
        flex-direction: column;
    `

    const languageContext = useContext(LanguageContext)

    const text = {
        english: {
            firstTitle: "Write your post",
            secondTitle: "Share it with the world",
            createAccountButton: "Create account"
        },
        spanish: {
            firstTitle: "Escribe tu post",
            secondTitle: "Compartelo con el mundo",
            createAccountButton: "Crear cuenta"
        }
    }

    function goToCreateAccount(e) {

        e.preventDefault()

        props.history.push('./create-account')
    }

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
        <div className='page' id="welcome-main-page">
            <MainHeader/>
            <FlexContainer>
                <MainContent>
                    <TitleTwo text={text[languageContext.language].firstTitle} />
                    <TitleOne text={text[languageContext.language].secondTitle}/>
                    <ButtonComponent color="#4CAF50" text={text[languageContext.language].createAccountButton} className='main-page-button' onClickFunction={goToCreateAccount}/>
                </MainContent>
            </FlexContainer>
            <Arrow direction={"welcome-description-page"}/>
        </div>
    )
}

export default withRouter(MainPage)