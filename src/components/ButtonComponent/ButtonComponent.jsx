import React, {useState} from 'react'
import {Button} from '@mui/material'
import ButtonHoverElement from './ButtonHoverElement'
import styled from 'styled-components'

const ButtonComponent = ({type, className, width, color, onClickFunction, text, children, showHover, hoverText}) => {

    // const ButtonHoverElementStyles = styled.div`
        
    //     width: ${() => width};

    //     position: absolute;
    //     right: calc(${() => width} + 1vw);
        
    //     padding: 0.5vh 0.5vw;
        
    //     background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% ); //https://cssgradient.io/gradient-backgrounds/

    //     border-radius: 6px;
    // `

    // const [displayHoverElement, setDisplayHoverElement] = useState(false)
    
    return (
        <Button
            type={type}
            className={className}
            style={{
                width: width ? width : "auto",
                color: "#fff",
                backgroundColor: color ? color : "#4CAF50",
                fontFamily: "Be Vietnam Pro",
                fontWeight: "bold",
                fontSize: "15pt",
                padding: "1vh 0px"
            }}
            onClick={(e) => onClickFunction(e)}
            // onMouseEnter={() => setDisplayHoverElement(true)}
            // onMouseLeave={() => setDisplayHoverElement(false)}
        >
            {/* {
                showHover ?
                    <ButtonHoverElement text={hoverText} displayHoverElement={displayHoverElement} Styles={ButtonHoverElementStyles}/>
                : null
            } */}
            {text}
            {children}
        </Button>
    )
}

export default ButtonComponent