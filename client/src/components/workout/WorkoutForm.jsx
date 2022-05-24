import { useState } from 'react';
import SetRep from './SetRep';
import Circuit from './Circuit';
import TimeDist from './TimeDist';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const WorkoutForm = (props) => {
    const [workoutForm, setWorkoutForm] = useState({
        name: "",
        workout: [{
        }]
    })
    const history = useHistory()

    function formType(type, i) {
        switch (type) {
            case "sets": return (<SetRep setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} />)
            case "circuit": return (<Circuit setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} />)
            case "timedist": return (<TimeDist setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} />)
            default: return (<></>)
        }
    }

    function nameChange(e) {
        e.preventDefault();
        setWorkoutForm({ ...workoutForm, [e.target.name]: e.target.value });
    }

    function typeChange(e, index) {
        e.preventDefault();
        let workoutType = workoutForm;
        workoutType.workout[index].type = e.target.value;
        if (index === workoutForm.workout.length - 1) {
            setWorkoutForm({
                ...workoutForm,
                workout: [...workoutType.workout, {}]
            })
        }
        else{
            setWorkoutForm({
                ...workoutForm,
                workout: [...workoutType.workout]
            })
        }
    }

    function submitHandler(e){
        e.preventDefault();
        let tempForm = structuredClone(workoutForm);
        for(let i in tempForm){
            if(tempForm[i].name === ""){
                alert("Name Required");
            }
            else if(i === "workout"){
                tempForm.workout.pop();
                for(let j in tempForm.workout){
                    let obj = tempForm.workout[j];
                    if(obj.type === "sets"){
                        obj.steps.pop();
                    }
                    else if(obj.type === "circuit"){
                        obj.steps.pop();
                    }
                }
            }
        }
        console.log(tempForm);
        axios.post("http://localhost:8000/api/workouts", {...tempForm})
            .then(res => {
                console.log(res);
                setWorkoutForm({
                    name: "",
                    workout: [{
                    }]
                });
                history.push("/workout/all")
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <form action="" className='flex flex-col justify-evenly my-2' onSubmit={submitHandler}>
            {/* Workout Name */}
            <div className='flex flex-col justify-center'>
                <label htmlFor="name" className='mb-2 self-center block text-lg font-bold text-center'>Name of Workout:</label>
                <input name='name' onChange={nameChange} type="text" placeholder="Name of Your Workout" className='mx-auto text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-3/5' />
            </div>
            <hr className='mt-3' />
            <div className='flex flex-col justify-center m-5'>
                {
                    workoutForm.workout.map((ele, i) => {
                        return (
                            <div key={i} className="w-full">
                                <select name="workouttype" onChange={(e) => typeChange(e, i)} className="mb-3 text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option none="true" value="" default></option>
                                    <option value="sets">Sets</option>
                                    <option value="circuit">Circuit</option>
                                    <option value="timedist">Time or Distance</option>
                                </select>
                                <div className='w-full flex flex-col items-center justify-center'>
                                    {formType(ele.type, i)}
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <button type='submit' className='w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>Add Workout</button>
        </form>
    );
}

export default WorkoutForm;