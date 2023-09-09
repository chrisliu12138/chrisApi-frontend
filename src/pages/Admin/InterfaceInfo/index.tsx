// @ts-nocheck
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST
} from "@/services/chrisApi-backend/interfaceInfoController";
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';

import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';

import type {SortOrder} from "antd/lib/table/interface";


const InterfaceInfo: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo>([]);
  const [currentId, setCurrentId] = useState<number>();

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
    const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('Adding');
    try {
      await addInterfaceInfoUsingPOST({ ...fields });
      hide();
      message.success('Added successfully');
      actionRef.current?.reload(); //添加成功自动刷新
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      message.error('Adding failed, please try again!'+ error.message);
      return false;
    }
  };


  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
      if (!currentRow) {
        return;
      }
      const hide = message.loading('Modifying');
      try {
        await updateInterfaceInfoUsingPOST({
          id: currentRow.id,
          ...fields,
        });
        hide();
        message.success('Modified successfully');
        // actionRef.current?.reload(); //修改成功自动刷新
        return true;
      } catch (error: any) {
        hide();
        message.error('Modification failed, please try again! ' + error.message);
        return false;
      }
    };
  /**
   *  发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('Online');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('Online successfully and will refresh soon');
      actionRef.current?.reload(); //发布成功自动刷新
      return true;
    } catch (error: any) {
      hide();
      message.error('Online failed, please try again ' + error.message);
      return false;
    }
  };

  /**
   *  下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('Offline');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('Offline successfully and will refresh soon');
      actionRef.current?.reload(); //下线成功自动刷新
      return true;
    } catch (error: any) {
      hide();
      message.error('Offline failed, please try again ' + error.message);
      return false;
    }
  };
  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('Deleting');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record.id
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload(); //删除成功自动刷新
      return true;
    } catch (error: any) {
      hide();
      message.error('Delete failed, please try again' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      valueType: 'index',
      hideInTable: true,
    },
    {
      title: 'Interface Name',
      dataIndex: 'name',
      valueType: 'text',
      // 增加校验(官方文档的方法)
      formItemProps: {
        rules:[{
          required: true,
        }]
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'RequestParams',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      // hideInTable: true,

    },
    {
      title: 'RequestHeader',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      hideInSearch: true,
    },
    {
      title: 'ResponseHeader',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'Url',
      dataIndex: 'url',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'OFF',
          status: 'Default',
        },
        1: {
          text: 'ON',
          status: 'Processing',
        },
      },
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true, //在表单项中隐藏
      // hideInTable: true,

    },
    {
      title: 'UpdateTime',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInTable: true,

    },
    {
      title: 'Operating',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          type="text"
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          Modify
        </a>,

        record.status === 0 ? <Button
          type="text"
          key="online"
          onClick={() => {
            handleOnline(record);
            // setCurrentRow(record);
          }}
        >
          Online
        </Button> : null,
        record.status === 1 ? <Button
          type="text"
          danger
          key="offline"
          onClick={() => {
            handleOffline(record);
            // setCurrentRow(record);
          }}
        >
          Offline
        </Button> : null,

        <Button
          type="text"
          danger
          key="config"
          onClick={() => {
            handleRemove(record);
          }}
        >
          Delete
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry Form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res: any = await listInterfaceInfoByPageUsingGET({
            ...params
        })
        if (res.data) {
          return {
            data : res.data.records || [],
            success: true,
            total:res?.data.total,
          }
        } else {
          return {
            data: [],
            success: false,
            total: 0,
          }
        }
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}



      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      {/*<SettingDrawer*/}
      {/*  width={600}*/}
      {/*  open={showDetail}*/}
      {/*  onClose={() => {*/}
      {/*    setCurrentRow(undefined);*/}
      {/*    setShowDetail(false);*/}
      {/*  }}*/}
      {/*  closable={false}*/}
      {/*>*/}
      {/*  {currentRow?.name && (*/}
      {/*    <ProDescriptions<API.RuleListItem>*/}
      {/*      column={2}*/}
      {/*      title={currentRow?.name}*/}
      {/*      request={async () => ({*/}
      {/*        data: currentRow || {},*/}
      {/*      })}*/}
      {/*      params={{*/}
      {/*        id: currentRow?.name,*/}
      {/*      }}*/}
      {/*      columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</SettingDrawer>*/}
      <CreateModal columns={columns} onCancel={()=>{handleModalVisible(false)}} onSubmit={(values)=>{handleAdd(values)}} visible={createModalVisible} />
    </PageContainer>
  );
};

export default InterfaceInfo;

// export default InterfaceInfo;
