import {
ProColumns
} from '@ant-design/pro-components';
import React, {useEffect, useRef} from 'react';
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

  const formRef = useRef<any>();

  //react的核心。基础语法，监听函数变化
  useEffect(()=>{
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  },[values])

  return (
    <Modal visible ={visible} footer={null} onCancel={()=>onCancel?.()}>
    <ProTable
      type="form"
      formRef={formRef}
      columns={columns}
      onSubmit={async (value) => {
          onSubmit?.(value);
         }}
    />;
  </Modal>
  );
};

export default UpdateModal;
