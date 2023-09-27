import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage(){
const [email,setemail] = useState('');
const [password,setpassword] = useState('');
const [redirect,setredirect] = useState(false);
const {setuser} = useContext(UserContext);

async function handleLoginSubmit(ev){
    ev.preventDefault();
    try {
        const {data} = await axios.post('/login',{
            email,
            password});
        setuser(data);
        alert("Login successful. Now you can log in");
        setredirect(true);
    } catch (e){
        alert('Login failed. Please try again');
    }
}
    if (redirect){
        return <Navigate to = {'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around"> 
            <div className="=mb-32">
            <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
                <input type="email" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={ev => setemail(ev.target.value)  } />
                <input type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={ev => setpassword(ev.target.value)}/>
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className= "underline text-black font-bold" to = {'/register'}>Register Here</Link>
                </div>
            </form>
            </div>     
        </div>
    );
}