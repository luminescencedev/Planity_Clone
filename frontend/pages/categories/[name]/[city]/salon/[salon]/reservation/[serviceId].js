import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../../../../context/AuthContext";
import TimePicker from "../../../../../../../component/TimePicker";

export default function ServiceDescriptionPage() {
  const router = useRouter();
  const { name, city, salon, serviceId } = router.query; // Récupère les paramètres de l'URL
  const { token, user } = useContext(AuthContext);

  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTime, setSelectedTime] = useState("09:00");

  useEffect(() => {
    if (router.isReady && serviceId && token) {
      fetch(`http://localhost:3001/service-details/${serviceId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setServiceDetails(data))
        .catch((err) => setError(err.message));
    }
  }, [router.isReady, salon, token]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!serviceDetails) return <p>Chargement...</p>;

  const handleReservation = () => {
    if (!user || !salon || !selectedTime) {
      alert("Toutes les informations sont requises !");
      return;
    }

    // Fonction pour formater l'heure en HH:MM:SS
    const formatTimeToHHMMSS = (selectedTime) => {
      const [hours, minutes] = selectedTime.split(":");
      return `${hours}:${minutes}:00`; // Ajouter ":00" pour les secondes
    };

    // Formater l'heure au format HH:MM:SS
    const formattedTime = formatTimeToHHMMSS(selectedTime);

    const reservationData = {
      userId: user.id,
      salonId: serviceDetails.id_salon,
      serviceId: serviceDetails.id_service,  // 🔥 Vérifie bien que cette ligne est présente !
      date: new Date().toISOString().split("T")[0],
      time: formattedTime,  // Utiliser l'heure formatée
    };

    fetch("http://localhost:3001/rendez-vous", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Erreur: " + data.error);
        } else {
          alert("Réservation réussie !");
        }
      })
      .catch(() => alert("Erreur lors de la réservation"));
  };
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  return (
    <div>
      {console.log("Service Details:", serviceDetails)}
      <h1>Service : {serviceDetails.description}</h1>
      <p>Prix : {serviceDetails.price} €</p>
      <p>Durée : {serviceDetails.time} min</p>
      <TimePicker selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      <button onClick={handleReservation} style={{ padding: "10px 20px" }}>
        Réserver
      </button>
    </div>
  );
}
