import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function MemberRoute({ component: Component, ...rest }) {
  const userAuthentication = useSelector((state) => state.userAuthentication);
  const { user } = userAuthentication;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.isMember ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/home"></Redirect>
        )
      }
    ></Route>
  );
}
