import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import TitleTwo from '../Titles/TitleTwo'
import Article from './Article'
import { faFaceGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'

const UserPosts = ({posts}) => {

    const ArticlesContainerStyles = styled.div`

        width: 100%;
        height: 50vh;    

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
        
            .articles-row {
                
                width: calc(33.3% - 2vw);

                &.row-2 {

                    margin: 0px 2vw;
                }

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

                        display: flex;

                        padding: 1vh 0px;
                        margin-bottom: 2vh; 
                        border-bottom: 3px solid #000;

                        .aditional-data {

                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            
                            width: 40%;
                            
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

                            width: 60%;
                            overflow-wrap: break-word;
                        }
                    }

                }
                
            }

        }
    `
  
    return (
        <ArticlesContainerStyles className="animate__animated animate__fadeIn">
            {
                posts[0].length < 1 ?
                <div className="no-data">

                    <FontAwesomeIcon
                        icon={faFaceGrinBeamSweat}
                        />
                    <div className="titles">
                        <TitleTwo text={"What shall we use to fill the empty spaces...?"}/>
                        <TitleTwo text={"- Pink Floyd"}/>
                    </div>
                    </div>
                : null
                    
            }
            <div className='articles-container'>
                <div className="articles-row row-1">
                    {
                        posts[0].map((post, index) => (

                            <Article post={post} key={index}/>
                        ))
                    }
                </div>
                <div className="articles-row row-2">
                    {
                        posts[1].map((post, index) => (

                            <Article post={post} key={index}/>
                        ))
                    }
                </div>
                <div className="articles-row row-3">
                    {
                        posts[2].map((post, index) => (

                            <Article post={post} key={index}/>
                        ))
                    }
                </div>
            </div>
        </ArticlesContainerStyles>
    )
}

export default UserPosts