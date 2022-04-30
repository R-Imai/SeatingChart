import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import SeatingChartPage from './Pages/SeatingChartPage';
import SeatingSettingPage from './Pages/SeatingSettingPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:chartCd/setting" component={SeatingSettingPage}/>
        <Route path="/:chartCd" component={SeatingChartPage}/>
      </Switch>
    </Router>
  )
}

export default App;
