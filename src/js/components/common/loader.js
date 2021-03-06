import React from 'react';

export const Loader = ({ fade, show, style, table, waiting }) => {
  var hideClass = fade ? 'hidden' : 'loaderContainer shrunk';
  var showClass = table ? 'miniLoaderContainer' : 'loaderContainer';
  return (
    <div style={style} className={show ? showClass : hideClass}>
      <div className={waiting ? 'waiting-loader loader' : 'loader'}>
        <span className="dot dot_1" />
        <span className="dot dot_2" />
        <span className="dot dot_3" />
        <span className="dot dot_4" />
      </div>
    </div>
  );
};

export default Loader;
