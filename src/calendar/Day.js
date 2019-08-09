import React from "react";
import "./Calendar.css";
import moment from "moment";

const Day = props => {
  const isBefore = props.day.isBefore(moment(), "day");
  const classNames = isBefore ? "calendar-day-disabled" : "calendar-day";
  return (
    <div className={classNames}>
      <div>
        <div className="calendar-day-num">{props.day.format("D")}</div>
        <div className="calendar-day-str">{props.day.format("ddd")}</div>
      </div>
      <div className="appointments-container">
        {props.appointments.map(appointment => {
          return (
            <li
              onClick={() => {
                props.onAppointmentSelected(appointment);
              }}
            >
              {appointment.description}, {appointment.date.format("HH:mm")}
            </li>
          );
        })}
      </div>
      {!isBefore && (
        <div className="btn-container">
          <div
            className="btn-add-appointment"
            onClick={() => {
              props.onAddPressed(props.day);
            }}
          >
            +
          </div>
        </div>
      )}
    </div>
  );
};

export default Day;
