import { useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

const GoalForm = props => {
    const {userId, setUserId} = useContext(UserContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        unit: "",
        goal: 0
    })

    function changeHandler(e) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        axios.post(`http://localhost:3001/api/goals`, {...formData, userId : userId}, {withCredentials: true})
            .then(res => {
                console.log(res);
                setFormData({
                    name: "",
                    unit: "",
                    goal: 0
                });
                history.push("/goals");
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="max-w-5xl mx-auto bg-white p-14 border-2 border-gray-100 shadow-md mt-6">
            <form className='flex flex-col justify-evenly gap-10' onSubmit={submitHandler}>
                {/* Workout Name */}
                <div className='flex flex-row justify-center gap-5'>
                    <label htmlFor="name" className='self-center block text-lg font-bold text-center'>Name of your goal:</label>
                    <input name='name' type="text" placeholder="Name for your Goal" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-3/5' onChange={changeHandler} />
                </div>
                <div className='flex flex-row justify-center gap-5'>
                    <label htmlFor="goal" className='self-center text-lg font-bold text-center'>Goal Value:</label>
                    <input name='goal' type="number" placeholder="Your Final Goals Value" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-2/5' onChange={changeHandler} />
                    <label htmlFor="name" className='self-center block text-lg font-bold text-center'>Units:</label>
                    <input name='unit' type="text" placeholder="Units" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-1/5' onChange={changeHandler} />
                </div>
                <button type='submit' className='w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>Create Goal</button>
            </form>
        </div>
    );
}

export default GoalForm;