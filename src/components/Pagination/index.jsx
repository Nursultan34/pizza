import React from 'react'
import ReactPaginate  from 'react-paginate';
import styles from './Pagination.module.scss'

function Pagination({currentPage,onChangePage}) {
  return (
    <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => console.log(event)}
        pageRangeDisplayed={4}
        pageCount={3}
        onChangePage={(event) => onChangePage(event.selected +1)}
        previousLabel="< "
        forcePage={currentPage -1}
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination;