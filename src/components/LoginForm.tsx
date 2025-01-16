import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { Button,  Form, Input } from "antd";
import type { FormProps } from 'antd';
import { login } from "@/utils/auth";

type FieldType = {
    email?: string;
    password?: string;
};

const LoginForm:FC = () => {
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        if(values.email && values.password) {
            login(values.email, values.password);
            navigate(0);
        }
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
            <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;