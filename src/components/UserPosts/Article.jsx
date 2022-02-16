import React from 'react'
import TitleTwo from '../Titles/TitleTwo'

const Article = () => {
    
    return (
        <div className='article' >
            <div className="top">
                <TitleTwo>
                    Sample Title
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
    )
}

export default Article