import React from 'react'

const TitleOne = (props) => {
  
    return (
        <h1
            className='title-one'
            contenteditable={props.contentEditable ? "true"  : "false"}
        >
            {props.text}
            {props.children}
        </h1>
    )
}

export default TitleOne