import React from 'react'
import styled from 'styled-components';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import GoToDownArrow from '../GoToDownArrow/GoToDownArrow';
import MainHeader from '../MainHeader/MainHeader';
import TitleOne from '../Titles/TitleOne';
import TitleTwo from '../Titles/TitleTwo';

const PageOne = () => {

    const FlexContainer = styled.div`

        display: flex;
        
        align-items: center;
        
        height: 70vh;
        margin-bottom: 5vh;
    `

    const MainContent = styled.div`

        display: flex;
        flex-direction: column;
        
    `

    function goToCreateAccount(e) {

        e.preventDefault()

        window.location.href = './create-account'
    }

    return (
        <div className='page'>
            <MainHeader/>
            <FlexContainer>
                <MainContent>
                    <TitleTwo text={"Write your post"} />
                    <TitleOne text={"Share with the world"}/>
                    <ButtonComponent color="#4CAF50" text={"Create Account"} className='main-page-button' onClickFunction={goToCreateAccount}/>
                </MainContent>
            </FlexContainer>
            <GoToDownArrow direction={"page-two"}/>
        </div>
    )
}

export default PageOne