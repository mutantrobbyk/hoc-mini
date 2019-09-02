import React from "react";

function withAuthentication(WrappedComponent) {
  return function(props) {
    if (props.isAuthenticated) return <WrappedComponent {...props} />;
    return null;
  };
}
 
export default withAuthentication;