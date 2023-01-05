import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
        <div className="full-pizza__loading">Загрузка...</div>
      ) : (
        <div className="full-pizza">
          <img
            className="full-pizza__image"
            src={pizza.imageUrl}
            width={450}
            height={450}
            alt={`Пицца ${pizza.title}`}
          />
          <h2 className="full-pizza__title">{pizza.title}</h2>
          <p className="full-pizza__price">{pizza.price} ₽</p>
        </div>
      )}
    </div>
  );
};

export default FullPizza;
