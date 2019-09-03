import React, {Component} from 'react';
import { fetchTeams } from '../../actions/teamActions';
import './Menu.css';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';



class Menu extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: null,
            teams: [],
            team: {}
        };
        fetchTeams().then((response) => {
            this.setState({
                teams: response
            });
        });
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    componentDidMount() {
        
    };

    handleChange(selectedOption) {
        this.props.history.push(`/team/${selectedOption.value.id}`);
    };

    render() {
        const options = this.state.teams.map((team) => {
            return {
                value: team,
                label: team.name
            }
        });
        const { team } = this.state;
        
        return (
            <div className="sidebar shadow">
                <Select
                    placeholder="Search for team"
                    value={team}
                    onChange={this.handleChange}
                    options={options}
                    autoFocus
                />
            </div>
        )
    }
    

    
}
export default withRouter(Menu);