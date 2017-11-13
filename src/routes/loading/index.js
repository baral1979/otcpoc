import React from 'react';
import LoadingPage from './LoadingPage';

function action() {
  return {
    title: 'Demo Loading...',
    component: <LoadingPage />,
  };
}

export default action;
