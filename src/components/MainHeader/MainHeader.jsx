import React from 'react'
import styled from 'styled-components'

import logo from '../../logo.png'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'

import './Header.css'

const MainHeader = (props) => {

    // const HeaderStyles = styled.header`
        
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;

    //     height: 15vh;

    //     .logo-container {

    //         display: flex;
    //         align-items: center;

    //         * {

    //             margin-right: 1vw;
    //         }
    //         img {

    //             height: 8vh;

    //             &:hover{

    //                 animation: rotateIcon 1.5s ease-out forwards;
    //             }

    //             @keyframes rotateIcon {

    //                 0% {
    //                     transform: rotate(0deg);
    //                     height: 8vh;
    //                 }

    //                 50% {
    //                     transform: rotate(360deg);
    //                     height: 8.5vh;
    //                 }

    //                 100% {
    //                     transform: rotate(360deg);
    //                     height: 8vh;
    //                 }
    //             }
    //         }
    //     }

    //     @media (max-width: 640px) {

    //         height: 20vh;
    //         padding-top: 2vh;
    //         justify-content: center;

    //         .logo-container {

    //             flex-direction: column;
    //         }
    //     }
    // `
  
    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="" />
                {/* <h1>ORB</h1>
                <h2>(Open React Blog)</h2> */}
                <TitleOne>ORB</TitleOne>
                <TitleTwo>(Open React Blog)</TitleTwo>
            </div>
            <h2 className='additional-text'>{props.additionalText}</h2>
        </header>
    )
}

export default MainHeader