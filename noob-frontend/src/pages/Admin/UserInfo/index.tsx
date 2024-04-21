import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

// 引入用户信息管理相关API
import { addUserUsingPost, batchDeleteUserUsingPost, deleteUserUsingPost, handleUserStatusUsingPost, listUserVoByPageUsingPost, updateUserUsingPost } from '@/services/noob-template/userController';

// 接入自定义模态框或组件（新增、修改）
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';

const TableList: React.FC = () => {

  // 新增窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  // 抽屉式弹窗（查看详情）
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 单选、多选 
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserVO[]>([]);

/**
 * 添加节点
 */
const handleAdd = async (fields: API.UserAddRequest) => {
  // 设置加载提示
  const hide = message.loading('正在请求操作...');
    try {
      // 添加操作
      await addUserUsingPost({
        ...fields,
      });
      hide();
      // 操作成功提示
      message.success('新增成功');
      // 操作成功则关闭这个模态框
      handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      // 否则提示操作失败+报错信息
      message.error('新增失败，' + error.message);
      return false;
    }
};

/**
 * 更新节点
 */
const handleUpdate = async (fields: API.UserUpdateRequest) => {
  // 如果没有选中行直接返回 
  if(!currentRow){
    return ;
  }
  const hide = message.loading('正在请求操作...');
  try {
    // 调用后台接口执行修改操作
    await updateUserUsingPost({
      id: currentRow.id,
      ...fields,
    });
    hide();
    // 操作成功提示信息
    message.success('更新成功');
    return true;
  } catch (error:any) {
    hide();
    // 否则提示操作失败+报错信息
    message.error('更新失败，'+error.message);
    return false;
  }
};

/**
 * 删除节点
 */
const handleRemove = async (record: API.DeleteRequest) => {
  // 设置加载提示
  const hide = message.loading('正在请求操作...');
  if (!record) return true;
  try {
    await deleteUserUsingPost({
      // 根据id删除数据
      id: record.id
    });
    hide();
    // 操作成功提示信息
    message.success('删除成功');
    // 操作成功自动刷新表单
    actionRef.current?.reload();
    return true;
  } catch (error: any) {
    hide();
     // 否则提示操作失败+报错信息
    message.error('删除失败，' + error.message);
    return false;
  }
};

/**
 * 激活用户
 */
const handleActive = async (record: API.UserStatusUpdateRequest) => {
  // 设置加载中的提示为'正在处理'
  const hide = message.loading('正在处理');
  if (!record) return true;
  try {
     // 调用接口
    await handleUserStatusUsingPost({
      id: record.id,
      operType: 'active'
    });
    hide();
    // 如果调用成功会提示'处理成功'
    message.success('激活成功');
    // 处理成功自动刷新表单
    actionRef.current?.reload();
    return true;
  } catch (error: any) {
    hide();
     // 否则提示操作失败+报错信息
    message.error('激活失败，' + error.message);
    return false;
  }
};

/**
 * 禁用用户
 */
const handleForbid = async (record: API.UserStatusUpdateRequest) => {
  // 设置加载中的提示为'正在处理'
  const hide = message.loading('正在处理');
  if (!record) return true;
  try {
     // 调用接口
    await handleUserStatusUsingPost({
      id: record.id,
      operType: 'forbid'
    });
    hide();
    // 如果调用成功会提示'处理成功'
    message.success('禁用成功');
    // 处理成功自动刷新表单
    actionRef.current?.reload();
    return true;
  } catch (error: any) {
    hide();
     // 否则提示操作失败+报错信息
    message.error('禁用失败，' + error.message);
    return false;
  }
};

/**
 * 批量删除节点
 */
const handleBatchRemove = async (selectedRows: API.BatchDeleteRequest) => {
  // 设置加载提示
  const hide = message.loading('正在请求操作...');
  // 如果当前没有选择则返回（不执行任何操作）
  if (!selectedRows) return true;
  console.log('当前选中行数据：',selectedRows);
  // 执行删除操作
  try {
    await batchDeleteUserUsingPost({
      // 根据id删除数据（将多选的id行封装为列表数据）
      idList: selectedRows.map((row) => row.id),
    });

    hide();
    // 操作成功提示信息
    message.success('删除成功');
    // 操作成功自动刷新表单
    actionRef.current?.reload();
    return true;
  } catch (error: any) {
    hide();
     // 否则提示操作失败+报错信息
    message.error('删除失败，' + error.message);
    return false;
  }
};

  // 列表信息定义
  const columns: ProColumns<API.UserVO>[] = [
    {
      title: '用户id',
      dataIndex: 'id',
      valueType:'index',
      // tip: 'The rule name is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '用户账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      formItemProps:{
        rules:[{
          required:true, // 设置必填项
          message:"请输入", // 设置提示信息
        }]
      }
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps:{
        rules:[{
          required:true, // 设置必填项
          message:"请输入", // 设置提示信息
        }]
      }
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      // valueType: 'text',
      valueType: 'image', // 图片格式
      formItemProps:{},
      hideInSearch: true, // 在搜索组件中隐藏
    },
    // 下拉框（用户角色：user、admin）
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text',
      formItemProps:{},
      valueEnum: {
        'user': {
          text: '普通用户',
        },
        'admin': {
          text: '管理员',
        },
      },
    },
    {
      title: '用户状态',
      dataIndex: 'userStatus',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
      hideInForm: true
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm:true, // 在表单组件中隐藏
      hideInSearch: true, // 在搜索组件中隐藏
      hidden: false
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm:true, // 在表单组件中隐藏
      hideInSearch: true, // 在搜索组件中隐藏
    },
    // 接口信息管理操作配置定义
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="operate"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,

        record.userStatus===0?
        <a key="active" 
           onClick={()=>{
            handleActive(record);
           }}>
          激活
        </a>:null,

        record.userStatus===1?
        <a key="forbid" 
           onClick={()=>{
            handleForbid(record);
           }}>
          禁用
        </a>:null,

        <a key="delete" 
           onClick={()=>{
            // 触发删除操作
            handleRemove(record);
           }}>
          删除
        </a>,
        
      ],
    },
  ];

  // ------ start 组件定义 ------------
  return (
    <PageContainer>
      <ProTable<API.UserVO, API.PageParams>
        headerTitle={'数据信息'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        // 原脚手架默认调用API接口 request={rule}；request={listInterfaceInfoByPageUsingPost}直接调用的话无法渲染，因为响应数据交互不匹配

        // 根据request规则，重新编写请求和响应处理
        request={async (params, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[] | null>) => {
          const res = await listUserVoByPageUsingPost({
            ...params
          })
          if (res?.data) {
            return  {
              data: res?.data.records || [],
              success: true,
              total: res.total,
            }
          }
        }}
        
        // 列属性定义
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      
      {
        // 如果多选选择，则显示操作栏
        selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                {/* 共 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万 */}
                共 {selectedRowsState.length} 项
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              // 批量操作
              await handleBatchRemove(selectedRowsState);
              // 操作成功清空多选
              setSelectedRows([]);
              // 重置表单
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          {/* <Button type="primary">批量操作</Button> */}
        </FooterToolbar>
      )}

      <UpdateModal columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        // 传递信息修改为visible
        visible={ updateModalOpen }
        values={currentRow || {}}
      />

      {/* 定义抽屉式弹窗：查看用户信息详情 */}
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.userAccount && (
          <ProDescriptions<API.UserVO>
            column={2}
            title={currentRow?.userAccount}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserVO>[]}
          />
        )}
      </Drawer>


    {/* 创建一个CreateModal组件，用于在点击新增按钮时弹出 */}
    <CreateModal
      columns={columns}
      // 当取消按钮被点击时,设置更新模态框为false以隐藏模态窗口
      onCancel={() => {
        handleModalOpen(false);
      }}
      // 当用户点击提交按钮之后，调用handleAdd函数处理提交的数据，去请求后端添加数据(这里的报错不用管,可能里面组件的属性和外层的不一致)
      onSubmit={(values) => {
        handleAdd(values);
      }}
      // 根据更新窗口的值决定模态窗口是否显示
      visible={createModalOpen}
    />

    </PageContainer>
  );
  // ------ end 组件定义 ------------

};

export default TableList;