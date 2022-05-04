import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import SeatingChartPage from './Pages/SeatingChartPage';
import SeatingSettingPage from './Pages/SeatingSettingPage';
import SettingPage from './Pages/SettingPage';
import NotFoundPage from './Pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/setting" component={SettingPage}/>
        <Route exact path="/seats/:chartCd" component={SeatingChartPage}/>
        <Route exact path="/seats/:chartCd/setting" component={SeatingSettingPage}/>
        <Route exact path="/error/notfound" component={NotFoundPage}/>
        <Route exact path="">
          <Redirect to={'/error/notfound'}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
