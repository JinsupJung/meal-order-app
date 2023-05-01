import {useState, useCallback, useEffect} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setHttpError(null);
    try {
      const response = await fetch(
        "https://react-http-b8ea6-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      const loadedMeals = [];

      let firstKey = Object.keys(data);
      for (const key in data[firstKey]) {
        const newMemberObj = {
          ...data[firstKey][key],
        };
        // 빈 배열에 push 후
        loadedMeals.push(newMemberObj);
      }
      // console.log('loadedMeals = ',loadedMeals);

      const transformedMeals = loadedMeals.map((mealData) => {
        return {
          key: mealData.id, 
          id: mealData.id,
          name: mealData.name,
          description: mealData.description,
          price: mealData.price,
        };
      });
      setMeals(transformedMeals);
      // console.log('transformedMeals = ',transformedMeals);
    } catch (error) {
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);


  
  // async function  addMealsHandler(movie) {
  //   try {
  //     const response = await fetch(
  //       "https://react-http-b8ea6-default-rtdb.firebaseio.com/meals.json",
  //       {
  //         method: "POST", //메소드 지정
  //         headers: {
  //           //데이터 타입 지정
  //           "Content-Type": "application/json; charset=utf-8",
  //         },
  //         body: JSON.stringify(DUMMY_MEALS), //실제 데이터 파싱하여 body에 저장
  //       }
  //     )
  //       .then((res) => res.json()) // 리턴값이 있으면 리턴값에 맞는 req 지정
  //       .then((res) => {
  //         console.log(res); // 리턴값에 대한 처리
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       if (!response.ok) {
  //         throw new Error("Post error");
  //       }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const mealsList = DUMMY_MEALS.map((meal) => (
    let mealsList = <p>Found no meals...</p>;
    if (meals.length > 0) {
      mealsList = meals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      ));
    }

  if (httpError) {
    mealsList = <p>{httpError} </p>;
  }
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
      <div class="lds-dual-ring"></div> 

      </section>
    )
    // <span>Loading...</span>;
    //
    //<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  }

  return (
    <section className={classes.meals}>
      {/* <button onClick={addMealsHandler}> Upload</button> */}
      {isLoading && <div class="lds-dual-ring"></div>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
