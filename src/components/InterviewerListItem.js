import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// Each interviewer information
export default function InterviewerListItem({
  name,
  avatar,
  selected,
  setInterviewer,
}) {
  const selectedClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  return (
   
      <li className={selectedClass} onClick={setInterviewer}>
        <img className="interviewers__item-image" src={avatar} alt={name} />
        {selected && name}
      </li>
  );
}
