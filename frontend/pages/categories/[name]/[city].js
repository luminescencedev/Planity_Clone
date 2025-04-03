import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Header from '../../../component/header.js';
import Footer from '../../../component/footer';

export default function SalonsParVille() {
  const router = useRouter();
  const { name, city } = router.query;
  const { token } = useContext(AuthContext);
  const [salons, setSalons] = useState([]);
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  // Nouveaux états pour les filtres
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

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
          setFilteredSalons(data); // Initialiser les salons filtrés
          const initialDetailsState = data.reduce((acc, salon) => {
            acc[salon.id_salon] = false;
            return acc;
          }, {});
          setShowDetails(initialDetailsState);
        })
        .catch((err) => setError("Erreur lors de la récupération des salons : " + err.message)); // Log de l'erreur détaillée
    }
  }, [name, city, token]);

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filtered = [...salons];

    // Filtre par note
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(salon => 
        Math.round(salon.moyenne_rating) >= parseInt(ratingFilter)
      );
    }

    // Tri
    if (sortBy === 'rating-high') {
      filtered.sort((a, b) => b.moyenne_rating - a.moyenne_rating);
    } else if (sortBy === 'rating-low') {
      filtered.sort((a, b) => a.moyenne_rating - b.moyenne_rating);
    }

    setFilteredSalons(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [ratingFilter, sortBy]);

  const toggleDetails = (id_salon) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id_salon]: !prevState[id_salon],
    }));
  };

  if (!name || !city || !token) return <p>Chargement...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <Header />
      <div className="pt-[8vh] p-4 min-h-screen flex flex-col">
        <h1>Salons de la catégorie {name} à {city}</h1>

        {/* Filtres */}
        <div style={{ margin: "20px 0", padding: "20px", backgroundColor: "#f5f5f5" }}>
          <h3>Filtres</h3>
          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <label>Note minimum : </label>
              <select 
                value={ratingFilter} 
                onChange={(e) => setRatingFilter(e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="all">Toutes les notes</option>
                <option value="4">4+ étoiles</option>
                <option value="3">3+ étoiles</option>
                <option value="2">2+ étoiles</option>
                <option value="1">1+ étoiles</option>
              </select>
            </div>
            
            <div>
              <label>Trier par : </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: "5px" }}
              >
                <option value="default">Par défaut</option>
                <option value="rating-high">Meilleures notes</option>
                <option value="rating-low">Notes les plus basses</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des salons */}
        {filteredSalons.length === 0 ? (
          <p>Aucun salon ne correspond à vos critères de recherche.</p>
        ) : (
          <ul>
            {filteredSalons.map((salon) => (
              <li key={salon.id_salon} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                <strong>{salon.name}</strong><br />
                <span>{salon.adress}</span><br />
                <img src={`../../${salon.picture}`} alt={salon.name} />
                <p>Note : {salon.moyenne_rating ? Number(salon.moyenne_rating).toFixed(1) : "N/A"}</p>

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
      <Footer />
    </>
  );
}