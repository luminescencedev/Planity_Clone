import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../../context/AuthContext";

export default function SalonPage() {
  const router = useRouter();
  const { salon, name, city } = router.query; // Utilisation du paramètre "salon" de l'URL
  const { token } = useContext(AuthContext);
  const [salonData, setSalonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (salon && token) {
      const salonName = encodeURIComponent(salon); // Encode le nom du salon pour éviter des erreurs

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

  if (!salonData) return <p>Chargement des données...</p>;

  const handleReservation = (serviceId) => {
    // Vérifier que serviceId est défini avant de procéder
    if (serviceId) {
      // Encoder les paramètres pour éviter les erreurs d'URL
      const encodedName = encodeURIComponent(name);
      const encodedCity = encodeURIComponent(city);
      const encodedSalon = encodeURIComponent(salon);

      // Construire l'URL de réservation
      const url = `/categories/${encodedName}/${encodedCity}/salon/${encodedSalon}/reservation/${encodeURIComponent(serviceId)}`;

      // Vérifier que l'URL n'a pas de double barre oblique
      if (!url.includes('//')) {
        router.push(url);
      } else {
        console.error("L'URL générée est invalide:", url);
      }
    } else {
      console.error("L'ID du service est manquant.");
    }
  };

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

      <h3>Services proposés :</h3>
      {Array.isArray(salonData.services) && salonData.services.length === 0 ? (
        <p>Aucun service proposé pour ce salon.</p>
      ) : (
        <ul>
          {Array.isArray(salonData.services) ? (
            salonData.services.map((service) => (
              <li key={service.id_service}>
                <strong>{service.description}</strong>: {service.price} € - {service.time} minutes
                <button
                  onClick={() => handleReservation(service.id_service)} // Passer l'ID du service
                  style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
                >
                  Réserver
                </button>
              </li>
            ))
          ) : (
            <p>Aucun service disponible pour ce salon.</p>
          )}
        </ul>
      )}
    </div>
  );
}
