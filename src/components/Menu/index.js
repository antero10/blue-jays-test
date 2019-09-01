import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTeams, fetchTeam, fetchRoster } from '../../actions/teamActions';
import './Menu.css';
import Select from 'react-select';


class Menu extends Component {
    state = {
        selectedOption: null,
    };

    componentDidMount() {
        this.props.fetchTeams();
    };
    handleChange = selectedOption => {
        this.props.fetchTeam(selectedOption.value);
        this.props.fetchRoster(selectedOption.value);
    };
    render() {
        const options = this.props.teams.map((team) => {
            return {
                value: team.id,
                label: team.name
            }
        });
        const { team } = this.state;
        
        return (
            <div className="sidebar shadow">
                <Select
                    value={team}
                    onChange={this.handleChange}
                    options={options}
                />
            </div>
        )
    }
}

Menu.propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchTeam: PropTypes.func.isRequired,
    fetchRoster: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired,
    team: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        teams: state.data.teams,
        team: state.data.team
    }
}



export default connect(mapStateToProps, { fetchTeams, fetchTeam, fetchRoster })(Menu);