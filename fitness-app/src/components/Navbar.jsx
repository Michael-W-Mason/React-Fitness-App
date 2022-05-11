import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline"
import { Menu } from '@headlessui/react'
import '../App.css';

const NavBar = (props) => {
    return (
        <div>
            <nav className="sticky top-0 z-50 p-2 bg-blue-700 flex items-center max-h-66">
                {/* Title of Company */}
                <div className="text-gray-200 ml-5">
                    <h1 className="font-semibold text-xl">MyWorkoutPal</h1>
                </div>
                {/* Navigation Buttons */}
                <div className="mx-auto">
                    <div className="flex items-center space-x-40 text-gray-200">
                        <Link to="/Home" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Goals</Link>
                        <Link to="/Workout" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Workout</Link>
                        <Link to="/Calendar" className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium">Schedule</Link>
                    </div>
                </div>
                {/* Profile */}
                <Menu as="div" className="mr-5">
                    <Menu.Button><UserCircleIcon className="h-10 w-10 color-white" /></Menu.Button>
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item className=""><Link as="a" to="/Profile">Your Profile <br/></Link></Menu.Item>
                        <Menu.Item className=""><Link as="a" to="/Sign_Out">Sign Out</Link></Menu.Item>
                    </Menu.Items>
                </Menu>
            </nav>
        </div>
    );
}

export default NavBar;