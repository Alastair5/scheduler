import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // console.log(props);
  const listOfDays = props.days.map((day, index) => {
    return (
      <DayListItem 
        key={index}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{listOfDays}</ul>
};