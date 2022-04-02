import React from 'react'
import {Button} from '@mui/material'
import ReactTooltip from "react-tooltip";

const ButtonComponent = ({type, className, width, height, color, onClickFunction, text, children, hoverText, hoverPosition, style}) => {

    if (!style) {
        style = {}
    }

    return (
        <>
            <Button
                type={type}
                className={className}
                style={{
                    width: width ? width : "auto",
                    height: height ? height : "auto",
                    color: "#fff",
                    backgroundColor: color ? color : "#4CAF50",
                    fontFamily: "Be Vietnam Pro",
                    fontWeight: "bold",
                    fontSize: "15pt",
                    padding: style.padding ? style.padding : "1vh 0px",
                    borderRadius: style.borderRadius ? style.borderRadius : ""
                }}
                sx={{
                    minWidth: style.minWidth ? style.minWidth : ""
                }}
                onClick={(e) => onClickFunction(e)}
                data-tip
                data-for={hoverText}
            >
                {text}
                {children}
            </Button>
            {
                hoverText ?
                    <ReactTooltip id={hoverText} place={hoverPosition} effect="solid">
                        {hoverText}
                    </ReactTooltip>
                : null
            }
        </>
    )
}

export default ButtonComponent