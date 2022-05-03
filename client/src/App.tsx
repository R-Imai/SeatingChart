import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import SeatingChartPage from './Pages/SeatingChartPage';
import SeatingSettingPage from './Pages/SeatingSettingPage';
import NotFoundPage from './Pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/:chartCd" component={SeatingChartPage}/>
        <Route exact path="/:chartCd/setting" component={SeatingSettingPage}/>
        <Route exact path="/error/notfound" component={NotFoundPage}/>
        <Route exact path="">
          <Redirect to={'/error/notfound'}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
