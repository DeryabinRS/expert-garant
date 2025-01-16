import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import type { MenuProps } from 'antd';
import { logout } from '@/utils/auth';

type MenuItem = Required<MenuProps>['items'][number];

const MainLayout:FC<{ isAuthUser: boolean }> = ({ isAuthUser }) => {
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items: MenuItem[] = [
        { 
            key: 1, 
            label: 
                isAuthUser && (<a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={() => {
                        logout();
                        navigate(0);
                    }}
                >
                    Exit
                </a>)
            ,
        }
    ];

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        marginTop: 10,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Deryabin Roman ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}

export default MainLayout