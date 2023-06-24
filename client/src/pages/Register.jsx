import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BsFillLockFill, BsArrowLeft } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaGalacticSenate, FaUserCircle } from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from '../context/AppContext'



const Register = () => {
    let navigate = useNavigate()
    document.title = "Register"
    const { notification } = useContext(AppContext)
    const [checkEmail, setCheckEmail] = useState(false)
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        name: ""
    })

    const [loading, setLoading] = useState(false)

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value

        setUserInput((input) => {
            return { ...input, [name]: value }
        })
    }

    const register = async () => {
        const { email, password, name } = userInput;
        try {
            if (email && password && name.length < 27 ) {
                if (email.includes('@gmail.com')) {
                    setCheckEmail(false)
                    setLoading(true)
                    let registerUser = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/register', {
                        method: "POST",
                        body: JSON.stringify(userInput),
                        headers: { "Content-Type": "application/json" },
                        credentials: "include"
                    })
                    let response = await registerUser.json()
                    if (registerUser.status === 200) {
                        navigate('/verifying')
                        setLoading(false)
                        setTimeout(() => {
                            notification("Registered successfully")
                        }, 3000)
                    } else {
                        notification(response.error)
                        setLoading(false)
                    }
                } else {
                    setCheckEmail(true)
                }
            } else { notification("Please Enter the given information") }
        } catch (err) { }
    }

    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <div className="container-center">
            <div className="register-container">
                <BsArrowLeft className="epy-exit" onClick={handleGoBack} />
                <FaUserCircle style={{ fontSize: "8rem" }} className="person-1" />
                <p>Please register to continue</p>
                <div className="user-inputs">

                    <div className='input-icons-div'>
                        <input type="text" placeholder='Channel name' onChange={handleInput} name="name" autoComplete='off' style={userInput.name.length > 27 ? { color: "red" } : null} />
                        <MdEmail style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
                    </div>
                    {userInput.name.length > 27 ? <p style={{ color: "red", fontSize: "1rem", width: "100%", textAlign: "start", marginTop: "5px" }}>name cannot exceed 27 letters</p> : null }
                    <div className='input-icons-div'>
                        <input type="email" placeholder='Email' onChange={handleInput} name="email" autoComplete='off' autoCorrect='off' />
                        <MdEmail style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "23%" }} />
                    </div>
                    {checkEmail ? <p style={{ color: "red", fontSize: "1rem", width: "100%", textAlign: "start", marginTop: "5px" }}>pleaes enter a valid email</p> : null}
                    <div className='input-icons-div'>
                        <input type="password" placeholder='Password' onChange={handleInput} name="password" autoComplete='off'  />
                        <BsFillLockFill style={{ color: "#a0a0a0", fontSize: "25px", position: "absolute", left: "3%", bottom: "24%" }} />
                    </div>
                </div>
                {loading ?
                    <button><Spinner animation="border" style={{ marginRight: "10px" }} />Verifying...</button> :
                    <button onClick={register}>Register</button>}
                <NavLink to={'/login'} className="nav-link">
                    <span>Already have an account</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Register