import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { fetchPlayer } from '../../actions/teamActions';
import '../Dashboard/Dashboard.css';
class DashboardPlayer extends Component {
    constructor(history) {
        super();
        this.state = {
            player: {}
        };
        fetchPlayer(history.match.params.id).then((player) => {
            this.setState({
                player
            });
        })
    }
    render() {
        return (
            <div className="container-data">
                <div  className="graph card">
                    1
                </div>
                <div className="flex">
                    <div className="card col-6 flex">
                        2
                    </div>
                    <div className="card col-6 flex">3</div>
                </div>
            </div>
        );
    }
}

export default withRouter(DashboardPlayer);