import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, selectFilter } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

function Pagination() {
  const { currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangePage = (evt) => {
    dispatch(setCurrentPage(evt.selected + 1));
  };

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={onChangePage}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
