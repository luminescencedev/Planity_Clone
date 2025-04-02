import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  // Redirige si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/allCategories", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Données reçues :", data);
          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            console.error("Erreur API :", data.error);
            setCategories([]); // Évite de planter si l'API retourne une erreur
          }
        })
        .catch((err) => console.error("Erreur lors du chargement :", err));
    }
  }, [token]);

  if (!token) return <p>Redirection en cours...</p>;

  return (
    <div>
      <h1>Accueil</h1>
      <ul>
        {categories.length === 0 ? (
          <p>Aucune catégorie trouvée.</p>
        ) : (
          categories.map((category) => (
            <li key={category.id_category}>{category.name}</li>
          ))
        )}
      </ul>
    </div>
  );
}
