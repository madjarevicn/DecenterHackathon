import {
  TEAM_UP,
  TEAM_DOWN,
  TEAMS_FETCH,
  TEAMS_SUCCESS,
  TEAMS_ERROR,
  ADD_TEAM,
  ADD_TEAM_ERROR,
  ADD_TEAM_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  teams: [],
  submitting: false,
  addTeamError: false,
  error: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TEAMS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case TEAMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        teams: action.teams,
        error: false,
      };

    case TEAMS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case ADD_TEAM:
      return {
        ...state,
        submitting: true
      };

    case ADD_TEAM_SUCCESS:
      return {
        ...state,
        submitting: false,
        addTeamError: false,
        teams: [...state.teams, action.payload.team]
      };

    case ADD_TEAM_ERROR:
      return {
        ...state,
        submitting: false,
        addTeamError: action.payload.addTeamError
      };

    case TEAM_UP:
      return {
        ...state,
        teams: [
          ...state.teams.slice(0, action.index - 1),
          state.teams[action.index],
          state.teams[action.index - 1],
          ...state.teams.slice(action.index + 1),
        ]
      };

    case TEAM_DOWN:
      return {
        ...state,
        teams: [
          ...state.teams.slice(0, action.index),
          state.teams[action.index + 1],
          state.teams[action.index],
          ...state.teams.slice(action.index + 2),
        ]
      };

    default:
      return state;
  }
};
