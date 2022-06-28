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
    const [loginError, setLoginError] = useState({
        email: "",
        password: ""
    });
    const [registerError, setRegisterError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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
        setLoginError({ email: "", password: "" });
        axios.post("http://localhost:3001/api/login", { ...loginForm })
            .then(res => {
                console.log(res);
                if (res.data) {
                    setUserId(res.data.userId);
                    localStorage.setItem('userId', new String(res.data.userId))
                    history.push("/schedule");
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setLoginError({ ...loginError, email: "Invalid Email / Password" })
                }
            });
    }

    function registerSubmit(e) {
        e.preventDefault();
        setRegisterError({ ...registerError, firstName: "", lastName: "", email: "", password: "", confirmPassword: ""});
        axios.post("http://localhost:3001/api/register", { ...registerForm })
            .then(res => {
                console.log(res);
                if(res.data.errors) {
                    setRegisterError({...registerError, 
                        firstName: res.data.errors.firstName? res.data.errors.firstName.message : "",
                        lastName: res.data.errors.lastName? res.data.errors.lastName.message : "",
                        email: res.data.errors.email? res.data.errors.email.message : "",
                        password: res.data.errors.password? res.data.errors.password.message : "",
                        confirmPassword: res.data.errors.confirmPassword? res.data.errors.confirmPassword.message : ""
                    });
                }
                if (res.data.userId) {
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
        <div style={{height: "500px"}} className="w-2/5 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white border-y-2 border-b-2 border-gray-100 shadow-md">
            <div className="h-14 bg-blue-700 flex items-center justify-center mb-2">
                <h1 className="text-white  self-center block text-xl font-bold text-center">Welcome to MyWorkoutPal</h1>
            </div>
            {formState ?
                <form className="flex h-3/4 flex-col items-center justify-center" onSubmit={loginSubmit}>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="email" className="self-center block text-base font-bold text-center">Email:</label>
                        <input type="email" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="email" onChange={loginHandler} value={loginForm.email} />
                        <span className="text-red-500">{loginError.email}</span>
                    </div>
                    <div className="grid grid-cols-3 m-2 w-full">
                        <label htmlFor="password" className="self-center block text-base font-bold text-center">Password:</label>
                        <input type="password" name="password" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={loginHandler} value={loginForm.password} />
                        <span className="text-red-500">{loginError.password}</span>
                    </div>
                    <button type="submit" className="w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center m-2">Login</button>
                    <a onClick={register} className="cursor-pointer text-blue-500 underline">New User? Click Here to Register</a>
                </form>
                :
                <form className="flex flex-col items-center" onSubmit={registerSubmit}>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="firstName" className="self-center text-base font-bold text-center">First Name:</label>
                        <input type="firstName" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="firstName" onChange={registerHandler} value={registerForm.firstName} />
                        <span className="text-red-500">{registerError.firstName}</span>
                    </div>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="lastName" className="self-center  text-base font-bold text-center">Last Name:</label>
                        <input type="lastName" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="lastName" onChange={registerHandler} value={registerForm.lastName} />
                        <span className="text-red-500">{registerError.lastName}</span>
                    </div>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="email" className="self-center  text-base font-bold text-center">Email:</label>
                        <input type="email" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="email" onChange={registerHandler} value={registerForm.email} />
                        <span className="text-red-500">{registerError.email}</span>
                    </div>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="password" className="self-center  text-base font-bold text-center">Password:</label>
                        <input type="password" name="password" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={registerHandler} value={registerForm.password} />
                        <span className="text-red-500">{registerError.password}</span>
                    </div>
                    <div className="grid grid-cols-3 justify-center items-center m-2 w-full">
                        <label htmlFor="confirmPassword" className="self-center text-base font-bold text-center">Confirm Password:</label>
                        <input type="password" name="confirmPassword" className="mx-1 text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={registerHandler} value={registerForm.confirmPassword} />
                        <span className="text-red-500">{registerError.confirmPassword}</span>
                    </div>
                    <button type="submit" className="w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center m-2">Register</button>
                    <a onClick={register} className="cursor-pointer text-blue-500 underline my-4">Already Have an Account? Click Here to Login</a>
                </form>}
        </div>
    )
}

export default Login;