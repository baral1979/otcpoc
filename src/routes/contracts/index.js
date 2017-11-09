import React from 'react';
import Layout from '../../components/Layout';
import Contracts from './Contracts';

const title = 'OTC Contracts';

function action() {
  return {
    chunks: ['contracts'],
    title,
    component: (
      <Layout>
        <Contracts title={title} />
      </Layout>
    ),
  };
}

export default action;
