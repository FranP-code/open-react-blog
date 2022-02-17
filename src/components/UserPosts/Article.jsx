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
                        {post.readingTime}
                    </span>
            </div>
            </div>
            <p>
                {
                    post.shortPost
                }
            </p>
        </div>
    )
}

export default Article