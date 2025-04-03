import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

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
    <div>
      <h1>Catégorie : {category.name}</h1>

      <h2>Choisissez une ville :</h2>
      <div>
        {villes.map((city) => (
          <a key={city} href={`/categories/${name}/${city}`} style={{ marginRight: "10px" }}>
            <div>
              {city}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
