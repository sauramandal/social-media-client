import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
const Login = ({ data }) => {
  const [state, setState] = useState({});

  return <Fragment>Content</Fragment>;
};
Login.propTypes = {
  data: PropTypes.array.isRequired,
};
Login.defaultProps = {
  data: [],
};
export default Login;
