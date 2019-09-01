import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTeams } from '../actions/teamActions';

class Menu extends Component {
    componentWillMount() {
        this.props.fetchTeams();
    }
    render() {
        console.log(this.props);
        return (
            <div>
                Hola
            </div>
        )
    }
}

Menu.propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    teams: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    teams: state.teams.items,
});

export default connect(mapStateToProps, { fetchTeams })(Menu);