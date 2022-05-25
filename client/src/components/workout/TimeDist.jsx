import { useEffect, useState } from "react";

const TimeDist = props => {
    const defaultTimeDistance = { duration: 0, movement: "", units: "", type: "timedist" };
    const [timeDistWorkout, setTimeDistWorkout] = useState({...props.workoutForm.workout[props.index], defaultTimeDistance});

    useEffect(() => {
        let temp = structuredClone(props.workoutForm);
        temp.workout[props.index] = timeDistWorkout;
        props.setWorkoutForm(temp);
    }, [timeDistWorkout])

    function changeHandler(e) {
        e.preventDefault();
        setTimeDistWorkout({
            ...timeDistWorkout,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="flex flex-row gap-2 mb-3">
            <input defaultValue={props.workoutForm.workout[props.index].movement} type="text" name="movement" onChange={changeHandler} placeholder="Movement" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input defaultValue={props.workoutForm.workout[props.index].duration} type="number" name="duration" onChange={changeHandler} placeholder="Distance / Time" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input defaultValue={props.workoutForm.workout[props.index].units} type="text" name="units" onChange={changeHandler} placeholder="Units" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
    );
}

export default TimeDist;