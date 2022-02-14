import React from 'react'
import GoToLinkForm from '../GoToLinkForm/GoToLinkForm'
import OrderedList from '../OrderedList/OrderedList'
import RotatingText from '../RotatingText/RotatingText'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'
import styled from 'styled-components'

const PageTwo = () => {

    const FlexContainer = styled.div`
        
        height: 100vh;
        /* width: 100vw; */

        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .form-container {

            height: 68vh;

            display: flex;
            flex-direction: column;
            justify-content: space-around;
            
            .titles-container {

                margin-bottom: 5vh;
            }

            h2 {

                margin-bottom: 3vh;
            }

            form {

                margin-bottom: 5vh;
            }
        }
    `
  
    return (
        <div className='page'>
            <FlexContainer>
                <OrderedList
                    typeOfList={'title'}
                    typeOfData={"emoji-data"}
                    data={
                            [
                                { text: 'Create your account for free', emoji: "💸"},
                                { text: 'Make posts that you want', emoji: "💭"},
                                { text: 'Share your link with the world', emoji: "🔥"}
                            ]
                    }
                />
                <div className="form-container">
                    <div className="titles-container"> 
                        <TitleOne text={"Do you have"} />
                        <TitleOne>
                            <>
                                a&nbsp;
                                <RotatingText
                                    data={["friend", "influencer", "familiar"]}
                                    timeBetweenWordAndWord={1.5}
                                    animationDuration={1}
                                />
                                &nbsp;link?
                            </>
                        </TitleOne>
                    </div>
                    <div className="form">
                        <TitleTwo text={"Paste it here 👇 or in the web browser to go"}/>
                        <GoToLinkForm />
                    </div>
                </div>
            </FlexContainer>
        </div>
    )
}

export default PageTwo