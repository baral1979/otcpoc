/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home2';
import Layout from '../../components/Layout';

// async function action({ fetch }) {
//   const resp = await fetch('/graphql', {
//     body: JSON.stringify({
//       query: '{news{title,link,content}}',
//     }),
//   });
//   const { data } = await resp.json();
//   if (!data || !data.news) throw new Error('Failed to load the news feed.');
//   return {
//     chunks: ['home'],
//     title: 'OTC Contracts',
//     component: (
//       <Layout>
//         <Home news={data.news} />
//       </Layout>
//     ),
//   };
// }

function action() {

  // check environment
  var acc = [];

  return {chunks: ['home'], title: 'OTC Contracts', component: (
    <Layout>
  <Home />
</Layout>

  )};
}

export default action;
