import React from 'react'
import styled from 'styled-components'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import {withRouter} from 'react-router'

const UserHeader = ({displayUsername, signedIn, history, username}) => {

    const UserHeaderStyles = styled.header`
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 2vh 0px;
    `

    function redirectPage() {
        history.push(`/${username}/write`)
    }
  
    return (
        <UserHeaderStyles>
            <h1>
                {displayUsername}'s lasts posts
            </h1>
            <ButtonComponent
                color="#66A3FF"
                text={signedIn ? "Write One!" : "Log In"}
                width="20vw"
                onClickFunction={signedIn ? redirectPage : null}
                
            />
        </UserHeaderStyles>
    )
}

export default withRouter(UserHeader)