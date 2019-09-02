import { FETCH_TEAMS, FETCH_TEAM, FETCH_ROSTER} from './types';
import { mlbService } from '../services';

export const fetchTeams = ()  => dispatch => {
    mlbService.get('teams').then((teams) => {
        dispatch({
            type: FETCH_TEAMS,
            payload: teams.data,
        });
    });
}

export const fetchTeam = (id) => dispatch => {
    mlbService.get(`teams/${id}`).then((team) => {
        dispatch({
            type: FETCH_TEAM,
            payload: team.data
        });
    });
}

export const fetchRoster = (id) => dispatch => {
    mlbService.get(`teams/${id}/roster`).then((roster) => {
        dispatch({
            type: FETCH_ROSTER,
            payload: roster.data
        });
    });
}