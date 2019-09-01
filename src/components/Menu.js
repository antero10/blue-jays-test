import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../actions/teamActions';

class Menu extends Component {
    componentWillMount() {
        this.props.fetchTeams();
    }
    render() {
        return (
            <div>
                Hola
            </div>
        )
    }
}

export default connect(null, { fetchTeams })(Menu);