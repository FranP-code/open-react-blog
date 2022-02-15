import React from 'react'

const TitleTwo = (props) => {
  
    return (
        <h2
            className='title-two'
        >
            {props.text}
            {props.children}
        </h2>
    )
}

export default TitleTwo