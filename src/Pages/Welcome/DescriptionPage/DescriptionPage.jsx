import React from 'react'
import styled from 'styled-components'

import OrderedList from '../../../components/OrderedList/OrderedList'
import TitleOne from '../../../components/Titles/TitleOne'
import Arrow from '../../../components/Arrow/Arrow'

const DescriptionPage = () => {

    const Styles = styled.div`
        
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        margin-top: 3vh;

        .ordered-list {
            // margin-top: 9vh;
        }

        .my-manifest {
            
        }

        @media (max-width: 640px) {

            .ordered-list {

                width: 75vw;
            }
        }
    `
  
    return (
        <div className='page' id="welcome-description-page">
            <Styles>
                {/* <TitleOne text="Three simple steps" style={{textAlign: "center"}}/> */}
                <TitleOne text="Three simple steps" />
                <OrderedList
                    typeOfList={'title'}
                    typeOfData={"emoji-data"}
                    data={[
                        { text: 'Create your account for free', emoji: "💸"},
                        { text: 'Make posts that you want', emoji: "💭"},
                        { text: 'Share your link with the world', emoji: "🔥"}
                    ]}
                />

                {/* <div className="my-manifest">
                    <TitleTwo text={"None limit of space or ideas"} style={{color: "#1496BB"}}/>
                    <TitleTwo text={"Nothing of ads"} style={{color: "#C2571A"}}/>
                    <TitleTwo text={"Nothing of complex configuration"} style={{color: "#829356"}}/>
                    <TitleOne text={"Just you and your posts"}/>
                </div> */}

                <Arrow direction={"welcome-go-to-user-page"}/>
            </Styles>
        </div>
    )
}

export default DescriptionPage