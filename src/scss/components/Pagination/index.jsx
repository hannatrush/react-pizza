import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

const Pagination  = ({pageCount, onChangePage}) => {
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
    renderOnZeroPageCount={null}
    />
  )
}

export default Pagination;