import {
ProColumns
} from '@ant-design/pro-components';
import React from 'react';
import {ProTable} from "@ant-design/pro-table/lib";
import {Modal} from "antd";


export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const {values, visible, columns, onCancel, onSubmit} = props;
  return (<Modal visible ={visible} onCancel={()=>onCancel?.()}>
    <ProTable
      type="form"
      columns={columns}
      form={{
        initialValues: values
      }}
      onSubmit={async (value) => {
          onSubmit?.(value);
         }}
    />;
  </Modal>
  );
};

export default UpdateModal;
