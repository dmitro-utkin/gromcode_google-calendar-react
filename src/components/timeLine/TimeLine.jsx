import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./timeLine.scss";



TimeLine.propTypes = {
  dataDay: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default TimeLine;