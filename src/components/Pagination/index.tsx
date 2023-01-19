import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
  pageCount: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({pageCount, onChangePage}) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={3}
    forcePage={pageCount -1}
    />
  )
}

export default Pagination;