import { Link, useHistory } from "react-router-dom";
import '../App.css';
import axios from "axios";

const NavBar = (props) => {

    const history = useHistory()
    function logout(){
        localStorage.clear();
        axios.get("http://localhost:3001/api/logout", {withCredentials: true})
            .then(res => history.push("/"))
            .catch(err => console.log(err));
        
    }

    return (
        <nav className="sticky flex items-center justify-between top-0 z-50 p-4 bg-blue-700 h-66">
            {/* Title of Company */}
            <div className="text-gray-200 mx-5 justify-self-start whitespace-nowrap">
                <h1 className="select-none font-semibold text-xl">MyWorkoutPal 🏋️‍♂️</h1>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-center absolute left-1/2 -translate-x-1/2 ">
                <div className="flex items-center gap-20 text-gray-200">
                    <Link className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/goals">Goals 🤩 </Link>
                    <Link className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/workout">Workout 💪 </Link>
                    <Link className="hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-base font-medium" to="/schedule">Schedule 📅 </Link>
                </div>
            </div>
            <Link onClick={logout} className="hover:bg-blue-600 hover:text-white text-gray-200 px-3 py-2 rounded-md text-base font-medium mr-2" to="/">Log Out</Link>
        </nav>
    );
}

export default NavBar;