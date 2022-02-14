import React from 'react'
import styled from 'styled-components'

const OrderedList = ({typeOfList, title, data, typeOfData}) => {

    const TitleStyles = styled.div`

        width: auto;

        font-weight: bold;

        list-style: none;

        div {
            
            .emoji {

                font-family: 'Arial';
                margin-left: 1vw;
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
                    <TitleStyles>
                        {
                            typeOfData === 'text-data' ?
                                data.map(element => (<div className='title-element'>{element}</div>))
                            :null
                        }
                        {
                            typeOfData === 'emoji-data' ?
                                data.map((obj, index) => (<div className='title-element'>{index + 1 + '. '}{obj.text}<span className='emoji'>{obj.emoji}</span></div>))
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