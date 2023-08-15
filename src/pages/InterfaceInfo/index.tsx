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
  const { initialState, setInitialState } = useModel('@@initialState');
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
        userId: initialState?.currentUser?.id,
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
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res?.data);
    } catch (e: any) {
      message.error('获取接口信息失败 ' + e.message);
    }
    setLoading(false);
  };
  const getInvokeCount = async () => {
    try {
      const res = await getUserInterfaceInfoByUserIdAndInterfaceInfoIdUsingGET({
        userId: initialState?.currentUser?.id,
        interfaceInfoId: Number(params.id),
      });
      setInvokeLeftNum(res?.data?.leftNum);
      setInvokeTotalNum(res?.data?.totalNum);
    } catch (e: any) {
      message.error('获取调用次数失败 ' + e.message);
    }
  };
  useEffect(() => {
    loadData();
    getInvokeCount();
  }, []);
  return (
    <PageContainer>
      <Card loading={loading} title="接口信息">
        {data ? (
          <Descriptions column={2}>
            <Descriptions.Item label="接口名称">{data?.name}</Descriptions.Item>
            <Descriptions.Item label="接口描述">{data?.description}</Descriptions.Item>
            <Descriptions.Item label="接口状态">{data?.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="接口方法">{data?.method}</Descriptions.Item>
            <Descriptions.Item label="接口地址">{data?.url}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data?.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">
              &nbsp;&nbsp;&nbsp;{data?.requestHeader}
            </Descriptions.Item>
            <Descriptions.Item label="响应头">
              &nbsp;&nbsp;&nbsp;{data?.responseHeader}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口信息不存在</>
        )}
      </Card>
      <Card title="请求参数" style={{ marginTop: 18 }}>
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          {Number(params?.id) === 1 ? (
            <Form.Item name="requestParams">
              <Input.TextArea placeholder={placeholder} />
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={invokeLoading}>
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="调用结果" style={{ marginTop: 18 }} loading={invokeLoading}>
        {invokeRes ? (
          <Descriptions column={2}>
            <Descriptions.Item>{invokeRes}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>请先点击调用获取结果</>
        )}
      </Card>
      {/*<Card title="调用次数" style={{ marginTop: 18 }}>
        <Descriptions column={1}>
          <Descriptions.Item label="总调用次数">{invokeTotalNum}</Descriptions.Item>
          <Descriptions.Item label="剩余调用次数">{invokeLeftNum}</Descriptions.Item>
        </Descriptions>
      </Card>*/}
    </PageContainer>
  );
};
export default InterfaceInfo;
