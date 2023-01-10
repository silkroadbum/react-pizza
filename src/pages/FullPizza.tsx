import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { nameTypes } from '../components/PizzaBlock';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63ac4a95da81ba97617fdf18.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        navigate('/');
        console.error('Ошибка получения данных о пицце', error);
      }
    }

    fetchPizza();
  }, [id, navigate]);

  return (
    <div className="container">
      {!pizza ? (
        <div className="pizza-full">
          <div className="pizza-full__loading">Загрузка...</div>
        </div>
      ) : (
        <div className="pizza-full">
          <img
            className="pizza-full__image"
            src={pizza.imageUrl}
            width={350}
            height={350}
            alt={`Пицца ${pizza.title}`}
          />
          <h2 className="pizza-full__title">{pizza.title}</h2>
          <p className="pizza-full__type">
            Тип теста: {pizza.types.map((item) => `${nameTypes[item]} `)}
          </p>
          <p className="pizza-full__size-info">
            Размеры: {pizza.sizes.map((item) => `${item}см `)}
          </p>
          <p className="pizza-full__price">Цена: {pizza.price} ₽</p>
          <Link to="/" className="button" type="button">
            На главную
          </Link>
        </div>
      )}
    </div>
  );
};

export default FullPizza;
