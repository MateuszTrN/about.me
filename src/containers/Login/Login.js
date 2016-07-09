import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Alert, Row, Col, Input, Jumbotron } from 'react-bootstrap';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError,
  }),
  {...authActions})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    loginError: PropTypes.string
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userNameInput = this.refs.username;
    const passwordInput = this.refs.password;
    this.props.login(userNameInput.getValue(), passwordInput.getValue());
    passwordInput.value = '';
  };

  render() {
    const {user, loginError} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage}>
        <Helmet title="Login"/>
        {!user &&
        <Row>
          <Col xs={4} xsOffset={4}>
            <form className="login-form" onSubmit={this.handleSubmit}>
              <Input type="text" ref="username" label="User Name" placeholder="Enter a username" />
              <Input type="password" ref="password" placeholder="Enter a password" label="Password" />
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </form>
            {loginError && <Alert bsStyle="danger">
              <p>{loginError}</p>
            </Alert>}
          </Col>
        </Row>
        }
        {user &&
          <div>
            <Jumbotron>
              <h1>Hello, {user.fullname}!</h1>
              <p>This is a Demo App Hello page.</p>
            </Jumbotron>
          </div>
        }
      </div>
    );
  }
}
