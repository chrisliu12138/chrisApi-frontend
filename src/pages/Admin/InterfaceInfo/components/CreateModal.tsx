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
