import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setcity] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    console.log(role, firstName, lastName, age, mail, phone, city, password);
    e.preventDefault();
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: role, first_name: firstName, last_name: lastName, age: age, mail: mail, phone :phone, city :city, password :password }),
    });

    if (response.ok) router.push("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      <h1>Créer un compte</h1>
      <input type="text" placeholder="Rôle" value={role} onChange={(e) => setRole(e.target.value)} />
      <input type="text" placeholder="Prénom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Nom" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="email" placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} />
      <input type="text" placeholder="Téléphone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input type="text" placeholder="City" value={city} onChange={(e) => setcity(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">S'inscrire</button>
    </form>
  );
}