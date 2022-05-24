import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline"
import '../App.css';

const NavBar = (props) => {
    return (
        <nav className="sticky flex items-center top-0 z-50 p-2 bg-blue-700 min-h-66">
            {/* Title of Company */}
            <div className="text-gray-200 mx-5 w-1/3">
                <h1 className="font-semibold text-xl">MyWorkoutPal 🏋️‍♂️</h1>
            </div>
            {/* Navigation Buttons */}
            <div className="mx-auto w-1/3 flex justify-center">
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
                    <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownSchedule" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Schedule 📅</button>
                    <div id="dropdownSchedule" className="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded shadow w-44">
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                            <li>
                                <Link to="/Home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today's Workout</Link>
                            </li>
                            <li>
                                <Link to="/Home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Plan your Week</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Profile */}
            <div className="w-1/3 flex justify-end">
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownProfile" className="flex justify-end hover:text-white px-3 py-2 rounded-md mx-5"><UserCircleIcon className="h-10 w-10 color-white" /></button>
                <div id="dropdownProfile" className="z-10 hidden bg-gray-50 divide-y divide-gray-100 rounded shadow w-30 mx-5">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                        <li>
                            <Link to="/Home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Profile</Link>
                        </li>
                        <li>
                            <Link to="/Home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;