import {Footer} from '@/components';
import {userRegisterUsingPost} from '@/services/noob-template/userController';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {Helmet, history} from '@umijs/max';
import {Alert, message, Tabs} from 'antd';
import {createStyles} from 'antd-style';
import React, {useState} from 'react';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({token}) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {styles} = useStyles();


  /**
   * 注册校验
   */
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 注册
      const res = await userRegisterUsingPost(values);
      if (res.code === 0) {
        const defaultRegisterSuccessMessage = '信息注册成功！';
        message.success(defaultRegisterSuccessMessage);
        const urlParams = new URL(window.location.href).searchParams;
        // 用户信息注册成功，跳转登录页
        history.push(urlParams.get('redirect') || '/user/login');
        return;
      } else {
        // 注册失败 打印错误提示
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg"/>}
          title="Noob Template"
          subTitle={'一个基于Springboot+Ant Design Pro构建的前后端通用模板，可帮助开发者快速构建单体应用项目架构'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{searchConfig:{submitText:"注册"}}}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '用户注册',
              }
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号信息'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'给自己取一个个性化昵称吧'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <a
              style={{
                float: 'right',
                marginBottom: 24,
              }}
              href="/user/login"
              target="_blank"
            >
              已有账号，去登陆
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
