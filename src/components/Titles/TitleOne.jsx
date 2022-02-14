import React from 'react'

const TitleOne = (props) => {
  
    return (
        <h1
            className='title-one'
        >
            {props.text}
            {props.children}
        </h1>
    )
}

export default TitleOne