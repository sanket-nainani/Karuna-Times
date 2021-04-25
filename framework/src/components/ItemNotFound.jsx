import React from 'react';
import PropTypes from 'prop-types';

const ItemNotFound = ({ text, className, children }) => (
  <div className={`item-not-found text-center ${className}`}>
    <img className=" d-block " src="/static/images/retry.svg" alt="Item Not Found" />
    {children}
    <div className="item-not-found-text">{text}</div>
  </div>
);

ItemNotFound.propTypes = {
  text: PropTypes.string
};

ItemNotFound.defaultProps = {
  text: 'Sorry, The item you are looking for is not found'
};

export default ItemNotFound;
