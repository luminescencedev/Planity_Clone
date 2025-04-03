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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

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

        if (!response.ok) {
          console.error("Backend error details:", data);
          throw new Error(data.details || "Account fetch failed");
        }

        setUser(data);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/account", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setUser(data);
      setMessage("Profil mis à jour avec succès!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
      console.error("Update error:", error);
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
          <h3>Mes rendez-vous</h3>
          <h3>Mes informations</h3>
          <button id="logout-submit" onClick={logout}>Déconnexion</button>
        </div>

        {message && <div>{message}</div>}

        <div className="right">
          <div className="box">
            <div className="rendez-vous">
              <h2>Mes Rendez-Vous à venir</h2>
              <p>Vous n'avez pas encore pris de rendez-vous</p>
              <button id="rdv-submit" onClick={() => router.push("/categories/Coiffeur")}>
                Prendre RDV
              </button>
            </div>
          </div>

          <div className="box">
            <div className="user-infos">
              <h2>Mes coordonnées</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first_name">Prénom</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Nom</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      pattern="[0-9]{10}"
                      title="Numéro à 10 chiffres"
                    />
                  </div>
                </div>

                <div className="button-group">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            first_name: user.first_name || "",
                            last_name: user.last_name || "",
                            email: user.email || "",
                            phone: user.phone || "",
                          });
                        }}
                      >
                        Annuler
                      </button>
                      <button id="save-submit" type="submit">Enregistrer</button>
                    </>
                  ) : (
                    <button id="cancel-submit" type="button" onClick={() => setIsEditing(true)}>
                      Modifier
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
