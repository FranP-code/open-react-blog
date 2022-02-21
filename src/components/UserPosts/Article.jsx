import React from 'react'
import moment from 'moment'
import TitleTwo from '../Titles/TitleTwo'
import { withRouter } from 'react-router'

const Article = ({post, history, username}) => {

    function clickHandler() {
        history.push(`/${username}/post/${post.id}`)
    }
    
    return (
        <div className={post.data.status === "empty" ? "article empty" : "article"} onClick={clickHandler}>
            <div className="top">
                <TitleTwo>
                    {post.data.title}
                </TitleTwo>
                <div className='aditional-data'>
                    <span className='date'>
                        {moment(moment.unix(post.data.date.seconds)).format('L')}
                    </span>
                    <span className="lecture-time">
                        {post.data.readingTime}
                    </span>
            </div>
            </div>
            <p>
                {
                    post.data.shortPost
                }
            </p>
        </div>
    )
}

export default withRouter(Article)