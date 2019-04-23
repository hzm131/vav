import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Input, Button, Form, Card, Icon } from 'antd';
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class Login extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: 'login/login',
        payload: values,
      });
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const cardStyle = {
      margin: '0 auto',
      width: 350,
    };
    return (
      <Card style={cardStyle} bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(<Input placeholder="请输入用户名" prefix={<Icon type="user" />} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(<Input type="password" placeholder="请输入密码" prefix={<Icon type="lock" />} />)}
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Login;
