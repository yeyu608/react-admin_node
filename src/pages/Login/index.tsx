import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router'
import { userLogin } from '../../utils/api';

import './login.scss'

const Login: React.FC = () => {

    const Navigate = useNavigate()

    const onFinish = (values: any) => {
        console.log('收到的表单值：', values);
        const { username, password } = values


        userLogin('/login', { username, password },'USER').then((res:any )=> {
            if (res.status >= 200 && res.status < 300) {
                console.log(res)
                let { error_code, msg } = res.data;
                console.log(error_code, msg)
                alert(msg);
                if (error_code === 0) {
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                    Navigate('/home')
                }
            }
        })
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8080/api/users/login');
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.send(`username=${username}&password=${password}`)
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status >= 200 && xhr.status < 300) {
        //             let res = JSON.parse(xhr.responseText);
        //             console.log(res);
        //             let { error_code, msg, data } = res;
        //             alert(msg);
        //             if (error_code === 0) {
        //                 var date = new Date()
        //                 date.setTime(date.getTime() - 8 * 3600 * 1000 + 7200 * 1000)
        //                 document.cookie = `user={id:${data.userid},username:${data.username},token:${data.token}};expires=` + date + ';path=/'
        //                 localStorage.setItem('user', JSON.stringify(data))
        //                 Navigate('../home')
        //             }
        //         }
        //     }
        // }
    };

    const getRegister = () => {
        Navigate('/register')
    }

    return (
        <>
            <div className="login">
                <h2>欢迎登陆</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入您的昵称!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入您的密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住密码</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        <a onClick={getRegister}>立即注册!</a>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login;