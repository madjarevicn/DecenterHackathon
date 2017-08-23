import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DollarIcon from '../../Decorative/DollarIcon/index.jsx';
import Loader from '../../Decorative/Loader/index.jsx';
import teamActions from '../../../actions/teamActions';
import OpenModalButton from '../../OpenModalButton/OpenModalButton';

require('./_index.scss');

class AdminTeams extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentWillMount() {
    this.props.fetchTeams();
  }
  render() {
    return (
      <div>
        {
          this.props.teams.isFetching &&
          <div className="empty-section">
            <h1><Loader color="#777" />Učitavanje</h1>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          this.props.teams.error &&
          <div className="empty-section">
            <h1>{this.props.teams.error.toString()}</h1>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          !this.props.teams.error &&
          !this.props.teams.teams.length > 0 &&
          <div className="empty-section">
            <div className="">
              <h1>Nema timova</h1>
              <OpenModalButton text="Dodajte tim" />
            </div>
          </div>
        }
        {
          !this.props.teams.isFetching &&
          !this.props.teams.error &&
          this.props.teams.teams.length > 0 &&
          <table className="admin-table">
            <tbody>
              {
                this.props.teams.teams.map((team) => (
                  <tr key={team.transactionHash}>
                    <th className="rewardable"><DollarIcon color={team.args.rewardEligible ? '#44ca44' : '#eee'} /></th>
                    <th>{team.args.teamName}</th>
                    <td>{team.args.memberNames}</td>
                    <td>{team.args.teamAddress}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

AdminTeams.propTypes = {
  teams: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    teams: PropTypes.array,
    error: PropTypes.object,
  }),
  fetchTeams: PropTypes.func.isRequired
};

AdminTeams.defaultProps = {
  teams: {
    isFetching: true,
    teams: [1]
  }
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => bindActionCreators({
  ...teamActions
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTeams);