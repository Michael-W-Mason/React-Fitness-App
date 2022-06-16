import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { CogIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Goals = (props) => {


    const [goalObj, setgoalObj] = useState([])
    const [formData, setFormData] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(true);
    const [changeArr, setChangeArr] = useState([]);

    const updateClassChange = "text-white bg-amber-500 hover:bg-amber-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    const updateClassUnChange = "text-white bg-green-500 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"

    useEffect(() => {
        if (formSubmitted) {
            axios.get("http://localhost:8000/api/goals", { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setgoalObj(res.data.goal);
                    if (changeArr.length < 1) {
                        setChangeArr(res.data.goal.map(() => false));
                    }
                    setFormData(res.data.goal);
                })
                .catch(err => {
                    console.log(err);
                });
            setFormSubmitted(false);
        }
    }, [formSubmitted])

    function submitHandler(e, index) {
        e.preventDefault();
        console.log({ ...formData[index] });
        axios.put(`http://localhost:8000/api/goals/${formData[index]._id}`, { ...formData[index] }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setFormData({});
                let arr = [...changeArr];
                arr[index] = false;
                setChangeArr(arr);
                setFormSubmitted(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function changeHandler(e, index) {
        e.preventDefault();
        let items = [...goalObj];
        let item = { ...items[index] };
        let data = [...item.data];
        let arr = [...changeArr];
        arr[index] = true;
        setChangeArr(arr);
        data[data.length] = ({ val: parseFloat(e.target.value), updatedAt: Date.now() });
        item.data = data;
        items[index] = item;
        setFormData(items);
    }

    return (
        <>
            <div className="flex flex-col items-center my-4 sticky">
                <Link className="text-white bg-amber-500 hover:bg-amber-800 px-4 py-2 rounded-lg" to="/goals/add">Click Here to Add a New Goal</Link>
            </div>
            <hr />
            {
                goalObj.map((val, i) => {
                    return (
                        <div className="flex flex-row mx-auto my-4 container border-2 shadow-md p-4 rounded-lg gap-2" key={i}>
                            <div className="w-full">
                                <LineChart data={val.data} goal={val.goal} unit={val.unit} />
                            </div>
                            <div className="p-4 border-l-2 flex flex-col items-center justify-around gap-5">
                                <Link className="self-end relative translate-x-2 -translate-y-12" to={`/goals/edit_goal/${val._id}`} ><CogIcon className="h-6 w-6  hover:text-blue-500 focus:text-blue-500" /></Link>
                                <h3 className='block text-2xl font-bold text-blue-700'>{val.name}</h3>
                                <form className='flex flex-col items-center gap-5' onSubmit={(e) => submitHandler(e, i)}>
                                    <label htmlFor="val" className="block text-lg font-bold">Log Goal:</label>
                                    <div className="flex flex-row items-center justify-center text">
                                        <input defaultValue={val.data.length ? val.data[val.data.length - 1].val : ""} type="number" name="val" className="p-2 text-gray-900 border-y border-l text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)} />
                                    </div>
                                    <button type='submit' className={changeArr[i] ? updateClassChange : updateClassUnChange}>{changeArr[i] ? "Update Goal" : "No Changes"}</button>
                                </form>
                            </div>
                        </div >
                    );
                })
            }
        </>

    )
}

export default Goals;