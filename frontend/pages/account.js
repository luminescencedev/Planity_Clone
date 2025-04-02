import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Account() {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/account", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }, // Send the JWT token
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setError("Impossible de récupérer les informations.");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur.");
      }
    };

    fetchUser();
  }, [token, router]);

  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Mon Compte</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p><strong>Prénom:</strong> {user.first_name}</p>
      <p><strong>Nom:</strong> {user.last_name}</p>
      <p><strong>Email:</strong> {user.mail}</p>
      <p><strong>Téléphone:</strong> {user.phone}</p>
      <p><strong>Âge:</strong> {user.age}</p>
      <p><strong>Code Postal:</strong> {user.city}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
