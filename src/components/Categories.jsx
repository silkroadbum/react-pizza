import { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'active' : ''}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
