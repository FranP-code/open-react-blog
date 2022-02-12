import React from 'react'
import styled from 'styled-components'

import logo from '../../logo.png'

const MainHeader = (props) => {

    const HeaderStyles = styled.header`
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        height: 10vh;
        width: 100vw;

        padding: 0px 3vw;

        /* background: red; */

        .logo-container {

            display: flex;
            align-items: center;

            * {

                margin-right: 1vw;
            }
            img {

                height: 8vh;

                &:hover{

                    animation: rotateIcon 1s ease-out forwards;
                }

                @keyframes rotateIcon {

                    0% {
                        transform: rotate(0deg);
                        height: 8vh;
                    }

                    100% {
                        transform: rotate(360deg);
                        height: 8.5vh;
                    }
                }
            }
        }
    `
  
    return (
        <HeaderStyles>
            <div className="logo-container">
                <img src={logo} alt="" />
                <h1>ORB</h1>
                <h2>(Open React Blog)</h2>
            </div>
            <h2>{props.additionalText}</h2>
        </HeaderStyles>
    )
}

export default MainHeader