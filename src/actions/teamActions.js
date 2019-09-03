import { mlbService } from '../services';

export const fetchTeams = async () => {
    try {
        const response = await mlbService.get('teams', {
            params: {
                sportId: 1
            }
        });
        return response.data.teams;   
    } catch (e) {
        throw new Error(e);
    }
}
export const fetchTeam = async (id)  => {
    try {
        console.log(id);
        const response = await mlbService.get(`teams/${id}`, {
            params: {
                sportId: 1
            }
        });
        return response.data.teams[0];
    } catch (e) {
        throw new Error(e);
    }

};

export const fetchRoster = async (id)  => {
    try {
        const response = await mlbService.get(`teams/${id}/roster`, {
            params: {
                sportId: 1
            }
        });
        return response.data.roster;   
    } catch (e) {
        throw new Error(e);
    }
};


export const fetchTeamGamesData = async (sportId, teamId, startDate = '01/01/2019', endDate = '12/31/2019') => {
    try {
        const response = await mlbService.get('schedule', {
            params: {
                sportId,
                teamId,
                startDate,
                endDate,
                gameType: 'R'
            }
        });
        return response.data.dates;
    } catch (e) {
        throw new Error(e);
    }
};

export const fetchPlayer = async (id) => {
    try {
        const response = await mlbService.get(`people/${id}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`);
        return response.data.people[0];
    } catch (e) {
        throw new Error(e);
    }
} 