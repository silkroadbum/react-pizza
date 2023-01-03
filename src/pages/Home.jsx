import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { AppContext } from '../App';
import { setActiveCategory, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

function Home() {
  const { activeCategory, sortType, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoadnig] = useState(true);

  const { searchValue } = useContext(AppContext);

  useEffect(() => {
    setIsLoadnig(true);

    const category = activeCategory ? `&category=${activeCategory}` : '';
    const sortName = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://63ac4a95da81ba97617fdf18.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortName}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoadnig(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, sortType, searchValue, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setActiveCategory(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
