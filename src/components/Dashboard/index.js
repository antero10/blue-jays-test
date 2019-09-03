import * as moment from 'moment';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { fetchTeamGamesData } from '../../actions/teamActions';
import BarChart from '../BarChart';
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

    constructor() {
        super();
        this.state = {
            data: {
                datasets: [],
                labels: [],
            }
        };
    }
    render() {
        if (this.props.roster && this.props.roster.length > 0) {
            return (
                <div className="container-data" style={{
                    "backgroundImage": `linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.92)), url(https://www.mlbstatic.com/team-logos/${this.props.team.id}.svg)`
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
                                data={this.props.roster}
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
    componentWillReceiveProps() {
        if (!this.props.games && Object.entries(this.props.team).length !== 0 ) {
            this.props.fetchTeamGamesData(this.props.team.sport.id, this.props.team.id);
        }
        if (this.props.games && this.props.games.length > 0) {
            const _this = this;
            const gamesWins = this.props.games.reduce((previousGame, currentGame) => {
                return this.getGameResults(previousGame, currentGame, _this);
            }, {});
            const gameLost = this.props.games.reduce((previousGame, currentGame) => {
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
                data: {
                    labels: labels,
                    datasets: datasets
                }
            });
        }
    }

    getGameResults(previousGame, currentGame, _this, isWinning = true) {
        if (!previousGame[moment(currentGame.date).format('MMMM')]) {
            previousGame[moment(currentGame.date).format('MMMM')] = 0;
        }
        currentGame.games.forEach((game) => {
            const gameTeamInfo = game.teams.away.team.id === _this.props.team.id ? game.teams.away : game.teams.home;
            previousGame[moment(currentGame.date).format('MMMM')] = previousGame[moment(currentGame.date).format('MMMM')] + (!(gameTeamInfo.isWinner ^ isWinning) ? 1 : 0)
        });
        return previousGame;
    }
}
Dashboard.propTypes = {
    team: PropTypes.object.isRequired,
    roster: PropTypes.array,
    fetchTeamGamesData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    team: state.data.team,
    roster: state.data.roster,
    games: state.data.games
});

export default connect(mapStateToProps, { fetchTeamGamesData })(Dashboard);