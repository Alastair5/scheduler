import { useState, useEffect } from "react";
import axios from 'axios';


export default function useApplicationData() {
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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
  return { bookInterview, cancelInterview, state, setDay};


  function remainingSpots(newApp) {
    console.log("newApp:", newApp);
    return state.days.map((day, index) => {
      let openSpots = 0;
      for (let id of state.days[index].appointments) {
        if (newApp[id].interview === null) {
          openSpots ++;
        }
      } 
      const remainingSpots = {...day, spots: openSpots}
      // console.log(remainingSpots);
      return remainingSpots;
    })
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.resolve(axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => setState({...state, appointments, days: remainingSpots(appointments)})))
  }
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.resolve(axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => setState({...state, appointments, days: remainingSpots(appointments)})))
  };
};