import React from 'react';
import { useState} from 'react';
import './register.css';
import {Link} from 'react-router-dom';
import Alert from './webcomponents/Alert';

export default function Login() {
    const [values, setValues] = useState({ email: "", password: "" });
    const [showAlert, setShowAlert] = useState(false);

    const handlefoam=async (e)=>{
     const {email,password}=values
console.log(email,password)
        e.preventDefault();
const fuser=await fetch("http://localhost:9000/auth/login",{
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password
    })
})
const data =await fuser.json();
console.log(data);
if(data.token){
    console.log(data);
    localStorage.setItem('token',data.token);
    console.log(data.token)
    window.location.href='./mainpage';
}
else{
    console.log(data);
    setShowAlert(true)
    setTimeout(() => {
        setShowAlert(false);
      }, 3000);
}
}
const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
<div className="main">
 <div className="main0">
<div className="message">
 <div className="header">
    <div className="mainmessage" style={{padding:'1px'}}>
        <span style={{"fontSize": " xxx-large"}}>Hallo, friend</span><br/>walcome to S-notes
        (secure-notes)
    </div>
    <div className="downmessage">
        Please Login and make a touch with us and enjoy our free servacis
    </div>
 </div>
</div>
<div className="foam">
    <div className="form0">
 <div className="mainfoam">
    <h2 className='loginname'>Login</h2>
    <span className='loginpoint'>Create a account? <Link to='/'><span>Sing-in</span></Link> </span>
    <form onSubmit={handlefoam} className='formmain'>
        <main className="inputs">
            <br/>
            <div className="inputin">
            <input style={{"width": "260px"}} type="email" placeholder='Email'onChange={handleChange}  name='email' id="ename" className="ename" /><span className='inputemo'>🔓</span>
            </div>
            <br/>
            <div className="inputin">
            <input style={{"width": "260px"}} type="password" placeholder="Password" onChange={handleChange} name='password' id="pname" className="pname" /><span className='inputemo'>🔑</span>
            </div>
            <br/>
        </main>
        <div className="downbtn">
            <input type="submit" value="Login" className='btnsubmit' />
            </div>
    </form>
    {showAlert && <Alert message='Not Login'/>}
 </div>
</div>
</div>
 </div>
</div>
  )
}
