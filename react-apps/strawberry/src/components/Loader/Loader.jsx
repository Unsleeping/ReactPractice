import React from 'react';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';
import './Loader.scss';

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className="sweet-loading">
      <RingLoader css={override} size={200} color={'#36D7B7'} loading={true} />
    </div>
  );
};

export default Loader;
