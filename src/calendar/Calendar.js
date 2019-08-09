import React from "react";
import moment from "moment";
import Day from "./Day";
import Appointment from "./Appointment";
import "./Calendar.css";
import { connect } from "react-redux";
import {
  addAppointment,
  deleteAppointment,
  updateAppointment
} from "../redux/actions";

class Calendar extends React.Component {
  constructor() {
    super();
    let currentDate = moment();
    this.state = {
      currentDate,
      currentMonthName: currentDate.format("MMMM"),
      currentMonthDaysArr: this.getDaysOfMonth(currentDate),
      selectedDay: null,
      selectedAppointment: null
    };
  }

  getDaysOfMonth = currentDate => {
    let daysInMonth = currentDate.daysInMonth();
    let daysArr = [];

    while (daysInMonth) {
      let current = moment(currentDate).date(daysInMonth);
      daysArr.unshift(current);
      daysInMonth--;
    }

    return daysArr;
  };

  onAddPressed = day => {
    this.setState({ selectedDay: day });
  };

  onClose = () => {
    this.setState({ selectedDay: null, selectedAppointment: null });
  };

  addNewAppointment = newAppointment => {
    const appointmentExists = this.props.appointmentsArray.some(appointment => {
      return appointment.date.isSame(newAppointment.date, "hour");
    });

    if (appointmentExists) {
      alert("You already have an appointment scheduled for that time");
    } else {
      this.props.addNewAppointment(newAppointment);
      this.onClose();
    }
  };

  onAppointmentSelected = appointment => {
    this.setState({
      selectedDay: appointment.date,
      selectedAppointment: appointment
    });
  };

  onDeleteAppointment = appointment => {
    this.props.deleteAppointment(appointment);
    this.onClose();
  };

  onUpdateAppointment = appointment => {
    this.props.updateAppointment(appointment);
    this.onClose();
  };

  getNextMonth = () => {
    const nextMonth = this.state.currentDate.add(1, "months");
    this.setState({
      currentDate: nextMonth,
      currentMonthName: nextMonth.format("MMMM"),
      currentMonthDaysArr: this.getDaysOfMonth(nextMonth)
    });
  };

  getPrevMonth = () => {
    const prevMonth = this.state.currentDate.subtract(1, "months");
    this.setState({
      currentDate: prevMonth,
      currentMonthName: prevMonth.format("MMMM"),
      currentMonthDaysArr: this.getDaysOfMonth(prevMonth)
    });
  };

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <div>{this.state.currentMonthName}</div>
          <div className="calendar-header-buttons">
            <div className="calendar-header-button" onClick={this.getPrevMonth}>
              <span class="left" />
            </div>
            <div onClick={this.getNextMonth}>
              <span class="right" />
            </div>
          </div>
        </div>
        <div className="calendar-content">
          <div className="calendar-days-container">
            {this.state.currentMonthDaysArr.map(day => {
              const dayAppointments = this.props.appointmentsArray.filter(
                appointment => {
                  return appointment.date.isSame(day, "day");
                }
              );
              return (
                <Day
                  day={day}
                  onAddPressed={this.onAddPressed}
                  appointments={dayAppointments}
                  addNewAppointment={this.addNewAppointment}
                  onAppointmentSelected={this.onAppointmentSelected}
                />
              );
            })}
          </div>
        </div>
        {this.state.selectedDay && (
          <Appointment
            selectedDay={this.state.selectedDay}
            onClose={this.onClose}
            onSetAppointment={this.addNewAppointment}
            appointment={this.state.selectedAppointment}
            onDeleteAppointment={this.onDeleteAppointment}
            onUpdateAppointment={this.onUpdateAppointment}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    appointmentsArray: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewAppointment: newAppointment =>
      dispatch(addAppointment(newAppointment)),
    deleteAppointment: appointment => dispatch(deleteAppointment(appointment)),
    updateAppointment: appointment => dispatch(updateAppointment(appointment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
