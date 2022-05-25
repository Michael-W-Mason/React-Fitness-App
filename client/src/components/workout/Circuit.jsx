import { useEffect, useState } from "react";

const Circuit = props => {
    const _ = require("lodash");
    const defaultStep = { movement: "", reps: "", units: ""};
    const [circuitWorkout, setCircuitWorkout] = useState(props.workoutForm.workout[props.index]);

    useEffect(() => {
        let temp = structuredClone(circuitWorkout);
        temp.steps.push({...defaultStep, _id : props.ObjectId()});
        setCircuitWorkout(temp);
    }, [])

    useEffect(() => {
        let temp = structuredClone(props.workoutForm);
        temp.workout[props.index] = circuitWorkout;
        props.setWorkoutForm(temp);
    }, [circuitWorkout])

    function roundHandler(e){
        setCircuitWorkout({...circuitWorkout, [e.target.name] : e.target.value})
    }

    function changeHandler(e, index) {
        let temp = structuredClone(circuitWorkout);
        let current = temp.steps[index];
        current[e.target.name] = e.target.value;
        if(index === temp.steps.length - 1){
            temp.steps.push({...defaultStep, _id : props.ObjectId()});
        }
        if(_.isEqual(current, {...defaultStep, _id : current._id})){
            temp.steps.splice(index, 1);
        }
        setCircuitWorkout(temp);      
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2 mb-3">
            <div className="mb-2 flex flex-row items-center justify-center gap-2">
                <label  htmlFor="rounds" className="text-gray-900 text-base">Number of Rounds:</label>
                <input defaultValue={circuitWorkout.rounds} onChange={roundHandler} type="number" name="rounds" placeholder="Number of Rounds" className=" text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            {
                circuitWorkout.steps.map((ele, i) => {
                    return(
                        <div key={ele._id} className="flex flex-row gap-2">
                            <input defaultValue={ele.movement} type="text" name="movement" placeholder="Movement Name" onChange={(e) => changeHandler(e, i)} className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            <input defaultValue={ele.reps} type="number" onChange={(e) => changeHandler(e, i)} name="reps" placeholder="Reps" className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                            <input defaultValue={ele.units} type="text" onChange={(e) => changeHandler(e, i)} name="units" placeholder="Units" className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Circuit;