import _ from 'underscore';
import { connect } from '@lenic/redux-manager';

import actions, { key } from './store';

@connect(v => ({ store: v[key] }), actions)
class Users extends React.PureComponent {
  componentDidMount() {
    // 模拟 Ajax 请求

    this.props.fetchData(() => new Promise(resolve => setTimeout(() => resolve([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' },
    ]), ~~(Math.random() * 10000))));
  }

  clickHandler() {
    this.props.history.push('/');
  }

  render() {
    const { dataSource: { loading, data } } = this.props.store;

    if (loading) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <h1>Users</h1>
        <div>
          <input type="button" value="回到首页" onClick={this.clickHandler.bind(this)} />
        </div>
        <ul>
          {
            _.map(data || [], v => (
              <li key={v.id}>{JSON.stringify(v)}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Users;
