import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewerData => { 
    return (
      <InterviewerListItem
            key={interviewerData.id}
            name={interviewerData.name}
            avatar={interviewerData.avatar}
            id={interviewerData.id}
            selected={props.interviewer === interviewerData.id}
            setInterviewer={props.setInterviewer}
          />
    )
  })
  return <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
};