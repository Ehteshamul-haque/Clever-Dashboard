import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
          navigate("/");
        }
      },[]);
    const login = async () => {
        console.log(email,password)
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        result = await result.json()
        console.log(result)
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("Token", JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert('please enter correct details')
        }
    }
  return (
    <div className='login'>
        <h1>Login</h1>
        <input type="text" className="inputBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
        <input type="password" className="inputBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
        <button onClick={login} className='appButton' type="button">Login</button>
    </div>
  )
}

export default Login