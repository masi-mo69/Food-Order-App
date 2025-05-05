import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>غذای خوشمزه ، تحویل شما</h2>
      <p>
      غذای مورد علاقه خود را از میان مجموعه گسترده غذاهای موجود ما انتخاب کنید و از یک ناهار یا شام خوشمزه در خانه لذت ببرید.
      </p>
      <p>
      تمام وعده های غذایی ما با مواد اولیه مرغوب، به موقع و البته توسط سرآشپزهای مجرب طبخ می شود!
      </p>
    </section>
  );
};

export default MealsSummary;