export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      let actionObject = action;

      if (typeof action === 'function') {
        actionObject = action(dispatch, getState);
      }

      const { promise, types, ...rest } = actionObject; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client, dispatch).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
    };
  };
}
