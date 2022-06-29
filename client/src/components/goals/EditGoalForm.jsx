import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/outline";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const EditGoalForm = props => {
    const {userId, setUserId} = useContext(UserContext);
    const id = useParams();
    const history = useHistory();
    const [refresh, setRefresh] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        unit: "",
        goal: null,
    })
    const [goalData, setGoalData] = useState([])
    const [goalDataForm, setGoalDataForm] = useState([{
        val: null,
    }])
    const [changesArr, setChangesArr] = useState([]);
    const [mainFormChange, setMainFormChange] = useState(false);

    const dataClassUnchange = "text-white w-2/5 bg-green-500 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-2 py-1 text-center";
    const dataClassChange = "text-white w-2/5 bg-amber-500 hover:bg-amber-800 focus:outline-none font-medium rounded-full text-sm px-2 py-1 text-center"

    const mainClassChange = "w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    const mainClassUnChange = "w-1/5 self-center text-white bg-green-500 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"

    useEffect(() => {
        if(refresh && userId){
            axios.get(`https://michaelmason.dev/${id.id}/${userId}`, {withCredentials: true})
                .then(res => {
                    console.log(res);
                    setGoalData([...res.data.goal[0].data]);
                    setFormData({
                        ...formData,
                        name: res.data.goal[0].name,
                        unit: res.data.goal[0].unit,
                        goal: res.data.goal[0].goal,
                    });
                    setRefresh(false);
                })
                .catch(err => console.log(err));
        }
    }, [refresh, userId])

    useEffect(() => {
        if(goalData.length < 0){
            setChangesArr(goalData.map(() => false));
        }
    }, [goalData])


    function changeHandler(e) {
        e.preventDefault();
        setMainFormChange(true);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        axios.put(`https://michaelmason.dev/api/goals/${id.id}/${userId}`, { ...formData }, {withCredentials: true})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        history.push("/goals");
    }

    function deleteGoal() {
        axios.delete(`https://michaelmason.dev/api/goals/${id.id}/${userId}`, {withCredentials: true})
            .then(res => {
                console.log(res);
                history.push("/goals");
            })
            .catch(err => {
                console.log(err);
            })
    }

    function deleteGoalPoint(ele, i) {
        axios.delete(`https://michaelmason.dev/api/goals/data/${id.id}/${ele}`, {withCredentials: true})
            .then(res => {
                console.log(res);
                let arr = [...changesArr];
                arr.splice(i, 1);
                setChangesArr(arr);
                setGoalData(goalData.splice(i, 1));
                setRefresh(true);
            })
            .catch(err => {
                console.log(err);
            })

    }

    function goalDataChangeHandler(e, i) {
        e.preventDefault();
        let arr = [...changesArr];
        arr[i] = true;
        setChangesArr([...arr]);
        setGoalDataForm({
            ...goalDataForm,
            [e.target.name]: e.target.value
        });
    }

    function goalHandler(e, ele, i) {
        e.preventDefault();
        axios.put(`https://michaelmason.dev/api/goals/data/${id.id}/${ele}`, { ...goalDataForm }, {withCredentials: true})
            .then(res => {
                let arr = [...changesArr];
                arr[i] = false; 
                setChangesArr([...arr]);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    function formatDate(str) {
        let date = Date.parse(str);
        let dateStr = new Date(date);
        return `${dateStr.toDateString()} at ${dateStr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }

    return (
        <div className="flex flex-col max-w-5xl mx-auto">
            <TrashIcon className="absolute w-6 h-6 text-red-500 hover:text-red-700 translate-y-8 translate-x-2 cursor-pointer" onClick={deleteGoal} />
            <div className="w-full mx-auto bg-white p-14 border-2 border-gray-100 shadow-md mt-6">
                <form className='flex flex-col justify-evenly gap-10' onSubmit={submitHandler}>
                    {/* Workout Name */}
                    <div className='flex flex-row justify-center gap-5 w-full whitespace-nowrap'>
                        <label htmlFor="name" className='self-center block text-lg font-bold text-center w-auto'>Name of your goal:</label>
                        <input name='name' type="text" placeholder="Name for your Goal" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full' onChange={changeHandler} defaultValue={formData.name} />
                    </div>
                    <div className='flex flex-row justify-center gap-5 w-full whitespace-nowrap'>
                        <label htmlFor="goal" className='self-center text-lg font-bold text-center'>Goal Value:</label>
                        <input name='goal' type="number" placeholder="Your Final Goals Value" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full' onChange={changeHandler} defaultValue={formData.goal} />
                        <label htmlFor="name" className='self-center block text-lg font-bold text-center'>Units:</label>
                        <input name='unit' type="text" placeholder="Units" className='text-center self-center p-2 text-gray-900 border text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-1/5' onChange={changeHandler} defaultValue={formData.unit} />
                    </div>
                    <button type='submit' className={mainFormChange ? mainClassChange : mainClassUnChange}>{mainFormChange? "Update Goal" : "No Changes"}</button>
                </form>
            </div>
            <div className="grid grid-cols-3 text-center my-4 gap-2">
                {
                    goalData.map((ele, i) => {
                        return (
                            <div className="p-4 bg-white border-2 shadow-md" key={ele._id}>
                                <TrashIcon className="absolute w-6 h-6 text-red-500 hover:text-red-700 -translate-y-2 -translate-x-2 cursor-pointer" onClick={() => deleteGoalPoint(goalData[i]._id, i)} />
                                <form className="flex flex-col items-center text-center justify-evenly whitespace-nowrap gap-2" onSubmit={(e) => goalHandler(e, goalData[i]._id, i)}>
                                    <div className="flex flex-row gap-2 items-center justify-center">
                                        <label className="text-sm font-bold " htmlFor="val">Value:</label>
                                        <input name="val" type="number" defaultValue={goalData[i].val} onChange={(e) => goalDataChangeHandler(e, i)} className="text-center text-sm p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm">Date Created: {formatDate(goalData[i].updatedAt)}</p>
                                    </div>
                                    <button type="submit" className={changesArr[i] ? dataClassChange : dataClassUnchange}>{changesArr[i] ? "Update Point" : "No Changes"}</button>
                                </form>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EditGoalForm;