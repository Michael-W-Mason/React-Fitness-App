import axios from "axios";
import { useEffect, useState } from "react";
import CircuitCard from "./CircuitCard";
import SetRepCard from "./SetRepCard";
import TimeDistCard from "./TimeDistCard";
import { Link } from "react-router-dom";
import { CogIcon } from "@heroicons/react/outline";

const WorkoutList = props => {

    const [workoutList, setWorkoutList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/workouts")
            .then(res => {
                console.log(res);
                setWorkoutList(res.data.workout)
            })
    }, [])

    function parseWorkout(obj) {
        switch (obj.type) {
            case "sets": return <SetRepCard workout={obj}/>;
            case "circuit" : return <CircuitCard workout={obj}/>;
            case "timedist" : return <TimeDistCard workout={obj}/>;
        }
    }

    return (
        <div className="flex flex-col items-center mt-2 gap-4 text-center">
            {
                workoutList.map((ele, i) => {
                    return (
                        <div key={i} className="border shadow-md w-2/5 text-base text-gray-900 font-bold flex flex-col justify-center hover:ring-blue-500 hover:border-blue-500">
                            <Link className="self-end -translate-x-2 translate-y-2" to={`/workout/edit/${ele._id}`}><CogIcon className="h-6 w-6  hover:text-blue-500 focus:text-blue-500" /></Link>
                            <h1 className="m-2 p-2 text-blue-700 text-lg">{ele.name}</h1>
                            <hr className="m-2" />
                            <div>
                                {
                                    ele.workout.map((arr, i) => {
                                        return (
                                            <div key={i} className="">
                                                {parseWorkout(arr)}
                                                <hr className="m-2"/>
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
    )
}

export default WorkoutList;