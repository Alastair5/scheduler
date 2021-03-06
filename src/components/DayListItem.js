import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

// Show remaining spots per day
export default function DayListItem(props) {
  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0});

    const remainingSpots = (spots) => {
      if (spots === 0) {
        return <h3 className="text--light">no spots remaining</h3>;
      }
      if (spots === 1) {
        return <h3 className="text--light">{spots} spot remaining</h3>;
      }
      if (spots > 1) {
        return <h3 className="text--light">{spots} spots remaining</h3>;
      }
    };

  return (
    <li className={dayClass}
    onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {remainingSpots(props.spots)}
    </li>
  );
}

