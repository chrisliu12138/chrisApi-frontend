import {
ModalForm,ProColumns,ProFormText,
ProFormTextArea
} from '@ant-design/pro-components';
import { FormattedMessage,useIntl } from '@umijs/max';
import React from 'react';
import {ProTable} from "@ant-design/pro-table/lib";
import {Modal} from "antd";

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const {visible, columns} = props;
  return <Modal visible={visible}>
    <ProTable type="form" columns={columns} />;
  </Modal>
};

export default CreateModal;
