import React from 'react';

import { Pagination } from 'antd';

import './ListPagination.css';
import PropTypes from 'prop-types';

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

ListPagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ListPagination;
