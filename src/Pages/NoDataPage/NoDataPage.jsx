import React from 'react'
import styled from 'styled-components'

const NoDataPage = (props) => {
    
    const NoDataPageStyles = styled.div`
        
        width: 100%;
        height: 80vh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        svg {
            width: 25vw;
            max-width: 250px;
            height: 25vw;
            max-height: 250px;
            color: ${() => props.color}
        }

        h2 {
            margin: 5vh 0px 2vh 0px;
            color: ${() => props.color}
        }

        .titles {
            margin: 5vh 0px 2vh 0px;

            h2 {
                margin: 0;
            }
        }

        .back-to-main-page {

            color: rgb(44, 135, 255);
            
            cursor: pointer;
            text-decoration: underline;

            &::visited {

                color: rgb(44, 135, 255);
            }
        }
    `
    return (
        <NoDataPageStyles className="animate__animated animate__fadeIn">
            {
                props.imageUrl ? 
                    <img src={props.imageUrl} alt={props.imageAlt} />
                : null
            }
            {props.children}
        </NoDataPageStyles>
    )
}

export default NoDataPage