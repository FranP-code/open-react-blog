import React from 'react'
import styled from 'styled-components'

import logo from '../../logo.png'
import TitleOne from '../Titles/TitleOne'
import TitleTwo from '../Titles/TitleTwo'

import './Header.css'

const MainHeader = (props) => {
  
    return (
        <header className='main-header'>
            <div className="logo-container">
                <img src={logo} alt="" />
                {/* <h1>ORB</h1>
                <h2>(Open React Blog)</h2> */}
                <TitleOne>ORB</TitleOne>
                <TitleTwo>(Open React Blog)</TitleTwo>
            </div>
            <h2 className='additional-text'>{props.additionalText}</h2>
        </header>
    )
}

export default MainHeader