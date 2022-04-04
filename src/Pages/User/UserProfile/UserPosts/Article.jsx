import React from 'react'
import moment from 'moment'
import { withRouter } from 'react-router'

import TitleThree from '../../../../components/Titles/TitleThree'

const Article = ({post, history, username}) => {

    function clickHandler() {
        history.push(`/${username}/post/${post.id}`)
    }
    
    return (
        <div className={post.data.status === "empty" ? "article empty" : "article"} onClick={clickHandler}>
            <div className="top">
                <TitleThree>
                    {post.data.title}
                </TitleThree>
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