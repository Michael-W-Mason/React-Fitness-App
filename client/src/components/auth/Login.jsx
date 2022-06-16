import { useContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Login = props => {

    const { userId, setUserId } = useContext(UserContext);
    const history = useHistory();
    const [formState, setFormState] = useState(true);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [registerForm, setRegiserForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    function loginHandler(e) {
        e.preventDefault();
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    }

    function registerHandler(e) {
        e.preventDefault();
        setRegiserForm({ ...registerForm, [e.target.name]: e.target.value });
    }

    function loginSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", { ...loginForm }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data) {
                    setUserId(res.data.userId);
                    localStorage.setItem('userId', new String(res.data.userId))
                    history.push("/schedule");
                }
            })
            .catch(err => console.log(err));
    }

    function registerSubmit(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", { ...registerForm }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data) {
                    setUserId(res.data.userId);
                    localStorage.setItem('userId', new String(res.data.userId));
                    history.push("/schedule");
                }
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        if (formState) {
            setRegiserForm({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        }
        else {
            setLoginForm({
                email: "",
                password: ""
            });
        }
    }, [formState])

    function register(e) {
        e.preventDefault();
        setFormState(!formState);
    }

    return (
        <div className="w-2/5 h-1/2 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white border-y-2 border-b-2 border-gray-100 shadow-md">
            <div className="h-14 bg-blue-700 flex items-center justify-center mb-2">
                <h1 className="text-white  self-center block text-xl font-bold text-center">Welcome to MyWorkoutPal</h1>
            </div>
            {formState ?
                <form className="flex h-3/4 flex-col items-center justify-center" onSubmit={loginSubmit}>
                    <div className="w-1/2 flex justify-between m-2">
                        <label htmlFor="email" className="self-center block text-base font-bold text-center">Email:</label>
                        <input type="email" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="email" onChange={loginHandler} value={loginForm.email} />
                    </div>
                    <div className="w-1/2 flex justify-between m-2">
                        <label htmlFor="password" className="self-center block text-base font-bold text-center">Password:</label>
                        <input type="password" name="password" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={loginHandler} value={loginForm.password} />
                    </div>
                    <button type="submit" className="w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center m-2">Login</button>
                    <a onClick={register} className="cursor-pointer text-blue-500 underline">New User? Click Here to Register</a>
                </form>
                :
                <form className="flex flex-col items-center" onSubmit={registerSubmit}>
                    <div className="w-1/2  flex justify-between m-2">
                        <label htmlFor="firstName" className="self-center text-base font-bold text-center">First Name:</label>
                        <input type="firstName" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="firstName" onChange={registerHandler} value={registerForm.firstName} />
                    </div>
                    <div className="w-1/2 flex justify-between m-2">
                        <label htmlFor="lastName" className="self-center  text-base font-bold text-center">Last Name:</label>
                        <input type="lastName" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="lastName" onChange={registerHandler} value={registerForm.lastName} />
                    </div>
                    <div className="w-1/2 flex justify-between m-2">
                        <label htmlFor="email" className="self-center  text-base font-bold text-center">Email:</label>
                        <input type="email" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="email" onChange={registerHandler} value={registerForm.email} />
                    </div>
                    <div className="w-1/2 flex justify-between m-2">
                        <label htmlFor="password" className="self-center  text-base font-bold text-center">Password:</label>
                        <input type="password" name="password" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={registerHandler} value={registerForm.password} />
                    </div>
                    <div className="w-1/2 flex justify-between m-2 overflow-hidden whitespace-nowrap">
                        <label htmlFor="confirmPassword" className="self-center text-base font-bold text-center">Confirm Password:</label>
                        <input type="password" name="confirmPassword" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={registerHandler} value={registerForm.confirmPassword} />
                    </div>
                    <button type="submit" className="w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center m-2">Register</button>
                    <a onClick={register} className="cursor-pointer text-blue-500 underline my-4">Already Have an Account? Click Here to Login</a>
                </form>}
        </div>
    )
}

export default Login;