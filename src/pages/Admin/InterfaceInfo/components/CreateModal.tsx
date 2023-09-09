import {
ProColumns
} from '@ant-design/pro-components';
import { FormattedMessage,useIntl } from '@umijs/max';
import React from 'react';
import {ProTable} from "@ant-design/pro-table/lib";
import {Modal} from "antd";
import {values} from "lodash";

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns, onCancel, onSubmit} = props;
  return (<Modal visible ={visible} footer={null} onCancel={()=>onCancel?.()}>
    <ProTable
      type="form"
      columns={columns}
      onSubmit={async (value) => {
          onSubmit?.(value);
         }}
    />;
  </Modal>
  );
};

export default CreateModal;

// import type { ProColumns } from '@ant-design/pro-components';
// import {
//   ModalForm,
//   ProForm,
//   ProFormSelect,
//   ProFormText,
//   ProFormTextArea,
// } from '@ant-design/pro-components';
// import '@umijs/max';
// import { Form } from 'antd';
// import React from 'react';
//
// export type Props = {
//   values: ProColumns<API.InterfaceInfo>[];
//   onCancel: () => void;
//   onFinish: (values: API.InterfaceInfo) => Promise<boolean>;
//   visible: boolean;
// };
//
// const CreateModal: React.FC<Props> = (props) => {
//   const [form] = Form.useForm<{ name: string; company: string }>();
//   const { visible, values, onCancel, onFinish } = props;
//
//   return (
//     /*<Modal visible={visible} footer={null} style={{border: 20}} onCancel={() => onCancel?.()}>
//       <ProTable
//         type="form"
//         columns={columns}
//         onSubmit={async (value) => {
//           onSubmit?.(value);
//         }}
//       />
//     </Modal>*/
//     <ModalForm
//       autoFocusFirstInput
//       visible={visible}
//       form={form}
//       modalProps={{
//         destroyOnClose: true,
//         onCancel: () => onCancel?.(),
//       }}
//       onFinish={async (values) => {
//         onFinish?.(values);
//       }}
//     >
//       <ProForm.Group>
//         <ProFormText
//           width="md"
//           name="name"
//           label="接口名称"
//           tooltip="最长为 24 位"
//           placeholder="请输入接口名称"
//         />
//
//         <ProFormText width="md" name="description" label="接口描述" placeholder="请输入接口描述" />
//       </ProForm.Group>
//       <ProForm.Group>
//         <ProFormText width="md" name="url" label="接口地址" placeholder="请输入接口地址" />
//
//         <ProFormSelect
//           width="md"
//           name="method"
//           label="请求类型"
//           options={[
//             {
//               value: 'GET',
//               label: 'GET',
//             },
//             {
//               value: 'POST',
//               label: 'POST',
//             },
//           ]}
//           placeholder="请输入请求类型"
//         />
//       </ProForm.Group>
//       <ProForm.Group>
//         <ProFormTextArea
//           width="md"
//           name="requestParams"
//           tooltip="请以JSON格式输入"
//           label="请求参数"
//           placeholder="请输入请求参数"
//         />
//
//         <ProFormTextArea
//           width="md"
//           name="requestHeader"
//           label="请求头"
//           tooltip="请以JSON格式输入"
//           placeholder="请输入请求头"
//         />
//
//         <ProFormTextArea
//           width="md"
//           name="responseHeader"
//           label="响应头"
//           tooltip="请以JSON格式输入"
//           placeholder="请输入响应头"
//         />
//       </ProForm.Group>
//     </ModalForm>
//   );
// };
// export default CreateModal;

