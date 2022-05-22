import axios from "axios";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";

const Goals = (props) => {


    const [goalObj, setgoalObj] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(true);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if(formSubmitted){
            axios.get("http://localhost:8000/api/goals")
                .then(res => {
                    console.log(res);
                    setgoalObj(res.data.goal);
                })
                .catch(err => {
                    console.log(err);
                });
            setFormSubmitted(false);
        }
    }, [formSubmitted])

    function submitHandler(e, index) {
        e.preventDefault();
        console.log({...formData[index]});
        axios.put(`http://localhost:8000/api/goals/${formData[index]._id}`, {...formData[index]})
            .then(res => {
                console.log(res);
                setFormData({});
                setFormSubmitted(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function changeHandler(e, index) {
        e.preventDefault();
        let items = [...goalObj];
        let item = {...items[index]};
        let data = [...item.data]
        data[data.length] = ({val : parseFloat(e.target.value), updatedAt : Date.now()});
        item.data = data;
        items[index] = item;
        setFormData(items);
    }

return (
    <>
        {
            goalObj.map((val, i) => {
                return (
                    <div className="flex flex-row mx-auto mt-4 w-3/5 container border-2 shadow-md p-4 rounded-lg gap-2" key={i}>
                        <div className="w-4/5">
                            <LineChart data={val.data} goal={val.goal} unit={val.unit} />
                        </div>
                        <div className="p-4 border-l-2 flex flex-col items-center justify-evenly gap-5">
                            <h3 className='block text-lg font-bold'>{val.name}</h3>
                            <form className='flex flex-col items-center gap-5' onSubmit={(e) => submitHandler(e, i)}>
                                <label htmlFor="val" className="block text-lg font-bold">Log Goal:</label>
                                <div className="flex flex-row items-center justify-center text">
                                    <input type="number" name="val" className="p-2 text-gray-900 border-y border-l text-base border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e) => changeHandler(e, i)} />
                                </div>
                                <button type='submit' className='self-center text-white bg-amber-500 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'>Update Goal</button>
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