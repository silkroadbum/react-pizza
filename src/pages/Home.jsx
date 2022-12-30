import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoadnig] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);
  const [sortType, setSortType] = useState({});

  useEffect(() => {
    setIsLoadnig(true);

    const category = activeCategory ? `category=${activeCategory}` : '';
    const sortName = sortType;

    fetch(`https://63ac4a95da81ba97617fdf18.mockapi.io/items?${category}&sortBy=${sortName}`)
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoadnig(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, sortType]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategory} onChangeCategory={(i) => setActiveCategory(i)} />
        <Sort value={sortType} onChangeSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
