import { useState } from 'react';


const WorkoutForm = (props) => {
    const defaultWorkout = [{ movement: "", sets: 0, reps: 0 }];

    const [workoutForm, setWorkoutForm] = useState({
        name: "",
        workout: defaultWorkout
    })

    const changeHandler = (e, i) => {
        if (i === workoutForm.workout.length - 1) {
            setWorkoutForm({ ...workoutForm, workout: [defaultWorkout, ...workoutForm.workout] });
        }
    }

    return (
        <form action="" className='flex-col justify-center'>
            {/* Workout Name */}
            <div className='flex-col justify-center'>
                <label htmlFor="workoutname" className='mb-2 mx-auto'>Name of Workout:</label>
                <input name='workoutname' type="text" placeholder="Name" className=''/>
            </div>
            {
                workoutForm.workout.map((step, index) => {
                    return (
                        <div key={index}>
                            <input onChange={(e) => changeHandler(e, index)} type="text" placeholder="Movement Here" />
                            <input type="number" placeholder="Sets Here" />
                            <input type="number" placeholder="Reps Here" />
                        </div>
                    )
                })
            }
            <button type='submit'>Add Workout</button>
        </form>
    );
}

export default WorkoutForm;