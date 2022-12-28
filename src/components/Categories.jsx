import { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickActiveCategory = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              onClick={() => onClickActiveCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
