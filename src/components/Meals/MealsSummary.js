import classes from "./MealsSummary.module.css";
import { BiFoodMenu } from "react-icons/bi";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>건강한 식습관의 시작, 우리 식당에서 즐기는 건강한 맛!</h2>
      <p>
        맛있는 음식이 당신을 기다립니다. 당신의 입맛을 선택하세요!    
        <h2 style={{'padding-left': '10px'}}>
          <BiFoodMenu />
        </h2>
      </p>
      {/* <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p> */}
    </section>
  );
};

export default MealsSummary;
