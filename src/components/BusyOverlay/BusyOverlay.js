import React, {Component, PropTypes} from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class BusyOverlay extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    const {isLoading} = this.props;
    const styles = require('./BusyOverlay.scss');
    const children = React.Children.map(this.props.children, child => child);
    return (
      <div className={styles.overlayTarget}>
        {children}
        {isLoading && <div className={styles.overlay}>
          <div className={styles.busy}><ProgressBar active now={100} /></div>
        </div>}
      </div>
    );
  }
}

