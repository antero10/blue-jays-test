import * as moment from 'moment';
import React, {Component} from 'react';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router-dom';
import { fetchTeamGamesData, fetchTeam, fetchRoster } from '../../actions/teamActions';
import BarChart from '../BarChart';
import './Dashboard.css';


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
                wins: [],
                lost: []
            }
        };
        this.fetchData(history);
        this.columns = [
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
        
        this.onRowClicked = this.onRowClicked.bind(this);
        
        
    }

    fetchData(history) {
        fetchTeam(history.match.params.id).then((team) => {
            fetchRoster(team.id).then((roster) => {
                this.setState({
                    roster
                });
            });

            fetchTeamGamesData(team.sport.id, team.id).then((games) => {
                const _this = this;
                const winGames = games.reduce((previousGame, currentGame) => {
                    return this.getGameResults(previousGame, currentGame, _this);
                    
                }, {});
                const lostGame = games.reduce((previousGame, currentGame) => {
                    return this.getGameResults(previousGame, currentGame, _this, false);
                }, {});
                const datasets = ['Wins', 'Loose'].map((title) => {
                    return {
                        label: title,
                        data: title === 'Wins' ? Object.values(winGames) : Object.values(lostGame), 
                        backgroundColor: title === 'Wins' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    }
                });
                const labels = Object.keys(winGames);
                this.setState({
                    team,
                    games,
                    data: {
                        labels,
                        datasets,
                        wins: Object.values(winGames),
                        lost: Object.values(lostGame),
                    }
                });
            });
            
        });
    }
    render() {
        if (this.state.roster && this.state.roster.length > 0) {
            const totalWins = this.state.data.wins.length > 0 ? this.state.data.wins.reduce((total, num) => total + num) : 0;
            const totalLost = this.state.data.lost.length > 0 ? this.state.data.lost.reduce((total, num) => total + num) : 0;

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
                                columns={this.columns}
                                data={this.state.roster}
                                onRowClicked={this.onRowClicked}
                            />
                        </div>
                        <div className="card col-6 ">
                            <div className="text-center container-infon-number">
                                <h1 className="m-0 font-size-90"> 
                                    {this.state.games.length}
                                </h1>
                                <p className="m-0 text-center"> 
                                    Total Games
                                </p>
                            </div>
                            <div className="text-center container-infon-number">
                                <h1 className="m-0 font-size-90 text-primary"> 
                                   {totalWins}
                                </h1>
                                <p className="m-0 text-center"> 
                                    Total Wins
                                </p>
                            </div>
                            <div className="text-center container-infon-number">
                                <h1 className="m-0 font-size-90  text-danger"> 
                                {totalLost}
                                </h1>
                                <p className="m-0 text-center"> 
                                    Total Lost
                                </p>
                            </div>
                            <div className="text-center container-infon-number">
                                <h1 className="m-0 font-size-90"> 
                                    {((totalWins + totalLost) / this.state.games.length).toFixed(2)}
                                </h1>
                                <p className="m-0 text-center"> 
                                    W - L %
                                </p>
                            </div>
                        </div>
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

    onRowClicked(player) {
        this.props.history.push(`/player/${player.person.id}`);
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