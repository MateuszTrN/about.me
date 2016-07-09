import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { routeActions } from 'react-router-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { load as loadAuth, logout } from '../../redux/modules/auth';
import config from '../../config';

@connect(
  state => ({
    user: state.auth.user
  }),
  {logout, pushState: routeActions.push, loadAuth})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    loadAuth: PropTypes.func,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (!this.props.user) {
      this.props.loadAuth();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/home');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props; // eslint-disable-line no-shadow
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>}
            </Nav>
            {user &&
            <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.fullname}</strong>.</p>}
          </Navbar.Collapse>
        </Navbar>

        <Grid className={styles.appContent}>
          <Row className="show-grid">
            <Col md={12}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
