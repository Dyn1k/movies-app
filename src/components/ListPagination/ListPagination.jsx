/* eslint-disable */

import React from 'react';

import { Pagination } from 'antd';

import './ListPagination.css';

const ListPagination = ({ totalItems, onChangePage, page }) => {
  const showTotal = (total) => `Total ${total} items`;

  return (
    <Pagination
      className="list-pagination"
      size="small"
      pageSize="20"
      current={page}
      total={totalItems}
      showTotal={showTotal}
      showQuickJumper
      showSizeChanger={false}
      onChange={onChangePage}
    />
  );
};

ListPagination.defaultProps = {
  totalItems: 0,
};

export default ListPagination;
