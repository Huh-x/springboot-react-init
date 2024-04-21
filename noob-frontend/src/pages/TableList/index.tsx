


import { useModel } from '@umijs/max';
import React, { useState } from 'react';


const TableList: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const { setInitialState } = useModel('@@initialState');
  
  return (
    
    // 页面信息定义
    <div className = "table-list">
      hello my list
    </div>
  
  );
};
export default TableList;