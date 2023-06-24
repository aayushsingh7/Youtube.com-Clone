import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {BsFillLockFill , BsArrowLeft} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {FaGalacticSenate, FaUserCircle} from 'react-icons/fa'
import Spinner from 'react-bootstrap/Spinner';
import { AppContext } from '../context/AppContext'



const Login = () => {
      let navigate = useNavigate()
      document.title = "Login"
      const {notification} = useContext(AppContext)
    const [userInput , setUserInput] = useState({
        email:"",
        password:""
    })
    const [loading , setLoading] = useState(false)

    const handleInput = (e)=> {
        let name = e.target.name;
        let value = e.target.value

        setUserInput((input)=> {
        return {...input , [name]:value}
        })
    }

    const login = async()=> {
        try {
           if(userInput.email && userInput.password){
            setLoading(true)
            let loginUser = await fetch('https://youtube-clone-rx4q.onrender.com/api/v1/login',{
                method:"POST",
                body:JSON.stringify(userInput),
                headers:{"Content-Type":"application/json"},
                credentials:"include"
            })
            let response = await loginUser.json()
            if(loginUser.status === 200){
               navigate('/verifying')
                setLoading(false)
               setTimeout(()=> {
              notification("Login successfully")
               },3000)
            }else{
               notification(response.error)
                setLoading(false)
            }
           }else{notification("Please enter given information")}
        } catch (err) {}
    }

    const handleGoBack = ()=> {
        navigate('/')
    }

  return (
   <div className="container-center">
    <div className="login-container">
    <BsArrowLeft className="epy-exit" onClick={handleGoBack} />
    <FaUserCircle style={{fontSize:"8rem"}} className="person-1"/>
     <p>Please login to continue</p>
     <div className="user-inputs">
    <div className='input-icons-div'>
    <input type="text" placeholder='Email'  onChange={handleInput} name="email" autoComplete='off' autoCorrect='off'/>
    <MdEmail style={{color:"#a0a0a0",fontSize:"25px",position:"absolute",left:"3%",bottom:"23%"}}/>
    </div>
    <div className='input-icons-div'>
    <input type="password" placeholder='Password' onChange={handleInput} name="password" autoComplete='off' autoCorrect='off' />
    <BsFillLockFill style={{color:"#a0a0a0",fontSize:"25px",position:"absolute",left:"3%",bottom:"24%"}}/>
    </div>
     </div>
     {
        loading ?  
         <button><Spinner animation="border" style={{marginRight:"10px"}} />Verifying...</button> : 
         <button onClick={login}>Login</button>
       }
    <NavLink to={'/register'} className="nav-link">
    <span>Create a new account</span>
     </NavLink>
    </div>
   </div>
  )
}

export default Login