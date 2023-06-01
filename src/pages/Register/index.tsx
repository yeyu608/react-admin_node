import {
    Button,
    Cascader,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router';
import { userRegister } from '../../utils/api';
import './register.scss'

const { Option } = Select;
const residences = [
    {
        value: 'zhejiang',
        label: '浙江',
        children: [
            {
                value: 'hangzhou',
                label: '杭州',
                children: [
                    {
                        value: 'xihu',
                        label: '西湖',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: '江苏',
        children: [
            {
                value: 'nanjing',
                label: '南京',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: '中华门',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register: React.FC = () => {

    const [form] = Form.useForm();

    const Navigate = useNavigate()


    const onFinish = (values: user_register_Info) => {
        let value = JSON.stringify(values)

        userRegister('/register', { value },'USER').then(res => {
            if (res.status >= 200 && res.status < 300) {
                let { error_code, msg } = res.data;
                console.log(error_code, msg)
                alert(msg);
                if (error_code === 0) {
                    Navigate('/login')
                }
            }
        })
        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8080/api/users/register');
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // xhr.send(`values=${value}`);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4) {
        //         if (xhr.status >= 200 && xhr.status < 300) {
        //             let res = JSON.parse(xhr.responseText);
        //             console.log(res);
        //             let { error_code, msg } = res;
        //             alert(msg);
        //             if (error_code === 0) {
        //                 Navigate('/login')
        //             }
        //         }
        //     }
        // }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    return (
        <>
            <div className="register">
                <h2>用户注册</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: '请输入您的昵称!', whitespace: true }]}
                    >
                        <Input autoComplete="username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password autoComplete="current-password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认您的密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('您输入的两个密码不匹配!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="性别"
                        rules={[{ required: true, message: '请选择您的性别!' }]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                            <Option value="other">其他</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="电子邮箱"
                        rules={[
                            {
                                type: 'email',
                                message: '输入的电子邮件无效!',
                            },
                            {
                                required: true,
                                message: '请输入您的电子邮件！',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="residence"
                        label="家庭住址"
                        rules={[
                            { type: 'array', required: true, message: '请选择您的常居住地!' },
                        ]}
                    >
                        <Cascader options={residences} />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="手机号码"
                        rules={[{ required: true, message: '请输入您的电话号码!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="intro"
                        label="简介"
                        rules={[{ required: true, message: '请输入简介' }]}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('应接受协议')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            我已阅读 <a href="">协议</a>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}


export default Register;