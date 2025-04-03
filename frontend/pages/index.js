import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Header from "../component/header";
import Link from "next/link";

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Redirige si l'utilisateur n'est pas connecté
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      console.log(localStorage.getItem('token'));

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
