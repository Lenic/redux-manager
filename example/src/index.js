import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { store } from './store';

import Main from './main';
import Login from './login';

const root = (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(root, document.getElementById('container'));
