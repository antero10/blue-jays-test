import * as moment from 'moment';
import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import { fetchTeamGamesData, fetchTeam, fetchRoster } from '../../actions/teamActions';
import BarChart from '../BarChart';
import { withRouter } from 'react-router-dom';
import './Dashboard.css';

const columns = [
    {
      name: 'Name',
      selector: 'person.fullName',
      sortable: true,
    },
    {
      name: 'Jersey number',
      selector: 'jerseyNumber',
      sortable: true,
      format(row) {
        return row.jerseyNumber ? row.jerseyNumber : 'NA';
      }
    },
    {
      name: 'Position',
      selector: 'position.name',
      sortable: true
    }
];

class Dashboard extends Component {

    constructor(history) {
        super();
        
        this.state = {
            roster: [],
            team: {},
            games: [],
            data: {
                datasets: [],
                labels: [],
            }
        };
        fetchTeam(history.match.params.id).then((team) => {
            this.setState({
                team
            });

            fetchRoster(team.id).then((roster) => {
                this.setState({
                    roster
                });
            });

            fetchTeamGamesData(team.sport.id, team.id).then((games) => {
                const _this = this;
                const gamesWins = games.reduce((previousGame, currentGame) => {
                    return this.getGameResults(previousGame, currentGame, _this);
                    
                }, {});
                const gameLost = games.reduce((previousGame, currentGame) => {
                    return this.getGameResults(previousGame, currentGame, _this, false);
                }, {});
                const datasets = ['Wins', 'Loose'].map((title) => {
                    return {
                        label: title,
                        data: title === 'Wins' ? Object.values(gamesWins) : Object.values(gameLost), 
                        backgroundColor: title === 'Wins' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    }
                });
                const labels = Object.keys(gamesWins);
                this.setState({
                    games,
                    data: {
                        labels,
                        datasets
                    }
                });
            });
            
        });
        
        
    }
    render() {
        if (this.state.roster && this.state.roster.length > 0) {
            return (
                <div className="container-data" style={{
                    "backgroundImage": `linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.92)), url(https://www.mlbstatic.com/team-logos/${this.state.team.id}.svg)`
                }}>
                    <div  className="graph card">
                        <BarChart
                            labels={this.state.data.labels}
                            datasets={this.state.data.datasets}
                            width="300"
                            height="300"
                        />
                    </div>
                    <div className="flex">
                        <div className="card col-6 flex">
                            <DataTable
                                className="data-table"
                                title="Roster"
                                columns={columns}
                                data={this.state.roster}
                            />
                        </div>
                        <div className="card col-6 flex">3</div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                </div>
            )
        }
    }

    onRowClicked() {
        console.log('clicked');
    }
    componentDidUpdate() {
        if (this.state.games && this.state.games.length > 0) {
            
            
        }
    }

    getGameResults(previousGame, currentGame, _this, isWinning = true) {
        if (!previousGame[moment(currentGame.date).format('MMMM')]) {
            previousGame[moment(currentGame.date).format('MMMM')] = 0;
        }
        currentGame.games.forEach((game) => {
            const gameTeamInfo = game.teams.away.team.id === _this.state.team.id ? game.teams.away : game.teams.home;
            previousGame[moment(currentGame.date).format('MMMM')] = previousGame[moment(currentGame.date).format('MMMM')] + ((gameTeamInfo.isWinner === isWinning) ? 1 : 0)
        });
        return previousGame;
    }
}
export default withRouter(Dashboard);