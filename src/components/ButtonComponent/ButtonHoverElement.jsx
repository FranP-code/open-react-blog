import React from 'react'
import TitleTwo from '../Titles/TitleTwo'

const ButtonHoverElement = ({Styles, text, displayHoverElement}) => {
  
    return (
        <Styles
            className={`${displayHoverElement ? 'animate__fadeIn' : "animate__fadeOut"} animate__animated hover-button-component`}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            >
            <h4>{text}</h4>
        </Styles>
    )
}

export default ButtonHoverElement