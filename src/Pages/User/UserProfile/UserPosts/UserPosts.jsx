import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import LanguageContext from '../../../../contexts/LanguageContext'

import TitleTwo from '../../../../components/Titles/TitleTwo'
import Article from './Article'
import NoDataPage from '../../../NoDataPage/NoDataPage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'

const UserPosts = ({rawPosts, formatedPosts, getMoreData, username}) => {

    const ArticlesContainerStyles = styled.div`

        width: 100%;
        height: 88.9vh;
        padding-bottom: 8vh;

        .no-data {

            width: 100%;
            height: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
   
            svg {
                width: 25vw;
                max-width: 250px;
                height: 25vw;
                max-height: 250px;
                color: #aabdd6;
            }

            .titles {
                margin-top: 5vh;
                color: #aabdd6;
            }
        }
        
        .articles-container {

            display: flex;
            flex-wrap: wrap;
            
            align-items: flex-start;
        
            .articles-column {
                
                width: calc(33.3% - 2vw);

                &.column-2 {

                    margin: 0px 2vw;
                }
            }
            .articles-column, .articles-raw {

                .article {

                    margin: 2vh 0px;
                    padding: 1vh 2vw 2vh 2vw;

                    border: #000 solid 2px;
                    border-radius: 5px;

                    box-shadow: 3px 3px 1px #000;

                    cursor: pointer;

                    &:hover {

                        transform: scale(1.01, 1.01);
                    }

                    .top {

                        // display: flex;

                        padding: 1vh 0px;
                        margin-bottom: 2vh; 
                        border-bottom: 3px solid #000;

                        .aditional-data {

                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;

                            margin-top: 1vh;
                            
                            .date {
                                
                                font-weight: bold;
                                font-size: 10pt;
                            }

                            .lecture-time {

                                color: #666666;
                                font-size: 9pt;
                            }
                        }

                        .title-two {

                            overflow-wrap: break-word;
                        }
                    }

                }                
            }

            .articles-raw {
                width: 94vw;
            }

        }
    `

    const language = useContext(LanguageContext).language

    const text = {
        noPosts: {
            english: "Oops, no posts here yet",
            spanish: "Ups, no hay posts aquí aún"
        }
    }

    const [structureOfPosts, setStructureOfPosts] = useState(false)

    function defineStructureOfPosts() {

        const width = document.body.clientWidth

        if (width <= 900) {
            setStructureOfPosts("Raw")
        } else {
            setStructureOfPosts("Columns")
        }
    }

    React.useEffect(() => {
        defineStructureOfPosts()

        window.addEventListener('resize', defineStructureOfPosts)
    }, [])

    return (
        <ArticlesContainerStyles>
            {
                structureOfPosts === "Columns" ?
                    <>
                        {
                            formatedPosts[0].length < 1 ?
                                <NoDataPage color="#aabdd6">
                                    <FontAwesomeIcon
                                        icon={faFaceGrinBeamSweat}
                                        color="#aabdd6"
                                        />
                                    <div className="titles">
                                        <TitleTwo text={text.noPosts[language]}/>
                                    </div>
                                </NoDataPage>
                            : null
                                
                        }
                        <div className='articles-container'>
                            <div className="articles-column column-1">
                                {
                                    formatedPosts[0].map((post, index) => (

                                        <Article post={post} key={index} username={username}/>
                                    ))
                                }
                            </div>
                            <div className="articles-column column-2">
                                {
                                    formatedPosts[1].map((post, index) => (

                                        <Article post={post} key={index} username={username}/>
                                    ))
                                }
                            </div>
                            <div className="articles-column column-3">
                                {
                                    formatedPosts[2].map((post, index) => (

                                        <Article post={post} key={index} username={username}/>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                : null
            }
            {
                structureOfPosts === "Raw" ?
                    <div className='articles-container'>
                        <div className="articles-raw">

                        {
                            rawPosts.map((post, index) => (
                                <Article post={post} key={index} username={username}/>
                            ))
                        }
                        </div>
                    </div>
                : null
            }
        </ArticlesContainerStyles>
    )
}

export default UserPosts