import MDEditor from '@uiw/react-md-editor'
import React, { useState } from 'react'
import getPost from './Firebase Querys/getPost'
import {useParams} from 'react-router-dom'
import checkUsernameExistance from './Firebase Querys/checkUsernameExistance'
import GoBackArrow from '../../GoBackArrow/GoBackArrow'
import { withRouter } from 'react-router-dom'
import TitleTwo from '../../Titles/TitleTwo'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { faFaceGrinBeam } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PageSix = ({history}) => {

    const PageSixStyles = styled.div`
        
        height: 100%;

        display: flex;
        /* justify-content: space-around; */
        flex-direction: initial;
        
        padding: 0;

        .user-data {
            width: 15vw;

            display: flex;
            flex-direction: column;
            align-items: center;

            padding-top: 22vh;
            
            .user-icon {
                min-width: 55px;
                width: 2vw;
                max-width: 125px;
                
                min-height: 55px;
                height: 2vw;
                max-height: 125px;
            }

            h3 {
                font-size: 18pt;
            }

            a {
                margin-top: 1vh;
            }
        }
        .content {
            height: 100vh;
            width: 70vw;

            padding: 0px 17vw;

            border: 1px solid #c0d6ff;
            border-top: none;
            border-bottom: none;

            header {
                display: flex;
                align-items: center;
                
                padding: 1vh 0px;
                
                user-select: initial;

                /* border-bottom: 1px solid #8d9dbb; */
            }

            .wmde-markdown {

                margin-top: 2vh;

                p {
                    text-align: justify;

                }
            }
        }
    `
    
    const [post, setPost] = useState(false)
    const [displayUsername, setDisplayUsername] = useState(false)

    const username = useParams().username
    const postId = useParams().postId

    async function pageSixHandler() {
        const usernameData = await checkUsernameExistance(username)
        setDisplayUsername(usernameData.data.displayUsername)
        const postData = await getPost(postId, usernameData.id)
        
        console.log(usernameData)
        console.log(postData)

        if (postData.state === "error") {

            //! SHOW NO DATA PAGE WITH 'ERROR POST DONT FOUND'
            return
        }

        setPost({
            title: postData.title,
            data: postData.post
        })
    }
    React.useEffect(() => {
        pageSixHandler()
    }, [])

    return (
        <PageSixStyles className="page">
            <div className="user-data">
                <FontAwesomeIcon 
                    icon={faFaceGrinBeam}
                    color="#aabbdd"
                    className='user-icon'
                />
                <h3>
                    {displayUsername}
                </h3>
                <Link to={`/${username}`} children="Profile Page"/>
            </div>
            <div className="content">
                <header>
                    {/* <GoBackArrow onClickFunction={() => history.push(`/${username}`)}/> */}
                    <TitleTwo>
                        {post.title}
                    </TitleTwo>
                </header>
                <MDEditor.Markdown source={post.data} />
            </div>
        </PageSixStyles>
    )
}

export default withRouter(PageSix)