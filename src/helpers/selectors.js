export function getAppointmentsForDay(state, day) {
  const result = [];
  if (state.days.length !== 0) {
    const findDay = state.days.find(dayArray => dayArray.name === day);
      if(findDay) {
        for (const id of findDay.appointments) {
          result.push(state.appointments[id]);
        };
      }
    }
    return result;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];

  if (state.days.length !== 0) {
  const dayFor = state.days.find(dayArray => dayArray.name === day);
    if(dayFor) {
      for (const interviewer of dayFor.interviewers) {
        interviewers.push(state.interviewers[interviewer]);
      };
    }
  }
  return interviewers;

};
