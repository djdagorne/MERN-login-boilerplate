import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userData.user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/home",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}
