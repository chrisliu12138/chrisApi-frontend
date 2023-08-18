import { listInterfaceInfoByPageUsingGET } from '@/services/chrisApi-backend/interfaceInfoController';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { message, Tag, theme } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const data = list.map((item) => ({
    id: item.id,
    title: item.name,
    subTitle:
      item.method === 'GET' ? <Tag color="volcano">GET</Tag> : <Tag color="geekblue">POST</Tag>,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: item.description,
  }));
  const loadData = async (page = 1, pageSize = 6) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current: page,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (e: any) {
      message.error('Failed to get interface information ' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer>
      <ProList
        pagination={{
          showTotal(total:number){
            return 'Total:'+ total;
          },
          pageSize: 6,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
        showActions="hover"
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onClick: () => {
              history.push(`/interface_info/${record.id}`);
              console.log(record.id);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
        }}
        headerTitle={' '}
        dataSource={data}
      />
    </PageContainer>
  );
};

export default Index;
