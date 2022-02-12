import React from 'react'
import {Button} from '@mui/material'

const ButtonComponent = (props) => {
    
    return (
        <Button
            className={props.mainPage ? 'main-page-button' : null}
            style={{
                width: props.mainPage ? null : props.width,
                color: "#fff",
                backgroundColor: "#4CAF50",
                fontFamily: "Raleway",
                fontWeight: "bold",
                fontSize: "15pt",
                padding: "1vh 0px"
            }}
        >
            {props.text}
        </Button>
    )
}

export default ButtonComponent