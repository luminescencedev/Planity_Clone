import { useState, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, password }),
    });

    if (response.ok) {
      const data = await response.json();
      login(data.token);
      router.push("/");
    } else {
      // Handle login error
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Connexion</h1>
      <a href="/register">Créer un compte</a>
      <br />
      <br />
      <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}