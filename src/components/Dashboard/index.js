import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTeam, fetchRoster } from '../../actions/teamActions';
import TableData from '../Table';

class Dashboard extends Component {
    componentDidMount() {
    };
    render() {
        if (this.props.roster.length > 0) {
            return (
                <div>
                    <TableData />
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
}
Dashboard.propTypes = {
    team: PropTypes.object.isRequired,
    roster: PropTypes.array.isRequired,
    fetchTeam: PropTypes.func.isRequired,
    fetchRoster: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    team: state.data.team,
    roster: state.data.roster
});

export default connect(mapStateToProps, { fetchTeam, fetchRoster })(Dashboard);