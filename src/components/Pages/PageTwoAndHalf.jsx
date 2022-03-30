import React from 'react'
import styled from 'styled-components'
import GoToLinkForm from '../GoToLinkForm/GoToLinkForm'
import RotatingText from '../RotatingText/RotatingText'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'
import Arrow from '../Arrow/Arrow'

const PageTwoAndHalf = () => {

    const Styles = styled.div`

        height: 100vh;

        display: flex;
        flex-direction: column;
        
        justify-content: space-between;

        .form-container {

            height: auto;

            margin-top: 6vh;

            display: flex;
            flex-direction: column;
            justify-content: space-around;
            
            .titles-container {
                
                margin-bottom: 5vh;
            }
            
            h2 {

                margin-bottom: 3vh;
                font-weight: initial !important;
            }

            form {

                margin-bottom: 5vh;
            }

        }
    `
  return (
        <div className='page' id='page-two-and-half'>
            <Styles>
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
                <Arrow direction="page-one" reverse={true}/>
            </Styles>
        </div>
  )
}

export default PageTwoAndHalf