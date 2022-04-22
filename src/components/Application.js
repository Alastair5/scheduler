import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {getAppointmentsForDay} from '../helpers/selectors';





export default function Application() {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("");
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const setDay = (day => setState({ ...state, day }));
  

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // useEffect(() => {
  //   // const setDays = (days) => setState(prev => ({ ...prev, days }));
  //   const url = "/api/days";
  //   axios.get(url)
  //     .then((response) => {
  //       setDays(response.data);
  //       // setDay(days.name);
  //     })
  //     .catch((error) => error.message);
  // }, []);


  const appList = dailyAppointments.map((appointment) => 
    (<Appointment key={appointment.id} {...appointment}/>))


  return (
    
    <main className="layout">
      <section className="sidebar">
      <img
     className="sidebar--centered"
     src="images/logo.png"
     alt="Interview Scheduler"
      />
     <hr className="sidebar__separator sidebar--centered" />
     <nav className="sidebar__menu">
       {/* <DayList
       days={days}
       value={day}
       onChange={setDay}
       /> */}
       <DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
      />
     </nav>
     <img
       className="sidebar__lhl sidebar--centered"
       src="images/lhl.png"
       alt="Lighthouse Labs"
     />
      </section>
      <section className="schedule">
      {appList}
      <Appointment key='last' time="5pm" />
      </section>
    </main>
    
  );

}
