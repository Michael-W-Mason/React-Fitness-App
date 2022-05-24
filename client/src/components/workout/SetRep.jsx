import { useEffect, useState } from "react";

const SetRep = props => {
    const defaultStep = { movement: "", sets: 0, reps: 0 };
    const defaultRepSet = { type: "sets", steps: [defaultStep] };
    const [repSetWorkout, setRepSetWorkout] = useState(defaultRepSet);

    useEffect(() => {
        let beforeArr = props.workoutForm.workout.slice(0, props.index);
        let afterArr = props.workoutForm.workout.slice(props.index + 1, props.workoutForm.workout.length);
        props.setWorkoutForm({
            ...props.workoutForm,
            workout: [...beforeArr, repSetWorkout, ...afterArr]
        })
    }, [repSetWorkout])

    function changeHandler(e, index) {
        e.preventDefault();
        let startHalf = repSetWorkout.steps.slice(0, index);
        let endHalf = repSetWorkout.steps.slice(index + 1, repSetWorkout.steps.length);
        let current = repSetWorkout.steps[index];
        current = {
            ...current,
            [e.target.name]: e.target.value
        };
        setRepSetWorkout((p) => ({
            ...p,
            steps: [...startHalf, current, ...endHalf]
        }))
        stepChange(e, index)       
    }

    function stepChange(e, index) {
        e.preventDefault();
        if (index === repSetWorkout.steps.length - 1) {
            setRepSetWorkout((p) => ({
                ...p,
                steps: [...p.steps, defaultStep]
            }));
        }
    }

    return (
        <div>
            {
                repSetWorkout.steps.map((ele, i) => {
                    return (
                        <div key={i} className="flex flex-row mb-3 gap-2">
                            <input type="text" name="movement" placeholder="Movement Name" onChange={(e) => changeHandler(e, i)} className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            <input type="number" name="sets" placeholder="Sets" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)}/>
                            <p className="text-center self-center text-base text-gray-900">x</p>
                            <input type="number" name="reps" placeholder="Reps" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)}/>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SetRep;