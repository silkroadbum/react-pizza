import React from 'react';
import { useSelector } from 'react-redux';

import { setActiveCategory, setCurrentPage } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';
import { categories } from '../components/Categories';

import { selectPizza } from '../redux/slices/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeCategory, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const isSearch = React.useRef(false);

  const getPizzas = async () => {
    const category = activeCategory ? `&category=${activeCategory}` : '';
    const sortName = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        sortName,
        order,
        search,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [activeCategory, sortType, searchValue, currentPage]);

  const onChangeCategory = React.useCallback(
    (index: number) => {
      dispatch(setActiveCategory(index));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={onChangeCategory} />
        <SortPopup value={sortType} />
      </div>
      <h2 className="content__title">{categories[activeCategory]} пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
          <Pagination page={currentPage} onChangePage={onChangePage} />
        </>
      )}
    </div>
  );
};

export default Home;
