import React from 'react'
import moment from 'moment'
import TitleTwo from '../Titles/TitleTwo'

const Article = ({post}) => {

    // React.useEffect(() => {

    //     if (post.status === "empty") {
    //         post.title = 'Empty post'
    //         post.date.seconds = 334717200
    //         post.readingTime = "6 min."
    //         post.shortPost = "This is a post to reserve space. Ignore it please..."
    //     }
    // }, [])
    
    return (
        <div className={post.status === "empty" ? "article empty" : "article"}>
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