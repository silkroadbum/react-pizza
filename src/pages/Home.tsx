import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setFilters, setActiveCategory, setCurrentPage } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/slices/pizza/types';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { sortNames } from '../components/SortPopup';
import { categories } from '../components/Categories';

import { selectPizza } from '../redux/slices/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeCategory, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

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

  // Если был первый рендер и были изменены параметры, то в URL добавляется строка запроса с фильтрами
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType.sortProperty,
  //       activeCategory,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activeCategory, sortType, searchValue, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sort = sortNames.find((obj) => obj.sortProperty === params.sortName);

  //     dispatch(
  //       setFilters({
  //         activeCategory: Number(params.category),
  //         currentPage: params.currentPage,
  //         inputValue: params.order,
  //         searchValue: params.search,
  //         sortType: sort || sortNames[0],
  //       }),
  //     );

  //     isSearch.current = true;
  //   }
  // }, [dispatch]);

  // Если был первый рендер, то заправшиваем пиццы
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, sortType, searchValue, currentPage]);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setActiveCategory(index));
  }, []);

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
