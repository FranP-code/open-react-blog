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

    return (
        <div className='page'>
            <MainHeader/>
            <FlexContainer>
                <MainContent>
                    <TitleTwo text={"Write your post"} />
                    <TitleOne text={"Share with the world"}/>
                    <ButtonComponent text={"Create Account"} mainPage={true}/>
                </MainContent>
            </FlexContainer>
            <GoToDownArrow/>
        </div>
    )
}

export default PageOne