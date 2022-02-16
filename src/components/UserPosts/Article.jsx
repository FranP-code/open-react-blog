import React from 'react'
import moment from 'moment'
import TitleTwo from '../Titles/TitleTwo'

const Article = ({post}) => {
    
    return (
        <div className='article' >
            <div className="top">
                <TitleTwo>
                    {post.title}
                </TitleTwo>
                <div className='aditional-data'>
                    <span className='date'>
                        {moment(moment.unix(post.date.seconds)).format('L')}
                    </span>
                    <span className="lecture-time">
                        {post.readTime}
                    </span>
            </div>
            </div>
            <p>
                {
                    post.firstPragraph || post.fristParagraph /////! CHANGE TO FIRSTPARAGRAPH  !!!!
                }
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ratione debitis nobis ut vel deleniti assumenda totam, fugiat eos qui ea eligendi perferendis quos sapiente ipsam eaque reiciendis placeat veniam!
            </p>
        </div>
    )
}

export default Article