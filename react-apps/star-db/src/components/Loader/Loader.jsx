import React from 'react';
import { css } from "@emotion/core";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: lime;
`;

const Loader = ({ loading }) => {
  return <CircleLoader css={override} size={150} color={"teal"} loading={loading}/>;
};

export default Loader;