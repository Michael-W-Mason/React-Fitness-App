import { useEffect, useState } from "react";

const TimeDist = props => {
    const defaultTimeDistance = { duration: 0, movement: "", units: "", type: "timedist" };
    const [timeDistWorkout, setTimeDistWorkout] = useState(defaultTimeDistance);

    useEffect(() => {
        let beforeArr = props.workoutForm.workout.slice(0, props.index);
        let afterArr = props.workoutForm.workout.slice(props.index + 1, props.workoutForm.workout.length);
        props.setWorkoutForm({
            ...props.workoutForm,
            workout: [...beforeArr, timeDistWorkout, ...afterArr]
        })
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
            <input type="text" name="movement" onChange={changeHandler} placeholder="Movement" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="number" name="duration" onChange={changeHandler} placeholder="Distance / Time" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            <input type="text" name="unit" onChange={changeHandler} placeholder="Units" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
    );
}

export default TimeDist;