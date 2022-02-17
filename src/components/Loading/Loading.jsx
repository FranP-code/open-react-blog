import React from 'react'
import TitleTwo from '../Titles/TitleTwo'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'


const Loading = ({loading, userLoged}) => {

    const LoadingStyles = styled.div`
        
        width: 100%;
        height: 100vh;

        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 9001; // MORE THAN 9000!

        &.hidden {

            animation: hiddeLoading 1s ease-in-out forwards;
            }

            @keyframes hiddeLoading {
            50%{
                transform: translate(0, 0%)
            }
            100% {
                transform: translate(0, -100%)

            }   
        }

        .fa-hourglass {

            width: 25vw;
            max-width: 250px;
            height: 25vw;
            max-height: 250px;

            color: #aabdd6;
            animation: rotateImage 1s ease-in-out backwards infinite;

            &.stop {
                animation: none;
            }
        }

        h2 {

            margin-top: 5vh;
        }

        @keyframes rotateImage {
            0% {

                transform: rotateZ(0deg)
            }
            100% {

                transform: rotateZ(360deg)
            }
        }
    `
    
    return (
        <LoadingStyles
            className={loading && !userLoged ? "" : "animate__animated animate__fadeOut stop"}
            style={{zIndex: loading && !userLoged? "9001" : "-9001"}}
        >
            <FontAwesomeIcon
                icon={faHourglass}
                className={loading && !userLoged ? "" : "stop"}
            />
            <TitleTwo text={"Loading"}/>
        </LoadingStyles>
    )
}

export default Loading