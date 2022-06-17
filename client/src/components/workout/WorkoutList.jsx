import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import CircuitCard from "./CircuitCard";
import SetRepCard from "./SetRepCard";
import TimeDistCard from "./TimeDistCard";
import { useHistory, Link } from "react-router-dom";

const WorkoutList = props => {

    const {userId, setUserId} = useContext(UserContext);
    const [workoutList, setWorkoutList] = useState([]);
    const history = useHistory()

    useEffect(() => {
        if(userId){
            axios.get(`http://localhost:8000/api/workouts/${userId}`, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setWorkoutList(res.data.workout)
                })
        }
    }, [userId])

    function parseWorkout(obj) {
        switch (obj.type) {
            case "sets": return <SetRepCard workout={obj} />;
            case "circuit": return <CircuitCard workout={obj} />;
            case "timedist": return <TimeDistCard workout={obj} />;
        }
    }

    function redirectToEdit(e, id) {
        history.push(`/workout/edit/${id}`)
    }

    return (
        <>
            <div className="flex flex-col items-center my-4 sticky">
                <Link className="text-white bg-amber-500 hover:bg-amber-800 px-4 py-2 rounded-lg" to="/workout/add">Click Here to Add a New Workout</Link>
            </div>
            <hr />
            <div className="flex flex-col items-center gap-4 text-center">
                {
                    workoutList.map((ele, i) => {
                        return (
                            <div onClick={(e) => redirectToEdit(e, ele._id)} key={i} className="cursor-pointer my-2 border shadow-md w-2/5 text-base text-gray-900 font-bold flex flex-col justify-center hover:ring-blue-500 hover:border-blue-500">
                                <h1 className="m-2 p-2 text-blue-700 text-lg">{ele.name}</h1>
                                <hr className="m-2" />
                                <div>
                                    {
                                        ele.workout.map((arr, i) => {
                                            return (
                                                <div key={i} className="">
                                                    {parseWorkout(arr)}
                                                    <hr className="m-2" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default WorkoutList;