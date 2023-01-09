import React from 'react';

export const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}>
              {category}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;
