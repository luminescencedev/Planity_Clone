import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext"; // Assurez-vous que le chemin est correct

export default function Categorie() {
  const router = useRouter();
  const { name } = router.query; // Récupère le nom de la catégorie dans l'URL
  const { token } = useContext(AuthContext); // Récupère le token depuis le contexte d'authentification
  const [category, setCategory] = useState(null);
  const [salons, setSalons] = useState([]);
  const [error, setError] = useState(null);

  // Effet de récupération de la catégorie et des salons associés
  useEffect(() => {
    if (name && token) {
      console.log("Nom de la catégorie:", name); // Débogage du nom de la catégorie

      // Récupérer la catégorie
      fetch(`http://localhost:3001/categories/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((errData) => {
              console.error("Erreur API (texte):", errData);
              throw new Error(errData || "Erreur inconnue");
            });
          }
          return res.json();
        })
        .then((data) => {
          console.log("Données de la catégorie:", data);
          setCategory(data);
        })
        .catch((err) => {
          console.error("Erreur API lors de la récupération de la catégorie:", err);
          setError("Impossible de charger la catégorie.");
        });

      // Récupérer les salons associés à la catégorie
      fetch(`http://localhost:3001/categories/${name}/salons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((errData) => {
              console.error("Erreur API (texte pour salons):", errData);
              throw new Error(errData || "Erreur inconnue");
            });
          }
          return res.json();
        })
        .then((salonsData) => {
          console.log("Données des salons :", salonsData);
          setSalons(salonsData);
        })
        .catch((err) => {
          console.error("Erreur API lors de la récupération des salons:", err);
          setError("Impossible de charger les salons.");
        });
    }
  }, [name, token]); // Effectuer la requête uniquement si le nom de la catégorie et le token sont disponibles

  if (!name || !token) return <p>Chargement...</p>; // Prévenir si id ou token manquants

  if (error) return <p style={{ color: "red" }}>{error}</p>; // Afficher l'erreur si elle existe

  if (!category) return <p>Chargement de la catégorie...</p>;

  return (
    <div>
      <h1>Catégorie : {category.name}</h1>

      <h2>Salons de cette catégorie :</h2>
      {salons.length === 0 ? (
        <p>Aucun salon trouvé pour cette catégorie.</p>
      ) : (
        <ul>
          {salons.map((salon) => (
            <li key={salon.id_salon}>
              <strong>{salon.name}</strong><br />
              <span>{salon.adress}</span><br />
              <span>{salon.city}</span><br />
              <img src={salon.picture} alt={salon.name} style={{ width: "100px", height: "100px" }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
