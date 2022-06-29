import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import axios from 'axios';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Drag from "./Drag";
import Modal from "./Modal"
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Schedule = props => {
    const { userId, serUserId } = useContext(UserContext);
    const changeClass = "w-1/5 self-center text-white bg-amber-500 hover:bg-amber-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2";
    const unChangeClass = "w-1/5 self-center text-white bg-green-500 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"

    const [workoutArr, setWorkoutArr] = useState([]);
    const [workout, setWorkout] = useState({
        workout: []
    });
    const [event, setEvent] = useState({});
    const [eventArr, setEventArr] = useState({
        events: [
        ]
    });
    const [eventArr2, setEventArr2] = useState([]);
    const [modalTrigger, setModalTrigger] = useState(false);
    const [calendarId, setCalendarId] = useState("");
    const [changes, setChanges] = useState(false);
    const [countChanges, setCountChanges] = useState(0);
    const [firstUser, setFirstUser] = useState(false);


    useEffect(() => {
        if (userId) {
            axios.get(`https://michaelmason.dev/api/calendar/${userId}`, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    if (res.data.calendar == null) {
                        setFirstUser(true);
                    }
                    else {
                        setEventArr(res.data.calendar);
                        setCalendarId(res.data.calendar._id);
                    }
                })
        }
    }, [userId])

    useEffect(() => {
        if (firstUser === true) {
            axios.post(`https://michaelmason.dev/api/calendar/${userId}`, {} , { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setEventArr(res.data.calendar);
                    setCalendarId(res.data.calendar._id);
                    setFirstUser(false);
                })
                .catch(err => console.log(err));
        }
    }, [firstUser])

    function getEventsArr(e) {
        if (countChanges > 1) {
            setChanges(true);
        }
        let arr = [];
        for (let eventItem of e) {
            let obj = { title: eventItem.title, start: Date.parse(eventItem.start), end: Date.parse(eventItem.end), id: eventItem.id };
            arr.push(obj);
        }
        setEventArr2(arr);
        setCountChanges(countChanges + 1);
    }

    function eventModal(e) {
        setEvent(e);
        for (let e_workout of workoutArr) {
            if (e_workout._id == e.event.id) {
                setWorkout(e_workout);
            }
        }
        setModalTrigger(true);
    }

    function submitHandler() {
        axios.put(`https://michaelmason.dev/api/calendar/${calendarId}/${userId}`, eventArr2, { withCredentials: true })
            .then(res => {
                console.log(res);
                setChanges(false);
                setCountChanges(2);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='flex flex-col p-4'>
            <Modal modalTrigger={modalTrigger} setModalTrigger={setModalTrigger} workout={workout} event={event} />
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                height="65vh"
                aspectRatio="0.2"
                themeSystem='bootstrap5'
                expandRows={true}
                allDaySlot={false}
                slotDuration='04:00:00'
                slotLabelInterval='00:00:00'
                droppable={true}
                eventOverlap={false}
                editable={true}
                displayEventTime={false}
                eventClick={(e) => eventModal(e)}
                eventsSet={(e) => getEventsArr(e)}
                eventBackgroundColor={"rgb(26 86 219)"}
                events={eventArr}
            />
            <Drag workoutArr={workoutArr} setWorkoutArr={setWorkoutArr} />
            <button className={changes ? unChangeClass : changeClass} onClick={submitHandler}>{changes ? "Save Changes" : "Changes Saved"}</button>
        </div>

    );
}

export default Schedule;