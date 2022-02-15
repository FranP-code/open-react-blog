import React from 'react'
import {Button} from '@mui/material'

const ButtonComponent = (props) => {
    
    return (
        <Button
            type={props.type}
            className={props.mainPage ? 'main-page-button' : null}
            style={{
                width: props.mainPage ? null : props.width,
                color: "#fff",
                backgroundColor: "#4CAF50",
                fontFamily: "Be Vietnam Pro",
                fontWeight: "bold",
                fontSize: "15pt",
                padding: "1vh 0px"
            }}
            onClick={(e) => props.function(e)}
        >
            {props.text}
            {props.children}
        </Button>
    )
}

export default ButtonComponent