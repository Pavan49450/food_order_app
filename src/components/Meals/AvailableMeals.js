import React, { useEffect, useState } from 'react';
import './AvailableMeals.css';
import MealItem from './MealItem/MealItem';
import useHttps from '../../hooks/use-Https';
import LoadingAnimation from "../../Animations/LoadingAnimation"

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttps();
  const fetchMeals = (data) => {
    console.log("data",data);
    const loadedMeals = [];
    for (const id in data) {
      loadedMeals.push({
        id: id,
        name: data[id].name,
        description: data[id].description,   
        price: data[id].price,
      });
    }
    console.log("loadedMeals->",loadedMeals);
    setMeals(loadedMeals);  
  };

  useEffect(() => {
    fetchTasks(
      {
        url:
          'https://food-order-4151c-default-rtdb.firebaseio.com/meals.json/',
      },
      fetchMeals
    );
  }, []);

  const errorBlock =( 
    <secttion className="Meals_error">{error}</secttion>
  )
  const contentBlock =(
    !isLoading ? (!(Object.keys(meals).length === 0) && <section className="meals"><ul>
          {meals.map((meal) => (   
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul></section>) : (
        <LoadingAnimation/>    
      )
  )

  return ( 
    <>
    {error && errorBlock}
    {contentBlock}
    </>
  );
};

export default AvailableMeals;
