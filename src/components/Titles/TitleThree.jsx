import React from 'react'

const TitleThree = (props) => {
    return (
        <h3
            className='title-three'
            style={props.style}
        >
            {props.text}
            {props.children}
        </h3>
    )
}

export default TitleThree