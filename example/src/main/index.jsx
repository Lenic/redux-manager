import { Link, Route, Switch } from 'react-router-dom';
import { AsyncComponent } from '@lenic/react-auth-route';

class Main extends React.PureComponent {
  logoutHandler() {
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <div>
          <input type="button" value="logout" onClick={this.logoutHandler.bind(this)} />
        </div>
        <div>
          <div>可点击的菜单项</div>
          <ul>
            <li>
              <Link to="/">回到首页</Link>
            </li>
            <li>
              <Link to="/roles">角色列表</Link>
            </li>
            <li>
              <Link to="/users">账户列表</Link>
            </li>
          </ul>
        </div>
        <hr />
        <Switch>
          <Route key="roles" path="/roles" render={props => (
            <AsyncComponent
              {...props}
              loading={() => <div>Roles Loading...</div>}
              component={() => import('./roles').then(v => new Promise(r => setTimeout(() => r(v), 2000)))}
            />
          )} />
          <Route key="users" path="/users" render={props => (
            <AsyncComponent
              {...props}
              loading={() => <div>Users Loading...</div>}
              component={() => import('./users').then(v => new Promise(r => setTimeout(() => r(v), 5000)))}
            />
          )} />
        </Switch>
      </div>
    );
  }
}

export default Main;
