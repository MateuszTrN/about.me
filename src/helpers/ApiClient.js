
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return Promise.reject({message: response.statusText});
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor() {
  }

  logIn(username, password) {
    const query = 'username=' + encodeURIComponent(username) + '&' + 'password=' + encodeURIComponent(password);
    return fetch('/api/login?' + query).then(checkStatus)
      .then(response => response.json());
  }

  getSomeData() {
    return fetch('/api/someData?').then(checkStatus)
      .then(response => response.json())
      .then(response => response.results);
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
