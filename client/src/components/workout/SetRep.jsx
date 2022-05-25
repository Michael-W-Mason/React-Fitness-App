import { useEffect, useState } from "react";

const SetRep = props => {
    const _ = require("lodash");
    const defaultStep = { movement: "", sets: "", reps: "" };
    const [repSetWorkout, setRepSetWorkout] = useState(props.workoutForm.workout[props.index]);

    useEffect(() => {
        let temp = structuredClone(repSetWorkout);
        temp.steps.push({...defaultStep, _id : props.ObjectId()});
        setRepSetWorkout(temp);
    }, [])

    useEffect(() => {
        let temp = structuredClone(props.workoutForm);
        temp.workout[props.index] = repSetWorkout;
        props.setWorkoutForm(temp);
    }, [repSetWorkout])

    function changeHandler(e, index) {
        let temp = structuredClone(repSetWorkout);
        let current = temp.steps[index];
        current[e.target.name] = e.target.value;
        if(index === temp.steps.length - 1){
            temp.steps.push({...defaultStep, _id : props.ObjectId()});
        }
        if(_.isEqual(current, {...defaultStep, _id : current._id})){
            temp.steps.splice(index, 1);
        }
        setRepSetWorkout(temp);      
    }

    return (
        <div>
            {
                repSetWorkout.steps.map((ele, i) => {
                    return (
                        <div key={ele._id} className="flex flex-row mb-3 gap-2">
                            <input defaultValue={ele.movement} type="text" name="movement" placeholder="Movement Name" onChange={(e) => changeHandler(e, i)} className="text-gray-900 text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            <input defaultValue={ele.sets} type="number" name="sets" placeholder="Sets" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)}/>
                            <p className="text-center self-center text-base text-gray-900">x</p>
                            <input defaultValue={ele.reps} type="number" name="reps" placeholder="Reps" className="text-gray-900 text-center text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)}/>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SetRep;