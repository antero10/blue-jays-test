import {FETCH_TEAMS, FETCH_TEAM, FETCH_ROSTER, FETCH_GAMES} from '../actions/types';


const initialState = {
    teams: [],
    team: {},
    roster: [],
    games: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAMS:
            return {
                ...state,
                teams: action.payload.teams
            }
        case FETCH_TEAM:
            return {
                ...state,
                team: action.payload.teams[0]
            }
        case FETCH_ROSTER: 
            return {
                ...state,
                roster: action.payload.roster
            }
        case FETCH_GAMES:
            return {
                ...state,
                games: action.payload.dates
            }
        default:
            return state;
    }
};