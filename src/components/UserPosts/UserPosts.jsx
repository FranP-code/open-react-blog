import { div, ImageList, p } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import TitleTwo from '../Titles/TitleTwo'

const UserPosts = () => {

    const ArticlesContainerStyles = styled.div`
        
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
        <ArticlesContainerStyles>
            <div className='articles-container'>
                <div className="articles-row row-1">
                    <div  className='article' >
                        <div className="top">
                            <TitleTwo>
                                Lalalallalallalalallalalall
                            </TitleTwo>
                            <div className='aditional-data'>
                                <span className='date'>
                                    12-02-2002
                                </span>
                                <span className="lecture-time">
                                    3 min.
                                </span>
                            </div>
                        </div>

                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione debitis nobis ut vel deleniti assumenda totam, fugiat eos qui ea eligendi perferendis quos sapiente ipsam eaque reiciendis placeat veniam!
                        </p>
                    </div>
                    <div  className='article' >
                        <TitleTwo>
                            Header
                        </TitleTwo>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!
                        </p>
                    </div>
                </div>

                <div className="articles-row row-2">
                    <div  className='article' >
                        <TitleTwo>
                            Header
                        </TitleTwo>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!
                        </p>
                    </div>
                    <div  className='article' >
                        <TitleTwo>
                            Header
                        </TitleTwo>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione debitis nobis ut vel deleniti assumenda totam, fugiat eos qui ea eligendi perferendis quos sapiente ipsam eaque reiciendis placeat veniam!
                        </p>
                    </div>
                </div>
                <div className="articles-row row-3">        
                    <div  className='article' >
                        <TitleTwo>
                            Header
                        </TitleTwo>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!
                        </p>
                    </div>
                    <div  className='article' >
                        <TitleTwo>
                            Header
                        </TitleTwo>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non provident optio, nesciunt et natus reprehenderit necessitatibus harum nemo suscipit iure, nam tenetur quibusdam quisquam odio accusantium laborum magni inventore neque. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo alias adipisci minus tempore, voluptatem similique, dolores dolore temporibus ullam itaque nobis doloribus quibusdam. Velit facilis molestiae eum amet corrupti quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consequuntur laborum libero? Omnis, doloribus minus vitae illo non rerum laboriosam illum, dolorem, deserunt ad praesentium reiciendis eaque esse voluptatibus a!
                        </p>
                    </div>
                </div>
            </div>
        </ArticlesContainerStyles>
    )
}

export default UserPosts