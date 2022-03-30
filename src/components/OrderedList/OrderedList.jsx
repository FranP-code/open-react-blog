import React from 'react'
import styled from 'styled-components'

const OrderedList = ({typeOfList, title, data, typeOfData}) => {

    const TitleStyles = styled.div`

        width: auto;

        font-weight: bold;

        list-style: none;

        div, h2 {
            
            .emoji {

                font-family: 'Arial';
            }

            margin-top: 1.5vh;
        }
    `
  
    return (
        <>
            {
                title ? <h2 className='title-one'>{title}</h2> : null
            }
            {
                typeOfList === 'title' ?
                    <TitleStyles className="ordered-list">
                        {
                            typeOfData === 'text-data' ?
                                data.map(element => (<div className='title-element'>{element}</div>))
                            :null
                        }
                        {
                            typeOfData === 'emoji-data' ?
                                data.map((obj, index) => (<h2 className='title-two'>{index + 1 + '. '}{obj.text}<span className='emoji'>&nbsp;{obj.emoji}</span></h2>))
                            :null
                        }
                    </TitleStyles>
                :null
            }
            {
                typeOfList === 'inlineText' ?
                    <ol>

                    </ol>
                :null
            }
        </>
    )
}

export default OrderedList