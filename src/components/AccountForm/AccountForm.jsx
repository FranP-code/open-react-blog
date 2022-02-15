import React from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const AccountForm = ({action, email, setEmail, username, setUsername, password, setPassword, submitFunction}) => {
  
    return (
        <div className='account-form' style={{width: action === "register" ? "25vw" : "20vw"}}>
            <form onSubmit={(e) => submitFunction(e)}>
                {
                    action === "register" ? 
                        <input
                            id="username-input"
                            type="text"
                            placeholder='Username'
                            required
                            onChange={(e) => {setUsername(e.target.value)}}
                            />
                    : null
                }
                <input
                    type="email"
                    placeholder='Email'
                    required
                    // onChange={(e) => {setEmail(e.target.value)}}
                    ref={email}
                />
                <input
                    type="password"
                    placeholder='Password'
                    required
                    // onChange={(e) => {setPassword(e.target.value)}}
                    ref={password}
                />
                <ButtonComponent
                    type="submit"
                    color="#4CAF50"
                    text={action === 'register' ? 'Create Account' : "Log in"}
                    onClickFunction={(e) => submitFunction(e)}
                />
                {/* <input type="submit" value={action === 'register' ? 'Create Account' : "Log in"} /> */}
            </form>
        </div>
    )
}

export default AccountForm