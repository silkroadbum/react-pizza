import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory, selectFilter } from '../redux/slices/filterSlice';

export const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Categories() {
  const { activeCategory } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangeCategory = (index) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
