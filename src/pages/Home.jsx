import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { setFilters } from '../redux/slices/filterSlice';
import { setItems } from '../redux/slices/pizzaSlise';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { sortNames } from '../components/Sort';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeCategory, sortType, currentPage, searchValue } = useSelector(
    (state) => state.filter,
  );
  const items = useSelector((state) => state.pizza.items);
  const [isLoading, setIsLoadnig] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = async () => {
    setIsLoadnig(true);

    const category = activeCategory ? `&category=${activeCategory}` : '';
    const sortName = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const { data } = await axios.get(
        `https://63ac4a95da81ba97617fdf18.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortName}&order=${order}${search}`,
      );
      dispatch(setItems(data));
    } catch (error) {
      console.error('Ошибка получения данных с сервера', error);
    } finally {
      setIsLoadnig(false);
    }

    window.scrollTo(0, 0);
  };

  // Если был первый рендер и были изменены параметры, то в URL добавляется строка запроса с фильтрами
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        activeCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCategory, sortType, searchValue, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortNames.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sortType: sort }));
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то заправшиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, sortType, searchValue, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination />
    </div>
  );
}

export default Home;
