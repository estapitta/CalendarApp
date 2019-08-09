import {
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT
} from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return [...state, action.appointment];
    case DELETE_APPOINTMENT: {
      const newState = state.filter(appointment => {
        return appointment.id !== action.appointment.id;
      });
      return newState;
    }
    case UPDATE_APPOINTMENT: {
      const newState = state.map(appointment => {
        if (appointment.id === action.appointment.id) {
          return action.appointment;
        } else {
          return appointment;
        }
      });
      return newState;
    }
    default:
      return state;
  }
};
