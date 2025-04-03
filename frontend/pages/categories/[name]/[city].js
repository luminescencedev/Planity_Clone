import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";

export default function SalonsParVille() {
  const router = useRouter();
  const { name, city } = router.query;
  const { token } = useContext(AuthContext);
  const [salons, setSalons] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    if (name && city && token) {
      console.log('Token:', token); // Ajoute un log pour vérifier le token
      fetch(`http://localhost:3001/categories/${name}/salons?city=${city}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erreur API : " + res.statusText); // Log plus détaillé pour l'erreur
          return res.json();
        })
        .then((data) => {
          setSalons(data);
          const initialDetailsState = data.reduce((acc, salon) => {
            acc[salon.id_salon] = false;
            return acc;
          }, {});
          setShowDetails(initialDetailsState);
        })
        .catch((err) => setError("Erreur lors de la récupération des salons : " + err.message)); // Log de l'erreur détaillée
    }
  }, [name, city, token]);

  if (!name || !city || !token) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const toggleDetails = (id_salon) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id_salon]: !prevState[id_salon],
    }));
  };

  return (
    <div>
      <h1>Salons de la catégorie {name} à {city}</h1>
      {salons.length === 0 ? (
        <p>Aucun salon trouvé pour {city}.</p>
      ) : (
        <ul>
          {salons.map((salon) => (
            <li key={salon.id_salon} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
              <strong>{salon.name}</strong><br />
              <span>{salon.adress}</span><br />
              <img src={salon.picture} alt={salon.name} style={{ width: "100px", height: "100px" }} />
              <p>: {salon.moyenne_rating ? Number(salon.moyenne_rating).toFixed(1) : "N/A"}</p>

              <button 
                onClick={() => toggleDetails(salon.id_salon)} 
                style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
              >
                {showDetails[salon.id_salon] ? "Moins d’informations" : "Plus d’informations"}
              </button>

              {showDetails[salon.id_salon] && (
                <div>
                  <h3>Avis des clients :</h3>
                  {salon.reviews.length === 0 ? (
                    <p>Aucun avis pour ce salon.</p>
                  ) : (
                    <ul>
                      {salon.reviews.map((review) => (
                        <li key={review.id_review}>
                          <strong>{review.rating}/5</strong><br />
                          <span>{review.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <h3>En savoir plus sur {salon.name}</h3>
                  <p>{salon.description}</p>
                </div>
              )}

              <button
                onClick={() => router.push(`/categories/${name}/${city}/salon/${salon.name}`)} 
                style={{ marginTop: "10px", padding: "5px 10px", cursor: "pointer" }}
              >
                Prendre RDV
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
