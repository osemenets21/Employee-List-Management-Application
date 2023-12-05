import React from 'react';
import './NotFound.scss';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <h1 className='not-found-heading' >404 Not Found</h1>
      <p className='not-found-text'>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
