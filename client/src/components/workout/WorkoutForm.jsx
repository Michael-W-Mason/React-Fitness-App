import { useState, useEffect } from 'react';
import SetRep from './SetRep';
import Circuit from './Circuit';
import TimeDist from './TimeDist';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import NavBar from '../Navbar';


const WorkoutForm = (props) => {
    const userId = localStorage.getItem('userId');
    const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) => s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h));
    const defaultWorkoutStep = { type: "", id: ObjectId() };

    const [workoutForm, setWorkoutForm] = useState({
        name: "",
        workout: [{ ...defaultWorkoutStep, _id: ObjectId() }],
    });

    const history = useHistory();

    const id = useParams();

    useEffect(() => {
        if (id.id && userId) {
            axios.get(`http://localhost:3001/api/workouts/${id.id}/${userId}`, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    let editForm = structuredClone(res.data.workout[0]);
                    editForm.workout.push(defaultWorkoutStep);
                    setWorkoutForm(editForm);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [userId])

    function formType(type, i) {
        switch (type) {
            case "sets": return (<SetRep setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} ObjectId={ObjectId} />)
            case "circuit": return (<Circuit setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} ObjectId={ObjectId} />)
            case "timedist": return (<TimeDist setWorkoutForm={setWorkoutForm} workoutForm={workoutForm} index={i} ObjectId={ObjectId} />)
            default: return (<></>)
        }
    }

    function nameChange(e) {
        e.preventDefault();
        setWorkoutForm({ ...workoutForm, [e.target.name]: e.target.value });
    }

    function typeChange(e, index) {
        e.preventDefault();

        let temp = structuredClone(workoutForm);
        if (index === temp.workout.length - 1) {
            temp.workout.push({ ...defaultWorkoutStep, _id: ObjectId() });
        }
        if (e.target.value === "") {
            temp.workout.splice(index, 1);
            temp.workout[temp.workout.length - 1] = { ...defaultWorkoutStep, _id: ObjectId() };
        }
        else {
            if (e.target.value === "sets") {
                temp.workout[index] = { _id: ObjectId(), type: e.target.value, steps: [] };
            }
            else if (e.target.value === "circuit") {
                temp.workout[index] = { _id: ObjectId(), rounds: "", type: e.target.value, steps: [] };
            }
            else if (e.target.value === "timedist") {
                temp.workout[index] = { _id: ObjectId(), type: e.target.value };
            }
        }
        setWorkoutForm(temp);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!userId) {
            history.push("/");
        }
        let temp = structuredClone(workoutForm);
        for (let i = 0; i < temp.workout.length; i++) {
            let obj = temp.workout[i];
            if (obj.type === "") {
                temp.workout.splice(i, 1);
                i--;
            }
            else if (obj.type === "sets") {
                for (let j = 0; j < obj.steps.length; j++) {
                    let step = obj.steps[j];
                    if (step.movement === "" || step.reps === "" || step.sets === "") {
                        obj.steps.splice(j, 1);
                        j--;
                    }
                }
            }
            else if (obj.type === "circuit") {
                for (let j = 0; j < obj.steps.length; j++) {
                    let step = obj.steps[j];
                    if (step.movement === "" || step.reps === "" || step.units === "") {
                        obj.steps.splice(j, 1);
                        j--;
                    }
                }
            }
            else {
                if (obj.movement === "" || obj.duration === "" || obj.units === "") {
                    temp.workout.splice(i, 1);
                    i--;
                }
            }
        }
        temp.userId = userId;
        if (id.id) {
            axios.put(`http://localhost:3001/api/workouts/${id.id}/${userId}`, { ...temp }, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    history.push("/workout")
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            axios.post("http://localhost:3001/api/workouts", { ...temp }, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setWorkoutForm({
                        name: "",
                        workout: [{
                        }]
                    });
                    history.push("/workout")
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    function deleteWorkout(e) {
        e.preventDefault();
        axios.delete(`http://localhost:3001/api/workouts/${id.id}/${userId}`, { withCredentials: true })
            .then(res => {
                console.log(res);
                history.push("/workout");
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <NavBar />
            <form className='flex flex-col justify-evenly my-2 max-w-5xl mx-auto bg-white p-14 border-2 border-gray-100 shadow-sm' onSubmit={submitHandler}>
                <div>{id.id ? <TrashIcon className='cursor-pointer w-6 h-6 text-red-500 hover:text-red-700' onClick={deleteWorkout} /> : ""}</div>
                {/* Workout Name */}
                <div className='flex flex-col justify-center'>
                    <label htmlFor="name" className='mb-2 self-center block text-lg font-bold text-center'>Name of Workout:</label>
                    <input defaultValue={workoutForm.name} name='name' onChange={nameChange} type="text" placeholder="Name of Your Workout" className='mx-auto text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-3/5' />
                </div>
                <hr className='mt-3' />
                <div className='flex flex-col justify-center m-5'>
                    {
                        workoutForm.workout.map((ele, i) => {
                            return (
                                <div key={ele._id} className="w-full">
                                    <select defaultValue={ele.type} name="workouttype" onChange={(e) => typeChange(e, i)} className="mb-3 text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
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
                <button type='submit' className='w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>{id.id ? 'Update Workout' : 'Add Workout'}</button>
            </form>
        </>
    );
}

export default WorkoutForm;