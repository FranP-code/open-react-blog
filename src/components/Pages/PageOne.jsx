import React from 'react'
import styled from 'styled-components';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Arrow from '../Arrow/Arrow';
import MainHeader from '../MainHeader/MainHeader';
import TitleOne from '../Titles/TitleOne';
import TitleTwo from '../Titles/TitleTwo';

const PageOne = () => {

    const FlexContainer = styled.div`

        display: flex;
        
        align-items: center;
        
        height: 70vh;
        margin-bottom: 5vh;

        @media (max-width: 640px) {
            height: 65vh;
        }
    `

    const MainContent = styled.div`

        display: flex;
        flex-direction: column;
        
    `

    function goToCreateAccount(e) {

        e.preventDefault()

        window.location.href = './create-account'
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
        <div className='page' id="page-one">
            <MainHeader/>
            <FlexContainer>
                <MainContent>
                    <TitleTwo text={"Write your post"} />
                    <TitleOne text={"Share with the world"}/>
                    <ButtonComponent color="#4CAF50" text={"Create Account"} className='main-page-button' onClickFunction={goToCreateAccount}/>
                </MainContent>
            </FlexContainer>
            <Arrow direction={"page-two"}/>
        </div>
    )
}

export default PageOne