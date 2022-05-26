import { Link, useHistory } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline"
import '../App.css';

const NavBar = (props) => {

    const history = useHistory()
    function toSchedule(){
        history.push("/schedule")
    }
    
    return (
        <nav className="sticky flex items-center top-0 z-50 p-4 bg-blue-700 min-h-66">
            {/* Title of Company */}
            <div className="text-gray-200 mx-5 justify-self-start whitespace-nowrap">
                <h1 className="select-none font-semibold text-xl">MyWorkoutPal 🏋️‍♂️</h1>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-center absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-20 text-gray-200">
                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownGoal" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Goals 🤩</button>
                    <div id="dropdownGoal" className="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded shadow w-44">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                            <li>
                                <Link to="/goals" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/goals/add_goal" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add a Goal</Link>
                            </li>
                        </ul>
                    </div>
                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownWorkout" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Workout 💪</button>
                    <div id="dropdownWorkout" className="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded shadow w-44">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                            <li>
                                <Link to="/workout/create" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create a Workout</Link>
                            </li>
                            <li>
                                <Link to="/workout/all" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Your Workouts</Link>
                            </li>
                        </ul>
                    </div>
                    <button className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium" onClick={toSchedule}>Schedule 📅</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;