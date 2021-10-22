import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

export default function PrivateRoute({ component: Component, ...rest }) {
  const login = useSelector((state) => state.userAuthentication);
  const { user } = login;

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
}
