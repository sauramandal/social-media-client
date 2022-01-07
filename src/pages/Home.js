import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Home = ({ data }) => {
  return (
    <Fragment>
      Home
    </Fragment>
  );
};
Home.propTypes = {
  data: PropTypes.array.isRequired,
};
Home.defaultProps = {
  data: [],
};
export default Home;
