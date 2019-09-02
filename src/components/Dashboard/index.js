import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import { fetchTeam, fetchRoster } from '../../actions/teamActions';

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
    componentDidMount() {
    };
    render() {
        if (this.props.roster && this.props.roster.length > 0) {
            return (
                <div>
                    <DataTable
                        className="data-table"
                        title="Roster"
                        columns={columns}
                        data={this.props.roster}
                    />
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
    roster: PropTypes.array,
    fetchTeam: PropTypes.func.isRequired,
    fetchRoster: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    team: state.data.team,
    roster: state.data.roster
});

export default connect(mapStateToProps, { fetchTeam, fetchRoster })(Dashboard);