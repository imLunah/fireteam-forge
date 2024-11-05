import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Fireteam Forge</h1>
      <div className="option-buttons">
        <Link to="./Create"> Create Guardian </Link>
        <Link to="./Gallery"> View Guardians </Link>
      </div>
     
    </div>
  )
}

export default Home;