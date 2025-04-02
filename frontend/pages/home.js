import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Header from '../component/header'

export default function Register() {
    const [nameSearch, setNameSearch] = useState("");
    const [localisation, setLocalisation] = useState("");
    const router = useRouter();
  
    const handleHome = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:3001/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameSearch: nom, localisation: city}),
      });
  
      if (response.ok) router.push("/login");
    };
  


    return (
        <>
        <Header></Header>
        <main id="home">
        
        
        <form onSubmit={handleHome}>
            <h1>Barre recherche</h1>
    
            <button type="submit">S'inscrire</button>
        </form>
        </main>
      </>
    );
  }
