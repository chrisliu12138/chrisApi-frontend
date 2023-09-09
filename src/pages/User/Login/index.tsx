import Footer from '@/components/Footer';
import { getLoginUserUsingGET, userLoginUsingPOST } from '@/services/chrisApi-backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGET();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          loginUser: userInfo.data,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });
      if (res.code === 0) {
        const defaultLoginSuccessMessage = 'Login Success！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = 'Login Failed, Please Retry！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'Login'}- {Settings.title}
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
          logo={<img alt="logo" src="/logo.svg" />}
          title="API OPEN PLATFORM"
          subTitle={'Open and Secure API Calling Platform Based on Spring Cloud Gateway'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Account Login',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter the username: admin1'}
                rules={[
                  {
                    required: true,
                    message: 'Username is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter the password: 12345678'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required！',
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
            <Link
              style={{
                float: 'right',
              }}
              to="/user/register"
            >
              Don't have an account yet?
              Click to register.
            </Link>
            <br />
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;

// import Footer from '@/components/Footer';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
// import {
//   AlipayCircleOutlined,
//   LockOutlined,
//   MobileOutlined,
//   TaobaoCircleOutlined,
//   UserOutlined,
//   WeiboCircleOutlined,
// } from '@ant-design/icons';
// import {
//   LoginForm,
//   ProFormCaptcha,
//   ProFormCheckbox,
//   ProFormText,
// } from '@ant-design/pro-components';
// import { useEmotionCss } from '@ant-design/use-emotion-css';
// import { FormattedMessage, history, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
// import { Alert, message, Tabs } from 'antd';
// import Settings from '../../../../config/defaultSettings';
// import React, { useState } from 'react';
// import { flushSync } from 'react-dom';
// import {userLoginUsingPOST} from "@/services/chrisApi-backend/userController";
//
//
// const ActionIcons = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       marginLeft: '8px',
//       color: 'rgba(0, 0, 0, 0.2)',
//       fontSize: '24px',
//       verticalAlign: 'middle',
//       cursor: 'pointer',
//       transition: 'color 0.3s',
//       '&:hover': {
//         color: token.colorPrimaryActive,
//       },
//     };
//   });
//
//   return (
//     <>
//       <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
//       <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
//       <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
//     </>
//   );
// };
//
// const Lang = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       width: 42,
//       height: 42,
//       lineHeight: '42px',
//       position: 'fixed',
//       right: 16,
//       borderRadius: token.borderRadius,
//       ':hover': {
//         backgroundColor: token.colorBgTextHover,
//       },
//     };
//   });
//
//   return (
//     <div className={langClassName} data-lang>
//       {SelectLang && <SelectLang />}
//     </div>
//   );
// };
//
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };
//
// const Login: React.FC = () => {
//   const [userLoginState] = useState<API.LoginResult>({});
//   const [type, setType] = useState<string>('account');
//   const { initialState, setInitialState } = useModel('@@initialState');
//
//   const containerClassName = useEmotionCss(() => {
//     return {
//       display: 'flex',
//       flexDirection: 'column',
//       height: '100vh',
//       overflow: 'auto',
//       backgroundImage:
//         "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
//       backgroundSize: '100% 100%',
//     };
//   });
//
//   const intl = useIntl();
//   const handleSubmit = async (values: API.UserLoginRequest) => {
//     try {
//       // 登录
//       const res = await userLoginUsingPOST({ ...values });
//       if(res.data){
//         const urlParams = new URL(window.location.href).searchParams;
//         history.push(urlParams.get('redirect') || '/');
//         setInitialState({
//           loginUser: res.data
//         })
//
//         return;
//       }
//
//     } catch (error) {
//       const defaultLoginFailureMessage = intl.formatMessage({
//         id: 'pages.login.failure',
//         defaultMessage: 'Login failed, please try again!',
//       });
//       console.log(error);
//       message.error(defaultLoginFailureMessage);
//     }
//   };
//   const { status, type: loginType } = userLoginState;
//
//   return (
//     <div className={containerClassName}>
//       <Helmet>
//         <title>
//           {intl.formatMessage({
//             id: 'menu.login',
//             defaultMessage: 'Login page',
//           })}
//           - {Settings.title}
//         </title>
//       </Helmet>
//       <Lang />
//       <div
//         style={{
//           flex: '1',
//           padding: '32px 0',
//         }}
//       >
//         <LoginForm
//           contentStyle={{
//             minWidth: 280,
//             maxWidth: '75vw',
//           }}
//           logo={<img alt="logo" src="/logo.svg" />}
//           title="Open API Platform"
//           // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
//           subTitle="Open and Secure API Calling Platform Based on Spring Cloud Gateway"
//           initialValues={{
//             autoLogin: true,
//           }}
//           actions={[
//             <FormattedMessage
//               key="loginWith"
//               id="pages.login.loginWith"
//               defaultMessage="其他登录方式"
//             />,
//             <ActionIcons key="icons" />,
//           ]}
//           onFinish={async (values) => {
//             await handleSubmit(values as API.UserLoginRequest);
//           }}
//         >
//           <Tabs
//             activeKey={type}
//             onChange={setType}
//             centered
//             items={[
//               {
//                 key: 'account',
//                 label: intl.formatMessage({
//                   id: 'pages.login.accountLogin.tab',
//                   defaultMessage: '账户密码登录',
//                 }),
//               },
//               // {
//               //   key: 'mobile',
//               //   label: intl.formatMessage({
//               //     id: 'pages.login.phoneLogin.tab',
//               //     defaultMessage: '手机号登录',
//               //   }),
//               // },
//             ]}
//           />
//
//           {status === 'error' && loginType === 'account' && (
//             <LoginMessage
//               content={intl.formatMessage({
//                 id: 'pages.login.accountLogin.errorMessage',
//                 defaultMessage: '账户或密码错误(admin/ant.design)',
//               })}
//             />
//           )}
//           {type === 'account' && (
//             <>
//               <ProFormText
//                 name="userAccount"
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <UserOutlined />,
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.username.placeholder',
//                   defaultMessage: 'Username: admin1 or user_test',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.username.required"
//                         defaultMessage="Please enter your username!"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//               <ProFormText.Password
//                 name="userPassword"
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <LockOutlined />,
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.password.placeholder',
//                   defaultMessage: 'Password: 12345678',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.password.required"
//                         defaultMessage="Please enter your password！"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//             </>
//           )}
//
//           {status === 'error' && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
//           {type === 'mobile' && (
//             <>
//               <ProFormText
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <MobileOutlined />,
//                 }}
//                 name="mobile"
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.phoneNumber.placeholder',
//                   defaultMessage: '手机号',
//                 })}
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.phoneNumber.required"
//                         defaultMessage="请输入手机号！"
//                       />
//                     ),
//                   },
//                   {
//                     pattern: /^1\d{10}$/,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.phoneNumber.invalid"
//                         defaultMessage="手机号格式错误！"
//                       />
//                     ),
//                   },
//                 ]}
//               />
//               <ProFormCaptcha
//                 fieldProps={{
//                   size: 'large',
//                   prefix: <LockOutlined />,
//                 }}
//                 captchaProps={{
//                   size: 'large',
//                 }}
//                 placeholder={intl.formatMessage({
//                   id: 'pages.login.captcha.placeholder',
//                   defaultMessage: '请输入验证码',
//                 })}
//                 captchaTextRender={(timing, count) => {
//                   if (timing) {
//                     return `${count} ${intl.formatMessage({
//                       id: 'pages.getCaptchaSecondText',
//                       defaultMessage: '获取验证码',
//                     })}`;
//                   }
//                   return intl.formatMessage({
//                     id: 'pages.login.phoneLogin.getVerificationCode',
//                     defaultMessage: '获取验证码',
//                   });
//                 }}
//                 name="captcha"
//                 rules={[
//                   {
//                     required: true,
//                     message: (
//                       <FormattedMessage
//                         id="pages.login.captcha.required"
//                         defaultMessage="请输入验证码！"
//                       />
//                     ),
//                   },
//                 ]}
//                 onGetCaptcha={async (phone) => {
//                   const result = await getFakeCaptcha({
//                     phone,
//                   });
//                   if (!result) {
//                     return;
//                   }
//                   message.success('获取验证码成功！验证码为：1234');
//                 }}
//               />
//             </>
//           )}
//           <div
//             style={{
//               marginBottom: 24,
//             }}
//           >
//             <ProFormCheckbox noStyle name="autoLogin">
//               <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
//             </ProFormCheckbox>
//             <a
//               style={{
//                 float: 'right',
//               }}
//             >
//               <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
//             </a>
//           </div>
//         </LoginForm>
//       </div>
//       <Footer />
//     </div>
//   );
// };
//
// export default Login;
