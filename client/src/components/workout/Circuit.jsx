import { useEffect, useState } from "react";

const Circuit = props => {
    const defaultCircuit = { rounds: 0, type:"circuit", steps: [{ movement: "", reps: 0, units: ""}] };
    const [circuitWorkout, setCircuitWorkout] = useState(defaultCircuit);

    useEffect(() => {
        let beforeArr = props.workoutForm.workout.slice(0, props.index);
        let afterArr = props.workoutForm.workout.slice(props.index + 1, props.workoutForm.workout.length);
        props.setWorkoutForm({
            ...props.workoutForm,
            workout: [...beforeArr, circuitWorkout, ...afterArr]
        })
    }, [circuitWorkout])

    function changeHandler(e, index) {
        e.preventDefault();
        let startHalf = circuitWorkout.steps.slice(0, index);
        let endHalf = circuitWorkout.steps.slice(index + 1, circuitWorkout.steps.length);
        let current = circuitWorkout.steps[index];
        current = {
            ...current,
            [e.target.name]: e.target.value
        };
        setCircuitWorkout((p) => ({
            ...p,
            steps: [...startHalf, current, ...endHalf]
        }))
        stepChange(e, index)       
    }

    function stepChange(e, index) {
        e.preventDefault();
        if (index === circuitWorkout.steps.length - 1) {
            setCircuitWorkout((p) => ({
                ...p,
                steps: [...p.steps, { movement: "", reps: 0, units: ""}]
            }));
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
            <div className="mb-2 flex flex-row items-center justify-center gap-2">
                <label htmlFor="rounds" className="text-gray-900 text-base">Number of Rounds:</label>
                <input type="number" name="rounds" placeholder="Number of Rounds" className=" text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            {
                circuitWorkout.steps.map((ele, i) => {
                    return(
                        <div key={i} className="flex flex-row gap-2">
                            <input type="text" name="movement" placeholder="Movement Name" onChange={(e) => changeHandler(e, i)} className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            <input type="number" onChange={(e) => changeHandler(e, i)} name="reps" placeholder="Reps" className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            <input type="text" onChange={(e) => changeHandler(e, i)} name="units" placeholder="Units" className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Circuit;