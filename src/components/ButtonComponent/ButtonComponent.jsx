import React, {useState} from 'react'
import {Button} from '@mui/material'

const ButtonComponent = ({type, mainPage, width, color, onClickFunction, text, children}) => {
    
    return (
        <Button
            type={type}
            className={mainPage ? 'main-page-button' : null}
            style={{
                width: mainPage ? null : width,
                color: "#fff",
                backgroundColor: color,
                fontFamily: "Be Vietnam Pro",
                fontWeight: "bold",
                fontSize: "15pt",
                padding: "1vh 0px"
            }}
            onClick={(e) => onClickFunction(e)}
        >
            {text}
            {children}
        </Button>
    )
}

export default ButtonComponent