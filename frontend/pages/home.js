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
        <article id="discover">
          <div>
            <img src="/beauty_salon.webp"></img>
            <img src="/barber_shop.webp"></img>
            <div>
              <h2>Découvrez nos Professionnel</h2>
              <h3>Coiffeur</h3>
              <p>Envie de changer de tête ou simplement de rafraîchir votre coupe ? Vous avez besoin des conseils d'un expert pour sublimer votre style.</p>
              <p>Quels sont les meilleurs salons de coiffure autour de chez vous ? Pour répondre à ces questions, le portail de prises de rendez-vous Planity est votre meilleur allié. Découvrez quel salon est fait pour vous, les coiffeurs spécialisés, les visagistes aux meilleurs conseils, et prenez rendez-vous sans sortir de chez vous, quand vous le souhaitez ! Vos cheveux méritent le meilleur !</p>
            </div>
            <img src="/hair_care.webp"></img>
          </div>
        </article>
        <article class="black">
          <span class="grey">PRESSE</span>
          <h2>Ils parlent de nous</h2>
          <img src="/vogue.png"></img>
          <img src="/grazia.png"></img>
          <img src="/elle.png"></img>
          <img src="/marie_claire.png"></img>
        </article>
        <article class="stats">
          <span class="grey">UNE FORTE CROISSANCE</span>
          <h2>Vous êtes un professionnel de la beauté ? Découvrez la prise de RDV en ligne !</h2>
          <section>
            <div>
              <h2>+ 50%</h2>
              <p>de fréquence sur les rdv pris en ligne</p>
            </div>
            <div>
              <h2>4x</h2>
              <p>moins d'oublis avec les rappels sms des rendez-vous</p>
            </div>
            <div>
              <h2>50%</h2>
              <p>des rdv en ligne pris en dehors des horaires d'ouverture</p>
            </div>
            <div>
              <h2>+50 000</h2>
              <p>Salons & instituts</p>
            </div>
            <div>
              <h2>5 RDV</h2>
              <p>Pris toutes les secondes</p>
            </div>
            <div>
              <h2>5 milliards €</h2>
              <p>De rendez-vous vendus</p>
            </div>
          </section>
        </article>
        <article class="articlegrey">
          <img src="/planity_groupe.jpeg"></img>
          <div>
          <span class="grey">PROFESSIONNEL</span>
          <h2>Planity recherche des profils dans toute la France pour digitaliser le secteur de la beauté</h2>
          <p>Antoine Puymirat - CEO</p>
          <a href="https://careers.planity.com/">Découvrir nos offres</a>
          </div>
        </article>
        <article class="stats">
          <span class="grey">PARTOUT EN FRANCE</span>
          <h2>Trouvez votre établissement beauté partout en France</h2>
          <section id="saloncity">
            <div>
              <h3>Coiffeur</h3>
              <p>Nos salons de coiffure populaires en France</p>
              <ul>
                <li><a>Paris</a></li>
                <li><a>Lyon</a></li>
                <li><a>Marseille</a></li>
                <li><a>Bordeaux</a></li>
                <li><a>Nice</a></li>
                <li><a>Toulouse</a></li>
                <li><a>Lille</a></li>
                <li><a>Nantes</a></li>
                <li><a>Strasbourg</a></li>
              </ul>
            </div>
            <div>
              <h3>Barbier</h3>
              <p>Nos barbiers populaires en France</p>
              <ul>
                <li><a>Paris</a></li>
                <li><a>Lyon</a></li>
                <li><a>Marseille</a></li>
                <li><a>Bordeaux</a></li>
                <li><a>Nice</a></li>
                <li><a>Toulouse</a></li>
                <li><a>Lille</a></li>
                <li><a>Nantes</a></li>
                <li><a>Strasbourg</a></li>
              </ul>
            </div>
            <div>
              <h3>Manucure</h3>
              <p>Nos salons de manucure populaires en France</p>
              <ul>
                <li><a>Paris</a></li>
                <li><a>Lyon</a></li>
                <li><a>Marseille</a></li>
                <li><a>Bordeaux</a></li>
                <li><a>Nice</a></li>
                <li><a>Toulouse</a></li>
                <li><a>Lille</a></li>
                <li><a>Nantes</a></li>
                <li><a>Strasbourg</a></li>
              </ul>
            </div>
          </section>
        </article>




        <footer>
          <article>
              <a href="/home"><img src="/planity-logo.png"/></a>
              <a><img src="/facebook.png"></img></a>
              <a><img src="/instagram.png"></img></a>
          </article>
          <article>
              <div>
                <h3>À propos de Planity</h3>
                <ul>
                  <li><a>Rejoignez-nous</a></li>
                  <li><a>CGU</a></li>
                  <li><a>Planity Belgique</a></li>
                  <li><a>Planity Deutschland</a></li>
                  <li><a>Politique de confidentialité</a></li>
                  <li><a>Politique de lutte contre les contenus illicites</a></li>
                  <li><a>Gestion des cookies</a></li>
                </ul>
              </div>
              <div>
                <h3>Trouvez votre prestation</h3>
                <ul>
                  <li><a>Coiffeur</a></li>
                  <li><a>Barbier</a></li>
                  <li><a>Manucure</a></li>
                </ul>
              </div>
              <div>
                <h3>Recherches fréquentes</h3>
                <ul>
                  <li><a>Coiffeur Paris</a></li>
                  <li><a>Coiffeur Bordeaux</a></li>
                  <li><a>Coiffeur Lyon</a></li>
                  <li><a>Coiffeur Toulouse</a></li>
                </ul>
              </div>
          </article>

          <span class="grey">Copyright © 2025 Planity</span>
        
        </footer>
      </>
    );
  }
