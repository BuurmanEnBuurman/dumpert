import style from "../styles/Home.module.css";
import Header from "../components/header";
const { URL } = process.env;

export default function Home(props) {
  return (
    <>
      <Header />
      <div className={style.center}>
        <div>
          please replace dumpert.nl to {props.URL} to see removed comments
        </div>
        <p>what is this site?</p>
        <p>
          by continus scraping of dumpert i am able to see and save
          comments/videos before they are removed
        </p>
        <p>
          when a user sees a removed comment he can replace dumpert.nl to <br />
          {props.URL} and see the removed comments by a left join from dumpert
          and my database
        </p>
        <p>
          example:
          <br />
          https://www.dumpert.nl/item/100026920_f0089181/
          <br />
          to
          <br />
          {props.URL}/item/100026920_f0089181/
          <br />
          or
          <br />
          {props.URL}/item?selectedId=100027744_d54603bb
        </p>
        <p>
          are you from telegraaf? please lookup the repo to find my contact
          details
        </p>
      </div>
    </>
  );
}

export async function getStaticProps(ctx) {
  // returns the base url so the url is not hard coded
  return {
    props: { URL },
  };
}
