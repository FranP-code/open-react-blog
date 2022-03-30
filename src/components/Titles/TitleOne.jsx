import React from 'react'

const TitleOne = (props) => {
  
    return (
        <h1
            className='title-one'
            contentEditable={props.contentEditable ? "true"  : "false"}
            style={props.style}
        >
            {props.text}
            {props.children}
        </h1>
    )
}

export default TitleOne