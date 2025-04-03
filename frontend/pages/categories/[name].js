import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Header from '../../component/header.js';
import Footer from '../../component/footer';

export default function Categorie() {
  const router = useRouter();
  const { name } = router.query;
  const { token } = useContext(AuthContext);
  const [category, setCategory] = useState(null);
  const [salons, setSalons] = useState([]);
  const [error, setError] = useState(null);

  // Liste des 9 villes à afficher
  const villes = ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse", "Lille", "Nantes", "Strasbourg"];

  useEffect(() => {
    if (name && token) {
      fetch(`http://localhost:3001/categories/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCategory(data))
        .catch(() => setError("Impossible de charger la catégorie."));
    }
  }, [name, token]);

  if (!name || !token) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!category) return <p>Chargement de la catégorie...</p>;

  return (
    <>
         <main id="namesalon">
         <Header></Header>
         
         <h1>Réserver en ligne un RDV avec un coiffeur</h1>
         
         <form id="search" >
             <label for="name">
               <span>Que cherchez-vous?</span>
             <input type="text" id="name" name="name" placeholder="Nom du salon, prestations (coupe...)"></input>
             </label>
             <label for="adress">
               <span>Où</span>
             <input type="text" id="adress" name="adress" placeholder="Adresse, ville..."></input>
             </label>
             <button type="submit">Rechercher</button>
         </form>
         </main>
        <article id="listeville">
          <span>{category.name}</span>
            {villes.map((city) => (
          <a id="villea" key={city} href={`/categories/${name}/${city}`} style={{ marginRight: "10px" }}>
            
            <div>
              <img src="/imgville.jpeg"></img>
            <span>Découvrez nos</span>
            <h3>{category.name} à {city}</h3>
              
            </div>
          </a>
        ))}
        </article>
        <section id="conseils">
        
        <h4>Où trouver un salon pour une technique particulière ?</h4>
        
        <p>Les petits salons de coiffure dédiés spécialement à la gent masculine sont pris d’assaut. Savant mélange entre le barbier et le salon de coiffure traditionnel, ces nouveaux espaces proposent une prestation complète : <b>taille de barbe</b>, rasage à l’ancienne et <b>coupe de cheveux</b> pour une allure soignée et moderne. L’entretien de la barbe est une affaire sérieuse qui ne doit pas être prise à la légère. Il est parfois préférable de confier cette tâche à un professionnel, capable de choisir le modèle de barbe tendance qui mettra le mieux en valeur votre visage.
        </p>
        <img src="/salonimg.jpeg"></img>

        <p>
        Mais le souci du détail ne s’arrête plus aux <b>cheveux et à la barbe</b> . Aujourd’hui, les soins esthétiques gagnent du terrain, et les salons de manucure et de soins des pieds fleurissent en ville comme dans les petites communes françaises dynamiques. Prendre soin de ses ongles n’est plus une option : hommes et femmes accordent une importance croissante à leur apparence et à la santé de leurs mains et pieds.

        Parmi nos coups de cœur, Angel Studio, situé dans le 17ᵉ arrondissement, se distingue par son style décalé et son ambiance atypique. Ce salon mixte accueille hommes, femmes et enfants, proposant une expérience complète et raffinée pour ceux qui souhaitent soigner leur look jusqu’au bout des doigts. Que ce soit pour une coupe moderne, un rasage précis ou une manucure soignée, ces adresses tendance redéfinissent les codes de la beauté au masculin comme au féminin.</p>
        
        <h3>Recherches fréquentes</h3>
        <ul>
          <li><u>Soins de la barbe</u></li>
          <li><u>Rasage homme</u></li>
          <li><u>Taille de barbe rasoir</u></li>
          <li><u>Coiffure afro</u></li>
          <li><u>Coiffure femme</u></li>
          <li><u>Coupe enfant</u></li>
          <li><u>Patine</u></li>
          <li><u>Dépose</u></li>
          <li><u>Faux ongles</u></li>
          <li><u>Remplissage</u></li>
          <li><u>Etudiant</u></li>
          <li><u>Permanente</u></li>
          <li><u>Brushing</u></li>
          <li><u>Nouvel Hair</u></li>
          <li><u>Lissage et défrisage</u></li>
          <li><u>Coiffure jeunes</u></li>
          <li><u>Coloration barbe</u></li>
          
        </ul>
        </section>
      <Footer/>
    </>
  );
}
