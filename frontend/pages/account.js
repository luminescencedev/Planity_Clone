import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Header from "../component/header";
import Footer from "../component/footer";

export default function Account() {
  const router = useRouter();
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("rendez-vous"); // Default to "Mes rendez-vous"
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

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/account", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("User Data:", data); // Debugging

        if (!response.ok) {
          console.error("Backend error details:", data);
          throw new Error(data.details || "Account fetch failed");
        }

        if (!data.id) {
          console.error("ID utilisateur manquant dans la réponse !");
          throw new Error("ID utilisateur introuvable");
        }

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
      if (formData.first_name !== user.first_name) updates.first_name = formData.first_name;
      if (formData.last_name !== user.last_name) updates.last_name = formData.last_name;
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

      console.log("Salon creation body:", body); // Debugging
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-account">
      <Header />

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
          <button id="logout-submit" onClick={logout}>
            Se déconnecter
          </button>

          {user && user.role === "Coiffeur" && (
            <button onClick={() => setShowSalonForm(!showSalonForm)}>
              {showSalonForm ? "Annuler la création" : "Créer un salon"}
            </button>
          )}
        </div>

        {message && <div className="message">{message}</div>}

        <div className="right">
          {selectedSection === "rendez-vous" && (
            <div className="box">
              <h2>Mes Rendez-Vous à venir</h2>
              <p>Vous n'avez pas encore pris de rendez-vous</p>
              <button id="rdv-submit" onClick={() => router.push("/categories/Coiffeur")}>
                Prendre RDV
              </button>
            </div>
          )}

          {selectedSection === "informations" && (
            <div className="box">
              <h2>Mes coordonnées</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Prénom *</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Nom *</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label>Téléphone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="[0-9]{10}" title="Numéro à 10 chiffres" />
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
                  <button type="button" onClick={() => setShowSalonForm(false)}>
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

      <Footer />
    </div>
  );
}