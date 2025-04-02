import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Categorie() {
  const router = useRouter();
  const { id } = router.query; // Récupère l'ID de l'URL
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/categories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Données reçues du backend :", data); // 🔍 Debug ici
          setCategory(data);
        })
        .catch((err) => console.error("Erreur API :", err));
    }
  }, [id]);
  

  if (!category) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Catégorie : {category.name}</h1>
      <p>ID : {category.id}</p>
    </div>
  );
}
