import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../../context/AuthContext";

export default function SalonPage() {
  const router = useRouter();
  const { salon } = router.query; // Utilisation du paramètre "salon" de l'URL
  const { token } = useContext(AuthContext);
  const [salonData, setSalonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (salon && token) {
      const salonName = encodeURIComponent(salon); // Encode le nom du salon pour éviter des erreurs
      console.log("Nom du salon encodé:", salonName);

      fetch(`http://localhost:3001/salon/${salonName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erreur de récupération des données du salon");
          return res.json();
        })
        .then((data) => {
          console.log("Données du salon:", data);
          setSalonData(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données du salon:", error);
          setError("Erreur lors de la récupération des données");
        });
    }
  }, [salon, token]);

  if (!salon || !token) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Si salonData est null, cela signifie que la donnée n'a pas encore été récupérée
  if (!salonData) return <p>Chargement des données...</p>;

  return (
    <div>
      <h1>{salonData.name}</h1>
      <p>{salonData.adress}</p>
      <p>{salonData.city}</p>
      <img src={salonData.picture} alt={salonData.name} style={{ width: "200px", height: "200px" }} />
      <p>{salonData.description}</p>

      <h3>Avis :</h3>
      {salonData.reviews.length === 0 ? (
        <p>Aucun avis disponible pour ce salon.</p>
      ) : (
        <ul>
          {salonData.reviews.map((review) => (
            <li key={review.id_review}>
              <strong>{review.rating}/5</strong> - {review.description}
            </li>
          ))}
        </ul>
      )}

      <h3>Note moyenne :</h3>
      <p>{Number(salonData.moyenne_rating).toFixed(1)} / 5</p>

      <button onClick={() => router.push(`/categories/${salonData.id_category}/salon/${salonData.name}/rdv`)}>
        Prendre RDV
      </button>
    </div>
  );
}
