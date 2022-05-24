import axios from "axios";
import { useEffect, useState } from "react";

const WorkoutList = props => {

    const [workoutList, setWorkoutList] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/workouts")
            .then(res => {
                console.log(res);
                setWorkoutList(res.data.workout)
            })
    }, [])
    
    return(
        <div className="flex flex-col items-center mt-2">
            {
                workoutList.map((ele, i) => {
                    return(
                        <div key={i}>
                            <h1>{ele.name}</h1>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default WorkoutList;