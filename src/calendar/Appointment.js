import React from "react";
import "./Appointment.css";

class Appointment extends React.Component {
  constructor(props) {
    super(props);
    let startTime = "00:00";
    let description = "";
    if (props.appointment) {
      startTime = props.appointment.date.format("HH:mm");
      description = props.appointment.description;
    }
    this.state = {
      startTime,
      description
    };
  }
  getHours = () => {
    let times = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        times.push("0" + i + ":00");
      } else {
        times.push(i + ":00");
      }
    }
    return times;
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  handleSubmitForm = event => {
    event.preventDefault();
    if (this.state.description.length === 0) {
      alert("Please add appointment description");
      return;
    }
    const appointmentDate = this.props.selectedDay.clone();
    let timeArray = this.state.startTime.split(":");
    appointmentDate.set({
      hour: Number(timeArray[0]),
      minutes: Number(timeArray[1])
    });

    if (this.props.appointment) {
      const newAppointment = {
        ...this.props.appointment,
        description: this.state.description,
        date: appointmentDate
      };
      this.props.onUpdateAppointment(newAppointment);
    } else {
      const newAppointment = {
        id: Math.random()
          .toString(36)
          .substr(2, 6),
        description: this.state.description,
        date: appointmentDate
      };
      this.props.onSetAppointment(newAppointment);
    }
  };

  handleTimeChange = event => {
    this.setState({ startTime: event.target.value });
  };

  render() {
    const appointmentDay = this.props.selectedDay.format("LL");
    return (
      <div className="appointment-view">
        <div className="appointment-container">
          <form className="appointment-form" onSubmit={this.handleSubmitForm}>
            <label>{appointmentDay}</label>
            <label className="form-input">
              Time
              <select
                value={this.state.startTime}
                onChange={this.handleTimeChange}
              >
                {this.getHours().map(hour => {
                  let selectedValue = hour === this.state.startTime;
                  return (
                    <option selected={selectedValue} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="form-input">
              Description
              <input
                value={this.state.description}
                type="textarea"
                onChange={this.handleDescription}
              />
            </label>
            <div className="appointment-buttons-container">
              <input type="submit" value="Save" />
              {this.props.appointment && (
                <input
                  type="button"
                  value="Delete"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Are you sure you want to delete your appointment?"
                    );
                    if (confirm) {
                      this.props.onDeleteAppointment(this.props.appointment);
                    }
                  }}
                />
              )}
            </div>
          </form>
          <div className="close-button" onClick={this.props.onClose}>
            X
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;
