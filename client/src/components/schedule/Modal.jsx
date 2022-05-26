import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import SetRepCard from '../workout/SetRepCard';
import CircuitCard from '../workout/CircuitCard';
import TimeDistCard from '../workout/TimeDistCard';

const Modal = (props) => {
    function closeModal() {
        props.setModalTrigger(false);
    }

    function parseWorkout(obj) {
        switch (obj.type) {
            case "sets": return <SetRepCard workout={obj}/>;
            case "circuit" : return <CircuitCard workout={obj}/>;
            case "timedist" : return <TimeDistCard workout={obj}/>;
            default : return <></>;
        }
    }

    return (
        <Popup
            open={props.modalTrigger}
            onClose={() => props.modalTrigger}
            modal
        >
            <div className="fixed flex -translate-x-1/2 -translate-y-1/2 w-full h-full bg-slate-200/50">
                <div className="w-1/5 flex flex-col items-center justify-center self-center mb-40 mx-auto bg-white p-14 border-2 border-gray-100 shadow-md mt-6 font-bold">
                    <button onClick={closeModal} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full relative self-start -translate-x-6 -translate-y-6'>X</button>
                    <h1 className='p-2 text-blue-700 text-lg'>{props.workout.name}</h1>
                    {
                        props.workout.workout.map((ele, i) => {
                            return(
                                <div key={i}>
                                    {parseWorkout(ele)}
                                    <hr className="m-2"/>
                                </div>
                            )
                        })
                    }
                    <button className='mt-3 text-white w-2/5 bg-red-500 hover:bg-red-800 focus:outline-none font-medium rounded-full text-sm px-2 py-1 text-center' onClick={() => {props.event.event.remove(); closeModal();}}>Remove Event</button>
                </div>
            </div>
        </Popup>
    )
};

export default Modal;