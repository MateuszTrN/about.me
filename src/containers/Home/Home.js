import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { loadSomeData } from '../../redux/actions';
import {BusyOverlay} from 'components';

@connect(
  state => ({
    someData: state.data.someData.list
  }),
  {loadSomeData})
export default class ConfigList extends Component {
  static propTypes = {
    someData: PropTypes.object,
    loadSomeData: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadSomeData();
  }

  render() {
    const {someData} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Home.scss');
    return (
      <div className={styles.widgets}>
        <Helmet title="Home"/>
        <BusyOverlay isLoading={someData.pending}>
          <table className="table table-striped">
            <thead>
            <tr>
              <th className={styles.idCol}>ID</th>
              <th className={styles.colorCol}>Title</th>
            </tr>
            </thead>
            <tbody>
            {
              someData.data.map((item) =>
                <tr key={item.id}>
                  <td className={styles.idCol}>{item.id}</td>
                  <td className={styles.colorCol}>{item.title}</td>
                </tr>)
            }
            </tbody>
          </table>
        </BusyOverlay>
      </div>
    );
  }
}
