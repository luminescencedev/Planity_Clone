import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext); // Vérifier si l'utilisateur est connecté
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  // Redirige vers /login si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/allCategories", {
        headers: { Authorization: `Bearer ${token}` }, // Envoi du token JWT
      })
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Erreur lors du chargement :", err));
    }
  }, [token]);

  if (!token) return <p>Redirection en cours...</p>; // Affiche un message pendant la redirection

  return (
    <div>
      <h1>Accueil</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id_category}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}