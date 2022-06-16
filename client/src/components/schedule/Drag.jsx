import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Draggable } from "@fullcalendar/interaction";


const Drag = props => {
    useEffect(() => {
        axios.get("http://localhost:8000/api/workouts", {withCredentials: true})
            .then(res => {
                console.log(res);
                props.setWorkoutArr(res.data.workout)
            })
    }, [])

    useEffect(() => {
        if(props.workoutArr.length > 0){
            let draggableEl = document.getElementById("external-events")
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function(eventEl){
                    let title = eventEl.innerHTML;
                    let id = eventEl.id;
                    return {
                        title : title,
                        duration : "04:00:00",
                        id : id
                    };
                }
            })
        }
    }, [props.workoutArr])

    return (
        <div id="external-events" className="flex flex-row gap-10 items-center p-4 h-32 my-6 overflow-auto">
            {
                props.workoutArr.map((ele, i) => {
                    return(
                        <div id={ele._id} key={ele._id} className="flex items-center justify-center border-2 text-center rounded-md w-48 h-24 fc-event hover:border-blue-500 select-none">
                            {ele.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Drag;