import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido a NutriLove</h1>
      <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
}

export default Home;
