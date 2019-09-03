import * as moment from 'moment';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { fetchPlayer } from '../../actions/teamActions';
import '../Dashboard/Dashboard.css';

class DashboardPlayer extends Component {
    constructor(history) {
        super();
        this.state = {
            player: null
        };
        fetchPlayer(history.match.params.id).then((player) => {
            console.log(player)
            this.setState({
                player
            });
        });
        this.hitColumns = [
            {
              name: 'Season',
              selector: 'season',
              sortable: true,
            },
            {
              name: 'Games Played',
              selector: 'stat.gamesPlayed',
              sortable: false,
            },
            {
                name: 'At bat',
                selector: 'stat.atBats',
                sortable: false
            },
            {
                name: 'Base On Ball',
                selector: 'stat.baseOnBalls',
                sortable: false
            },
            {
              name: 'Hits',
              selector: 'stat.hits',
              sortable: false
            },
            {
                name: 'Doubles',
                selector: 'stat.doubles',
                sortable: false
            },
            {
                name: 'Home Runs',
                selector: 'stat.homeRuns',
                sortable: false
            },
            {
                name: 'Avg',
                selector: 'stat.avg',
                sortable: false
            }
        ];

        this.fieldColumns = [
            {
                name: 'Season',
                selector: 'season',
                sortable: true,
            },
            {
                name: 'Assists',
                selector: 'stat.assists',
                sortable: false
            },
            {
                name: 'Chances',
                selector: 'stat.chances',
                sortable: false
            },
            {
                name: 'Assists',
                selector: 'stat.assists',
                sortable: false
            },
            {
                name: 'Errors',
                selector: 'stat.errors',
                sortable: false
            },
            {
                name: 'Games',
                selector: 'stat.games',
                sortable: false
            },
            {
                name: 'Games Started',
                selector: 'stat.gamesStarted',
                sortable: false
            },
            {
                name: 'Innings',
                selector: 'stat.innings',
                sortable: false
            },
            {
                name: 'Range Factor Per GAme',
                selector: 'stat.rangeFactorPerGame',
                sortable: false
            },
            
        ]

        this.pitchingColumns = [
            {
                name: 'Season',
                selector: 'season',
                sortable: true,
            },
            {
                name: 'Air Outs',
                selector: 'stat.airOuts',
                sortable: false
            },
            {
                name: 'At Bats',
                selector: 'stat.atBats',
                sortable: false
            },
            {
                name: 'Avg',
                selector: 'stat.avg',
                sortable: false
            },
            {
                name: 'Earned Runs',
                selector: 'stat.earnedRuns',
                sortable: false
            },
            {
                name: 'Games Started',
                selector: 'stat.gamesStarted',
                sortable: false
            },
            {
                name: 'Games Finished',
                selector: 'stat.gamesFinished',
                sortable: false
            },
            {
                name: 'Games Played',
                selector: 'stat.gamesPlayed',
                sortable: false
            },
            {
                name: 'Hit',
                selector: 'stat.hits',
                sortable: false
            },
            {
                name: 'Home Runs',
                selector: 'stat.homeRuns',
                sortable: false
            },
            {
                name: 'Obp',
                selector: 'stat.obp',
                sortable: false
            },
            {
                name: 'Ops',
                selector: 'stat.ops',
                sortable: false
            },
            {
                name: 'Runs',
                selector: 'stat.runs',
                sortable: false
            },
            {
                name: 'Strikes',
                selector: 'stat.strikes',
                sortable: false
            },
            {
                name: 'Stolen Base',
                selector: 'stat.stolenBases',
                sortable: false
            },
            {
                name: 'Saves',
                selector: 'stat.saves',
                sortable: false
            },
            {
                name: 'Wins',
                selector: 'stat.wins',
                sortable: false
            },
        ]
    }
    render() {
        if (this.state.player !== null && this.state.player.stats.length > 0 ) {
            let LowerContainer = (<div></div>)
            const fieldData = this.state.player.stats.filter(stat => stat.group.displayName === 'fielding');
            const pitchData = this.state.player.stats.filter(stat => stat.group.displayName === 'pitching');
            const hittingData = this.state.player.stats.filter(stat => stat.group.displayName === 'hitting');
            
            if (pitchData.length > 0) {
                LowerContainer = (
                    <div className="flex">
                    <div className="card col-6 flex">
                        <DataTable
                            className="data-table"
                            title={`${this.state.player.firstLastName} Pitcher Data`}
                            columns={this.pitchingColumns}
                            data={pitchData[0].splits}
                            onRowClicked={this.onRowClicked}
                        />
                    </div>
                    <div className="card col-6 ">
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-70"> 
                                {this.state.player.height}
                            </h1>
                            <p className="m-0 text-center"> 
                                Height
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-70"> 
                            {this.state.player.weight}
                            </h1>
                            <p className="m-0 text-center"> 
                                Weight
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-70"> 
                            {this.state.player.birthDate}
                            </h1>
                            <p className="m-0 text-center"> 
                                DOB
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-70"> 
                                {this.state.player.draftYear}
                            </h1>
                            <p className="m-0 text-center"> 
                                Draft Year
                            </p>
                        </div>
                    </div>
                </div>
                );
            }
            else {
                LowerContainer = (
                    <div  className="graph card">
                       <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-90"> 
                                {this.state.player.height}
                            </h1>
                            <p className="m-0 text-center"> 
                                Height
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-90"> 
                            {this.state.player.weight}
                            </h1>
                            <p className="m-0 text-center"> 
                                Weight
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-90"> 
                            {moment(this.state.player.birthDate).format('MM-DD-YYYY')}
                            </h1>
                            <p className="m-0 text-center"> 
                                DOB
                            </p>
                        </div>
                        <div className="text-center container-infon-number">
                            <h1 className="m-0 font-size-90"> 
                                {this.state.player.draftYear}
                            </h1>
                            <p className="m-0 text-center"> 
                                Draft Year
                            </p>
                        </div>
                    </div>
                )
            }
            return (
                <div className="container-data">
                    <div className="flex">
                        <div className="card col-6 flex">
                            <DataTable
                                className="data-table"
                                title={`${this.state.player.firstLastName} Hits Data`}
                                columns={this.hitColumns}
                                data={hittingData[0].splits}
                                onRowClicked={this.onRowClicked}
                            />
                        </div>
                        <div className="card col-6 flex">
                            <DataTable
                                    className="data-table"
                                    title={`${this.state.player.firstLastName} Field Data`}
                                    columns={this.fieldColumns}
                                    data={fieldData[0].splits}
                                    onRowClicked={this.onRowClicked}
                            />
                        </div>
                    </div>
                    {LowerContainer}
                    
                </div>
            );
        } else {
            return (<div></div>)
        }
    }
}

export default withRouter(DashboardPlayer);