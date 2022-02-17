import React, {useState} from 'react'
import {Button} from '@mui/material'

const ButtonComponent = ({type, className, width, color, onClickFunction, text, children}) => {
    
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
        >
            {text}
            {children}
        </Button>
    )
}

export default ButtonComponent