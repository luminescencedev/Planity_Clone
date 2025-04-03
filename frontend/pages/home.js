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
        <main id="home">
        <Header></Header>
        
        <h1>Réservez en beauté</h1>
        <span>Simple • Immédiat • 24h/24</span>
        
        <form onSubmit={handleHome}>
            <label for="name">
              <span>Que cherchez-vous?</span>
            <input type="text" id="name" name="name" placeholder="Nom du salon, prestations (coupe...)"></input>
            </label>
            <label for="adress">
              <span>Où</span>
            <input type="text" id="adress" name="adress" placeholder="Adresse, ville..."></input>
            </label>
            <button type="submit">Rechercher</button>
        </form>
        </main>
        <article>
          <div>
            <img></img>
            <img></img>
            <div>
              <h2>Découvrez nos Professionnel</h2>
              <h3>Coiffeur</h3>
              <p>Envie de changer de tête ou simplement de rafraîchir votre coupe ? Vous avez besoin des conseils d'un expert pour sublimer votre style.</p>
              <p>Quels sont les meilleurs salons de coiffure autour de chez vous ? Pour répondre à ces questions, le portail de prises de rendez-vous Planity est votre meilleur allié. Découvrez quel salon est fait pour vous, les coiffeurs spécialisés, les visagistes aux meilleurs conseils, et prenez rendez-vous sans sortir de chez vous, quand vous le souhaitez ! Vos cheveux méritent le meilleur !</p>
              <button>Voir moins</button>
            </div>
          </div>
        </article>
        <article class="black">
          <span class="grey">PRESSE</span>
          <h2>Ils parlent de nous</h2>
          <img></img>
          <img></img>
          <img></img>
          <img></img>
        </article>
        <article>
          <span class="grey">UNE FORTE CROISSANCE</span>
          <h2>Vous êtes un professionnel de la beauté ? Découvrez la prise de RDV en ligne !</h2>
          <section>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
          </section>
        </article>
      </>
    );
  }
