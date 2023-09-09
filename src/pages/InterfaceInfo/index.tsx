// @ts-ignore
import {
  getInterfaceInfoByIdUsingGET,
  invokeInterfaceUsingPOST,
} from '@/services/chrisApi-backend/interfaceInfoController';
import {
  addUserInterfaceInfoUsingPOST,
  getUserInterfaceInfoByUserIdAndInterfaceInfoIdUsingGET,
} from '@/services/chrisApi-backend/userInterfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';

import { useModel } from '@umijs/max';
import { Button, Card, Descriptions, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const {initialState, setInitialState } = useModel('@@initialState');
  const [invokeLeftNum, setInvokeLeftNum] = useState<any>(0);
  const [invokeTotalNum, setInvokeTotalNum] = useState<any>(0);
  const placeholder = '示例：{"username": "chrisliu"}';

  const params = useParams();
  const onFinish = async (values: any) => {
    setInvokeLoading(true);
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      await addUserInterfaceInfoUsingPOST({
        userId: initialState?.loginUser?.id,
        interfaceInfoId: Number(params.id),
        leftNum: 10,
      });
      const res = await invokeInterfaceUsingPOST({
        id: Number(params.id),
        requestParams: values?.requestParams ?? '',
      });
      setInvokeRes(res.data);
      message.success('调用成功');
    } catch (error: any) {
      message.error('调用失败 ' + error.message);
    }
    setInvokeLoading(false);
  };
  const loadData = async () => {
    setLoading(true);
    if (!params.id) {
      message.error('Parameter does not exist');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
    } catch (e: any) {
      message.error('Failed to get interface information ' + e.message);
    }
    setLoading(false);
  };
  const getInvokeCount = async () => {
    try {
      const res = await getUserInterfaceInfoByUserIdAndInterfaceInfoIdUsingGET({
        userId: initialState?.loginUser?.id,
        interfaceInfoId: Number(params.id),
      });
      setInvokeLeftNum(res?.data?.leftNum);
      setInvokeTotalNum(res?.data?.totalNum);
    } catch (e: any) {
      message.error('Failed to get number of calls ' + e.message);
    }
  };
  useEffect(() => {
    loadData();
    getInvokeCount();
  }, []);
  return (
    <PageContainer>
      <Card loading={loading} title="Interface Info">
        {data ? (
          <Descriptions column={2}>
            <Descriptions.Item label="Interface Name">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="Interface Description">{data?.description}</Descriptions.Item>
            <Descriptions.Item label="Interface Status">{data?.status ? 'ON' : 'OFF'}</Descriptions.Item>
            <Descriptions.Item label="Interface Method">{data?.method}</Descriptions.Item>
            <Descriptions.Item label="Url">{data?.url}</Descriptions.Item>
            <Descriptions.Item label="Request Params">{data?.requestParams}</Descriptions.Item>
            <Descriptions.Item label="Request Header">
              &nbsp;&nbsp;&nbsp;{data?.requestHeader}
            </Descriptions.Item>
            <Descriptions.Item label="Response Header">
              &nbsp;&nbsp;&nbsp;{data?.responseHeader}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>Interface information does not exist</>
        )}
      </Card>
      <Card title="Request parameter" style={{ marginTop: 18 }}>
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          {Number(params?.id) === 1 ? (
            <Form.Item name="UserRequestParams">
              <Input.TextArea placeholder={placeholder} />
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={invokeLoading}>
              Invoke
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="Invocation result" style={{ marginTop: 18 }} loading={invokeLoading}>
        {invokeRes ? (
          <Descriptions column={2}>
            <Descriptions.Item>{invokeRes}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>Please click on the call first to get the result</>
        )}
      </Card>
      {/*{<Card title="调用次数" style={{ marginTop: 18 }}>*/}
      {/*  <Descriptions column={1}>*/}
      {/*    <Descriptions.Item label="总调用次数">{invokeTotalNum}</Descriptions.Item>*/}
      {/*    <Descriptions.Item label="剩余调用次数">{invokeLeftNum}</Descriptions.Item>*/}
      {/*  </Descriptions>*/}
      {/*</Card>}*/}
    </PageContainer>
  );
};
export default InterfaceInfo;
