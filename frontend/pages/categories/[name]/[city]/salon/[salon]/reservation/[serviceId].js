import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../../../../../context/AuthContext";

export default function ServiceDescriptionPage() {
  const router = useRouter();
  const { serviceId, salon, name, city } = router.query; // Récupère les paramètres de l'URL
  const { token, user } = useContext(AuthContext); // Récupère le token et l'utilisateur connecté
  const [serviceDetails, setServiceDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await fetch("http://localhost:3001/account", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur lors de la récupération des informations du compte:", errorData);
          throw new Error(errorData.error || "Erreur inconnue");
        }

        const accountData = await response.json();
        console.log("Données du compte récupérées :", accountData);
      } catch (err) {
        console.error("Erreur lors de la récupération des informations du compte:", err);
        setError(err.message);
      }
    };

    if (token) {
      fetchAccountDetails();
    }
  }, [token]);

  console.log("Valeurs dans AuthContext :", { user, token });


  useEffect(() => {
    if (router.isReady && serviceId && token) {
      console.log("Service ID:", serviceId); // Vérifie si le serviceId est bien récupéré

      fetch(`http://localhost:3001/service-details/${serviceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Si tu utilises l'authentification
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errorData) => {
              // Afficher le message d'erreur complet pour le debug
              console.error("Erreur de l'API:", errorData);
              throw new Error(errorData.error || "Erreur inconnue");
            });
          }
          return res.json();
        })
        .then((data) => {
          setServiceDetails(data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du service:", error);
          setError(error.message);
        });
    }
  }, [router.isReady, serviceId, token]);

  // Gérer les erreurs ou le chargement
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!serviceDetails) {
    return <p>Chargement des détails du service...</p>;
  }

  // Fonction pour réserver le service
  const handleReservation = async () => {
    console.log("Données pour la réservation :");
    console.log("User:", user);
    console.log("User ID:", user?.id_user);
    console.log("Service ID:", serviceId);
    console.log("Salon ID:", serviceDetails?.id_salon);
    console.log("City:", city);
    console.log("Name:", name);
  
    if (!user || !user.id_user || !serviceId || !serviceDetails?.id_salon) {
      setError("Informations manquantes pour la réservation");
      return;
    }
  
    const reservationData = {
      serviceId: serviceId,
      userId: user.id_user, 
      salonId: serviceDetails.id_salon, 
      date: new Date().toISOString(), 
    };
  
    try {
      const response = await fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Erreur lors de la réservation");
        return;
      }
  
      const data = await response.json();
      setSuccess("Réservation effectuée avec succès !");
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      setError("Erreur interne lors de la réservation");
    }
  };
  

  return (
    <div>
      <h1>Détails du service : {serviceDetails.description}</h1>
      <p>Prix : {serviceDetails.price} €</p>
      <p>Durée : {serviceDetails.time} minutes</p>
      <p>{serviceDetails.longDescription}</p>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleReservation} style={{ padding: "10px 20px" }}>
        Réserver ce service
      </button>
    </div>
  );
}
