import { connect } from '@lenic/redux-manager';

import actions, { key } from './store';

@connect(v => ({ store: v[key] }), actions)
class Login extends React.PureComponent {
  submitHandler() {
    // 发送 Ajax 请求，将授权信息添加到 Store
    this.props.login({
      user: {
        id: 1,
        name: '张三',
      },
      permissions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    });

    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div>User:</div>
        <div>
          <input type="text" name="user" />
        </div>
        <div>Password:</div>
        <div>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Submit" onClick={this.submitHandler.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Login;
