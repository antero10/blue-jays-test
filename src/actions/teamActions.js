import { FETCH_TEAMS, FETCH_TEAM, FETCH_ROSTER, FETCH_GAMES } from './types';
import { mlbService } from '../services';

export const fetchTeams = ()  => dispatch => {
    mlbService.get('teams').then((response) => {
        dispatch({
            type: FETCH_TEAMS,
            payload: response.data,
        });
    });
};

export const fetchTeam = (id) => dispatch => {
    mlbService.get(`teams/${id}`).then((response) => {
        dispatch({
            type: FETCH_TEAM,
            payload: response.data
        });
    });
};

export const fetchRoster = (id) => dispatch => {
    mlbService.get(`teams/${id}/roster`).then((response) => {
        dispatch({
            type: FETCH_ROSTER,
            payload: response.data
        });
    });
};


export const fetchTeamGamesData = (sportId, teamId, startDate = '01/01/2019', endDate = '12/31/2019') => dispatch => {
    mlbService.get('schedule', {
        params: {
            sportId,
            teamId,
            startDate,
            endDate
        }
    }).then((response) => {
        dispatch({
            type: FETCH_GAMES,
            payload: response.data
        });
    });
};