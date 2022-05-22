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
        <form action="" className='flex flex-col justify-evenly'>
            {/* Workout Name */}
            <div className='flex flex-col justify-center'>
                <label htmlFor="workoutname" className='mb-2 self-center block text-lg font-bold text-center'>Name of Workout:</label>
                <input name='workoutname' type="text" placeholder="Name of Your Workout" className='mx-auto text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-3/5' />
            </div>
            <hr className='mt-3'/>
            <div className='flex flex-col justify-center m-5'>
                {
                    workoutForm.workout.map((step, index) => {
                        return (
                            <div key={index} className="flex justify-evenly mt-2">
                                <input onChange={(e) => changeHandler(e, index)} type="text" placeholder="Movement Name" className='w-full mr-2 border text-center text-gray-900 text-base border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500' />
                                <input type="number" placeholder="Sets" className='w-auto border text-center text-gray-900 text-base border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'/>
                                <h1 className='text-center w-1/12 mt-2'>x</h1>
                                <input type="number" placeholder="Reps" className='w-auto border text-center text-gray-900 text-base border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500'/>
                            </div>
                        )
                    })
                }
            </div>
            <button type='submit' className='w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>Add Workout</button>
        </form>
    );
}

export default WorkoutForm;