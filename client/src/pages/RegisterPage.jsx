import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    function registerUser(ev){
        ev.preventDefault();
        axios.post('/register',{
            name,
            email,
            password,
        });
    }    

    return (
        <div className="mt-4 grow flex items-center justify-around"> 
            <div className="=mb-32">
            <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input type = "text" 
                    placeholder="User Name" 
                    value={name} 
                    onChange={ev => setname(ev.target.value)} />
                <input type="email" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={ev => setemail(ev.target.value)}/>
                <input type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={ev => setpassword(ev.target.value)}/>

                <button className="primary">Sign Up</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member? <Link className= "underline text-black font-bold" to = {'/login'}> Login </Link>
                </div>
            </form>
            </div>     
        </div>
    );
}