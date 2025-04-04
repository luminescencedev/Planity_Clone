import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Header from "../component/header";
import Footer from "../component/footer";

export default function Account() {
  const router = useRouter();
  const { token, logout } = useContext(AuthContext);
  const [salons, setSalons] = useState([]);
  const [salonsLoading, setSalonsLoading] = useState(false);
  const [salonsError, setSalonsError] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
const [reviewsLoading, setReviewsLoading] = useState(false);
const [reviewsError, setReviewsError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("informations"); // Default to "Mes rendez-vous"
  const [appointments, setAppointments] = useState([]);
  const [appointmentsError, setAppointmentsError] = useState(null);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [showSalonForm, setShowSalonForm] = useState(false);
  const [salonData, setSalonData] = useState({
    salon_name: "",
    address: "",
    city: "",
    description: "",
    id_category: "",
    picture: "", // Ajout du champ picture
  });

  useEffect(() => {
    const fetchAllUsers = async () => { //gestion des erreurs pour la récupération des utilisateurs.erreur se produit, capturée et affichée dans l'état usersError
      setUsersLoading(true);
      setUsersError(null);
      try {
        const response = await fetch("http://localhost:3001/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data);
      } catch (err) {
        setUsersError(err.message);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchAllUsers();
  }, [token]);

  useEffect(() => {
    const fetchAllSalons = async () => {
      setSalonsLoading(true);
      setSalonsError(null);
      try {
        const response = await fetch("http://localhost:3001/allSalons", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch salons");
        }

        setSalons(data);
      } catch (err) {
        setSalonsError(err.message);
      } finally {
        setSalonsLoading(false);
      }
    };

    fetchAllSalons();
  }, [token]);

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/allReviews');
      const data = await response.json();
      setReviews(data);
      setReviewsError(null);
    } catch (error) {
      setReviewsError(error.message);
    } finally {
      setReviewsLoading(false);
    }
  };
  
  // Delete review function
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const token = localStorage.getItem('token'); // or your token storage method
        
        const response = await fetch(`http://localhost:3001/reviews/${reviewId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        
        if (data.success) {
          setReviews(reviews.filter(review => review.id_review !== reviewId));
        } else {
          console.error('Failed to delete review:', data.message);
        }
        
      } catch (error) {
        console.error('Error deleting review:', error);
        // Optionally show error to user
        alert('Failed to delete review. Please try again.');
      }
    }
  };
  
  // Call fetchReviews in useEffect
  useEffect(() => {
    fetchReviews();
  }, []);
  // Fetch user data from API
  useEffect(() => {

    const fetchUserData = async () => {//Ajout log pour débogage des données récupérées.Permet de vérifier la structure des données retournées.
      try {
        const response = await fetch("http://localhost:3001/account", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Backend error details:", data);
          throw new Error(data.details || "Account fetch failed");
        }

        if (!data.id) {
          console.error("ID utilisateur manquant dans la réponse !");
          throw new Error("ID utilisateur introuvable");
        }
        //Vérification de l'ID utilisateur dans la réponse. Si l'ID manquant, erreur est levée pour garantir les données sont valides.
        setUser(data);
      } catch (err) {
        console.error("Full fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
      setError("No authentication token found");
    }
  }, [token]);

  // Pre-fill form when user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);


  

  const handleLogout = () => {
    logout(); // Appelle la fonction logout du contexte
    router.push("/login"); // Redirige vers la page de connexion
  };

  const handleDeleteUser = async (id_user) => {
    if (!window.confirm(`Are you sure you want to delete user #${id_user}?`))
      return;

    try {
      const response = await fetch(`http://localhost:3001/users/${id_user}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Deletion failed");
      }

      // Refresh user list
      fetchAllUsers();
      setMessage({
        type: "success",
        text: result.message,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleDeleteSalon = async (id_salon) => {
    if (!window.confirm(`This will permanently delete the salon and ALL its associated data (services, appointments, reviews). Users associated with this salon will have their salon reference removed. Continue?`)) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/salons/${id_salon}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to delete salon");
        }

        // Optimistically update all related state
        setSalons(prev => prev.filter(s => s.id_salon !== id_salon));
        
        
        setMessage({
            type: "success",
            text: result.message
        });
        
    } catch (error) {
        console.error("Delete error:", error);
        setMessage({
            type: "error",
            text: error.message || "An unexpected error occurred"
        });
    } finally {
        setTimeout(() => setMessage(null), 5000);
    }
};
  // Handle tab switching
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle salon form changes
  const handleSalonChange = (e) => {
    const { name, value } = e.target;
    setSalonData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (update user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setMessage("Erreur : ID utilisateur introuvable.");
      return;
    }

    try {
      const updates = {};
      if (formData.first_name !== user.first_name)
        updates.first_name = formData.first_name;
      if (formData.last_name !== user.last_name)
        updates.last_name = formData.last_name;
      if (formData.email !== user.email) updates.mail = formData.email; // Note: backend expects 'mail'
      if (formData.phone !== user.phone) updates.phone = formData.phone;

      if (Object.keys(updates).length === 0) {
        setMessage("Aucune modification détectée");
        setTimeout(() => setMessage(""), 3000);
        return;
      }

      const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Échec de la mise à jour du profil");
      }

      setUser({
        ...user,
        ...data,
      });

      setMessage("Profil mis à jour avec succès!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setMessage(`Erreur: ${error.message}`);
    }
  };

  // Handle salon creation
  const handleSalonSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        salon_name: salonData.salon_name,
        address: salonData.address,
        city: salonData.city,
        description: salonData.description,
        id_category: salonData.id_category,
        picture: salonData.picture,
      });

      const response = await fetch(`http://localhost:3001/salons`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Échec de la création du salon");
      }

      setMessage("Salon créé avec succès !");
      setSalonData({
        salon_name: "",
        address: "",
        city: "",
        description: "",
        id_category: "",
        picture: "",
      });
    } catch (error) {
      console.error("Salon creation error:", error);
      setMessage(`Erreur: ${error.message}`);
    }
  };

  useEffect(() => {
  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    setAppointmentsError(null);

    try {
      const response = await fetch("http://localhost:3001/rendez-vous", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des rendez-vous :", err);
      setAppointmentsError(err.message);
    } finally {
      setLoadingAppointments(false);
    }
  };

  if (token) {
    fetchAppointments();
  }
}, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <div className="container-account">
      <Header />
      {user && user.role !== "Admin" && (
        
        <>
        
          <h1 className="page-title">Mon compte</h1>
          <div className="container">
            <div className="left">
              <h2>Mon compte</h2>

              <h4
                className={selectedSection === "rendez-vous" ? "active" : ""}
                onClick={() => handleSectionChange("rendez-vous")}
              >
                Mes rendez-vous
              </h4>
              <h4
                className={selectedSection === "informations" ? "active" : ""}
                onClick={() => handleSectionChange("informations")}
              >
                Mes informations
              </h4>
              <hr />

              {user && user.role === "Coiffeur" && (
                <button onClick={() => setShowSalonForm(!showSalonForm)}>
                  {showSalonForm ? "Annuler la création" : "Créer un salon"}
                </button>
              )}

              <button id="logout-submit" onClick={handleLogout}>
                Se déconnecter
              </button>
            </div>

            {message && <div className="message">{message}</div>}

            <div className="right">
              {selectedSection === "rendez-vous" && (
                <div className="box">
              <h2>Mes Rendez-Vous</h2>
              {loadingAppointments ? (
                <p>Chargement des rendez-vous...</p>
              ) : appointmentsError ? (
                <p style={{ color: "red" }}>{appointmentsError}</p>
              ) : appointments.length > 0 ? (
                <ul>
                  {appointments.map((rdv) => (
                    <li key={rdv.id_rendezvous}>
                      <p>
                        <strong>Date :</strong> {new Date(rdv.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Heure :</strong> {rdv.time}
                      </p>
                      <p>
                        <strong>Salon :</strong> {rdv.salon_name}
                      </p>
                      <p>
                        <strong>Service :</strong> {rdv.service_name}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Vous n'avez pas encore pris de rendez-vous.</p>
              )}
            </div>
          )}

          {selectedSection === "informations" && (
            <div className="box">
              <div className="user-info">
              <h2>Mes informations</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Prénom *</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Nom *</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        title="Numéro à 10 chiffres"
                      />
                    </div>

                    <div className="button-group">
                      <button type="button" onClick={() => setFormData(user)}>
                        Annuler
                      </button>
                      <button id="save-submit" type="submit">
                        Enregistrer
                      </button>
                    </div>
                  </form>
                </div>
                </div>
              )}

              {showSalonForm && user.role === "Coiffeur" && (
                <div className="box">
                  <h2>Créer un salon de coiffure</h2>
                  <form onSubmit={handleSalonSubmit}>
                    <div className="form-group">
                      <label>Nom du salon *</label>
                      <input
                        type="text"
                        name="salon_name"
                        placeholder="Nom du salon"
                        value={salonData.salon_name}
                        onChange={handleSalonChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Adresse *</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Adresse"
                        value={salonData.address}
                        onChange={handleSalonChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Ville *</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={salonData.city}
                        onChange={handleSalonChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Photo du salon (nom du fichier)</label>
                      <input
                        type="text"
                        name="picture"
                        placeholder="Nom de l'image"
                        value={salonData.picture}
                        onChange={handleSalonChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={salonData.description}
                        onChange={handleSalonChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Catégorie *</label>
                      <select
                        name="id_category"
                        value={salonData.id_category}
                        onChange={handleSalonChange}
                        required
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="1">Coiffeur</option>
                        <option value="2">Barbier</option>
                        <option value="3">Manucure</option>
                      </select>
                    </div>

                    <div className="button-group">
                      <button
                        type="button"
                        onClick={() => setShowSalonForm(false)}
                      >
                        Annuler
                      </button>
                      <button id="salon-submit" type="submit">
                        Créer le salon
                      </button>
                    </div>
                  </form>
                  {message && <p>{message}</p>}
                </div>
              )}
            </div>
          </div>
        </>

      )}
       { user && user.role === "Admin" && (
      <>
        <h1 className="page-title">Admin Dashboard</h1>
        <div className="admin-panel">
          <div className="admin-nav">
            <button
              className={selectedSection === "users" ? "active" : ""}
              onClick={() => handleSectionChange("users")}
            >
              Manage Users
            </button>
            <button
              className={selectedSection === "salons" ? "active" : ""}
              onClick={() => handleSectionChange("salons")}
            >
              Manage Salons
            </button>
            <button
              className={selectedSection === "reviews" ? "active" : ""}
              onClick={() => handleSectionChange("reviews")}
            >
              Manage Reviews
            </button>
          </div>

          <div className="admin-content">
            {selectedSection === "users" && (
              <div className="admin-section">
                <h2>User Management</h2>
                {/* Add user management functionality here */}
                <p>List of all users with delete options</p>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Role</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Age</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id_user || user.id}>
                        <td>{user.id_user || user.id}</td>
                        <td>{user.role}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.age}</td>
                        <td>{user.mail || user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.city}</td>
                        <td>
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteUser(user.id_user || user.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedSection === "salons" && (
              <div className="admin-section">
                <h2>Salon Management</h2>
                {salonsLoading ? (
                  <p>Loading salons...</p>
                ) : salonsError ? (
                  <p className="error">Error: {salonsError}</p>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Category</th>
                        <th>Owner</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salons.map((salon) => (
                        <tr key={salon.id_salon}>
                          <td>{salon.id_salon}</td>
                          <td>{salon.salon_name}</td>
                          <td>{salon.address}</td>
                          <td>{salon.city}</td>
                          <td>
                            {salon.id_category === 1
                              ? "Coiffeur"
                              : salon.id_category === 2
                              ? "Barbier"
                              : salon.id_category === 3
                              ? "Manucure"
                              : "Other"}
                          </td>
                          <td>{salon.id_user || "N/A"}</td>
                          <td>
                            {new Date(salon.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="delete-btn"
                              onClick={() => handleDeleteSalon(salon.id_salon)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

{selectedSection === "reviews" && (
  <div className="admin-section">
    <h2>Review Management</h2>
    {reviewsLoading ? (
      <p>Loading reviews...</p>
    ) : reviewsError ? (
      <p className="error">Error: {reviewsError}</p>
    ) : (
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rating</th>
            <th>Description</th>
            <th>Salon</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id_review}>
              <td>{review.id_review}</td>
              <td>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </td>
              <td className="review-description">
                {review.description.length > 50
                  ? `${review.description.substring(0, 50)}...`
                  : review.description}
              </td>
              <td>
                {salons.find(s => s.id_salon === review.id_salon)?.name || 'Unknown Salon'}
              </td>
              <td>
                {new Date(review.created_at).toLocaleDateString()}
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteReview(review.id_review)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
)}
          </div>

          <div className="admin-actions">
            <button onClick={logout} className="admin-logout">
              Logout
            </button>
          </div>
        </div>
      </>
)}
      <Footer />
    </div>
    </> 
  );
}
