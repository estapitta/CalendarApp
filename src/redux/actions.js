export const ADD_APPOINTMENT = "ADD_APPOINTMENT";
export const DELETE_APPOINTMENT = "DELETE_APPOINTMENT";
export const UPDATE_APPOINTMENT = "UPDATE_APPOINTMENT";

export const addAppointment = appointment => {
  return {
    type: ADD_APPOINTMENT,
    appointment
  };
};

export const deleteAppointment = appointment => {
  return {
    type: DELETE_APPOINTMENT,
    appointment
  };
};

export const updateAppointment = appointment => {
  return {
    type: UPDATE_APPOINTMENT,
    appointment
  };
};
