import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: '一人の境',
          title: '一人の境',
          href: 'https://noob.holic-x.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/holic-x',
          blankTarget: true,
        },
        {
          key: 'springboot-react-init',
          title: 'springboot-react-init',
          href: 'https://github.com/holic-x/springboot-react-init',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
