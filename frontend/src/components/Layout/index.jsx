import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { Logout } from "../../API/auth";
import Accounts from "../Accounts/Accounts";
import Login from "../Login/login";
import PrivateRoute from "../Routing/PrivateRoute";
import Signup from "../Signup/signup";
import Transactions from "../Transactions/Transactions";
import "./layout.css";
// const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Index({ history }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.Auth);

  return (
    <div>
      <Layout>
        <Header className="header">
          <span className="logo">NUSMoney</span>
        </Header>
        <Layout>
          {isAuthenticated && (
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                onSelect={(e) => console.log(e)}
              >
                <Menu.Item
                  key="/"
                  icon={<UserOutlined />}
                  onClick={() => history.push("/transactions")}
                >
                  Transactions
                </Menu.Item>
                <Menu.Item
                  key="/accounts"
                  icon={<UserOutlined />}
                  onClick={() => history.push("/accounts")}
                >
                  Accounts
                </Menu.Item>
                <Menu.Item
                  key="/logout"
                  icon={<UserOutlined />}
                  onClick={() => dispatch(Logout())}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Sider>
          )}
          {!isAuthenticated && (
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                onSelect={(e) => console.log(e)}
              >
                <Menu.Item
                  key="/login"
                  icon={<UserOutlined />}
                  onClick={() => history.push("/login")}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  key="/signup"
                  icon={<UserOutlined />}
                  onClick={() => history.push("/signup")}
                >
                  Signup
                </Menu.Item>
              </Menu>
            </Sider>
          )}
          <Layout style={{ padding: "0 24px 24px" }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
            
            </Breadcrumb> */}
            <Content className="site-layout-background main-content">
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />

                <PrivateRoute path="/accounts" component={Accounts} />
                <PrivateRoute path="/transactions" component={Transactions} />
                <PrivateRoute path="/" component={Accounts} />
                <Route path="/" component={Login} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default withRouter(Index);
