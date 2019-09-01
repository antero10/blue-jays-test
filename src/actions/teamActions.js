import {FETCH_TEAMS} from './types';
import {mlbService} from '../services';

export const fetchTeams = ()  => dispatch => {
    mlbService.get('teams').then((teams) => {
        dispatch({
            type: FETCH_TEAMS,
            payload: teams.data,
        });
    });
}