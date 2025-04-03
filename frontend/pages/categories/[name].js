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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // État de chargement

  // Liste des 9 villes à afficher
  const villes = ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice", "Toulouse", "Lille", "Nantes", "Strasbourg"];

  // Attendre que le token soit disponible avec un délai (par exemple 2 secondes)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (token === undefined) return;
      if (!token) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, 10);


    return () => clearTimeout(timeoutId);
  }, [token, router]);

  // Charger la catégorie si le token est valide
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

  if (loading) return <p>Chargement...</p>; // Afficher un message de chargement si le token n'est pas encore disponible
  if (!name || !token) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!category) return <p>Chargement de la catégorie...</p>;

  return (
    <>
      <main id="namesalon">
        <Header></Header>
        <h1>Réserver en ligne un RDV avec un {category.name}</h1>
        <form id="search" >
          <label htmlFor="name">
            <span>Que cherchez-vous?</span>
            <input type="text" id="name" name="name" placeholder="Nom du salon, prestations (coupe...)" />
          </label>
          <label htmlFor="adress">
            <span>Où</span>
            <input type="text" id="adress" name="adress" placeholder="Adresse, ville..." />
          </label>
          <button type="submit">Rechercher</button>
        </form>
      </main>
      <article id="listeville">
        <span>{category.name}</span>
        {villes.map((city) => (
          <a id="villea" key={city} href={`/categories/${name}/${city}`} style={{ marginRight: "10px" }}>
            <div>
              <img src="/imgville.jpeg" alt="City" />
              <span>Découvrez nos</span>
              <h3>{category.name} à {city}</h3>
            </div>
          </a>
        ))}
      </article>
      <section id="conseils">
        <h4>Où trouver un salon pour une technique particulière ?</h4>
        <p>Les petits salons de coiffure dédiés spécialement à la gent masculine sont pris d’assaut...</p>
        <img src="/salonimg.jpeg" alt="Salon" />
        <p>Mais le souci du détail ne s’arrête plus aux <b>cheveux et à la barbe</b>...</p>
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
      <Footer />
    </>
  );
}
