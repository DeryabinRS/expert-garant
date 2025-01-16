import { FC } from "react";
import { Alert, Card } from "antd";
import LoginForm from "@/components/LoginForm";

const LoginPage:FC = () => {

    return (
        <Card 
            title="Expert Garant" 
            style={{
                maxWidth: 350, 
                margin: '50px auto',
            }}
        >
            <LoginForm />

            <Alert 
                message={(
                    <>
                        <div>Email: test@test.ru</div>
                        <div>Password: test</div>
                    </>
                )}
                type="info" 
                showIcon 
            />
        </Card>
    )
}

export default LoginPage;
