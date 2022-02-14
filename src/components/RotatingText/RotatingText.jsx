import React, { useState } from 'react'
import 'animate.css'
import styled from 'styled-components'

const RotatingText = ({data, animationDuration, timeBetweenWordAndWord}) => {

    const [actualWord, setActualWord] = useState([])
    const [actualStyle, setActualStyle] = useState('')

    
    React.useEffect(() => {
        
        timeBetweenWordAndWord = timeBetweenWordAndWord * 1000
        console.log(data)

        document.getElementById('rotatory-text-element').style.setProperty('--animate-duration', `${animationDuration}s`);

        function rotatoryArray() {

            data.forEach((element, index) => {
            
                setTimeout(() => {

                    setActualStyle('animate__bounceIn')
    
                    setActualWord(element)
                    
                    clearTimeout(animationDuration * index)
    
                    if (index === data.length - 1 ) {

                        setTimeout(() => {

                            rotatoryArray()
                        
                        }, timeBetweenWordAndWord )
                    }

                    setTimeout(() => {

                        setActualStyle('animate__bounceOut')

                    }, timeBetweenWordAndWord - animationDuration * 1000)
                    
                }, timeBetweenWordAndWord * index)
            });
        }
    
        rotatoryArray()

    }, [data])

    return (
        <span id="rotatory-text-element" className={'animate__animated ' + actualStyle}>{actualWord}</span>
    )
}

export default RotatingText