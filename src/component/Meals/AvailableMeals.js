import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import { useEffect , useState } from 'react';

const AvailableMeals = () => {
  const [ meals , setMeals ] = useState([]);
  const [ isLoading , setIsLoading ] = useState(true);
  const [ httpError , setHttpError ] = useState();

  /*Recieve data from firebase database*/
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-ef6d7-default-rtdb.firebaseio.com/meals.json'
      );

      if(!response.ok) {
        throw new Error('مشکلی پیش آمد.');
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for( const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message)
    });
    
  }, []);

  if(isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>در حال بارگذاری ...</p>
      </section>
    )
  }

  if(httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

    const mealsList = meals.map((meal) => (
        <MealItem 
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    
    ))
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );

}
export default AvailableMeals;