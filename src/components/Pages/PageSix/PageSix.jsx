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
import { faFaceDizzy, faFaceGrinBeam } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoDataPage from '../NoDataPage/NoDataPage'
import Loading from '../../Loading/Loading'

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
                margin: 0px 2vw;
                text-align: center;
            }

            a {
                margin-top: 1vh;
            }
        }
        .content {
            /* height: 100vh; */
            width: 70vw;

            padding: 0px 17vw;
            margin-bottom: 2vh;

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

        @media (max-width: 900px) {
            flex-direction: column;

            .user-data {
                padding-top: 2vh;
                width: 100%;

                flex-direction: initial;

                .user-icon {
                    margin: 0px 2vw;
                }

                h3 {
                    margin: 0px 2vw;
                    text-align: center;
                }

                a {
                    margin-left: 1vh;
                    margin-top: 0;
                    /* background-color: #66A3FF;
                    
                    color: #fff;
                    text-decoration: none;
                    font-weight: bold;
                    padding: 1vh 2vw; */
                }
            }
            .content {
                border: none;
                width: 100%;

                header {
                    height: 10vh;
                    margin-top: 5vh;
                }
            }
        }
    `
    
    const [post, setPost] = useState(false)
    const [displayUsername, setDisplayUsername] = useState(false)
    const username = useParams().username
    const postId = useParams().postId
    
    const [loading, setLoading] = useState(true)
    const [postFound, setPostFound] = useState(false)

    async function pageSixHandler() {
        const usernameData = await checkUsernameExistance(username)
        setDisplayUsername(usernameData.data.displayUsername)
        const postData = await getPost(postId, usernameData.id)

        if (postData.state === "error") {

            setLoading(false)
            return
        }
        setPostFound(true)
        setPost({
            title: postData.title,
            data: postData.post
        })

        setLoading(false)
    }
    React.useEffect(() => {
        pageSixHandler()
    }, [])

    return (
        <>  
            <Loading loading={loading}/>
            {
                !loading && !postFound ?
                    <NoDataPage>
                        <FontAwesomeIcon
                            icon={faFaceDizzy}
                            color="#aabbdd"
                            className='user-icon'
                        />
                        <h2>Post don't found</h2>
                        <Link to={`/${username}`} children="Profile Page"/>
                    </NoDataPage>
                : null
            }
            {
                !loading && postFound ? 
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
                : null
            }
        </>
    )
}

export default withRouter(PageSix)