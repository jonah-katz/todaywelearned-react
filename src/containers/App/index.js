/*
 *
 * App
 *
 */

import React from 'react';
import './styles.css';

const App = ({ SwitchComponent, authToken, children, avatarUrl, role }) => (
  <div className='app'>
  	<SwitchComponent/>
  </div>
);


export default App;
