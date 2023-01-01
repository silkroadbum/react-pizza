import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

function Pagination() {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(evt) => console.log(evt)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
