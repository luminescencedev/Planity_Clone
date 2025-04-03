import { useState } from "react";
import { useRouter } from "next/router";
import Header from '../component/header.js';
import Footer from '../component/footer';

export default function Register() {
  const [nameSearch, setNameSearch] = useState("");
  const [localisation, setLocalisation] = useState("");
  const router = useRouter();
  
  const handleHome = async (e) => {
    e.preventDefault();
    router.push(`/categories/${nameSearch}/${localisation}`);
  }
  return (
    <>
      <main id="home">
        <Header />
        <h1>Réservez en beauté</h1>
        <span>Simple • Immédiat • 24h/24</span>
        <form onSubmit={handleHome} id="search">
          <label htmlFor="name">
            <span>Que cherchez-vous?</span>
            <select 
              id="name" 
              name="name" 
              onChange={(e) => setNameSearch(e.target.value)} 
              value={nameSearch}
            >
              <option value="">Sélectionnez un service</option>
              <option value="Barbier">Barbier</option>
              <option value="Coiffeur">Coiffeur</option>
              <option value="Manucure">Manucure</option>
            </select>
          </label>
          <label htmlFor="adress">
            <span>Où</span>
            <select 
              id="adress" 
              name="adress" 
              onChange={(e) => setLocalisation(e.target.value)} 
              value={localisation}
            >
              <option value="">Sélectionnez une ville</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
              <option value="Bordeaux">Bordeaux</option>
              <option value="Nice">Nice</option>
              <option value="Toulouse">Toulouse</option>
              <option value="Lille">Lille</option>
              <option value="Nantes">Nantes</option>
              <option value="Strasbourg">Strasbourg</option>
            </select>
          </label>
          <button type="submit" className="cursor-pointer">Rechercher</button>
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
          </div>
        </article>
        <article className="black">
          <span className="grey">PRESSE</span>
          <h2>Ils parlent de nous</h2>
          <img src="/vogue.png"></img>
          <img src="/grazia.png"></img>
          <img src="/elle.png"></img>
          <img src="/marie_claire.png"></img>
        </article>
        <article className="stats">
          <span className="grey">UNE FORTE CROISSANCE</span>
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
        <article className="articlegrey">
          <img src="/planity_groupe.jpeg"></img>
          <div>
          <span className="grey">PROFESSIONNEL</span>
          <h2>Planity recherche des profils dans toute la France pour digitaliser le secteur de la beauté</h2>
          <p>Antoine Puymirat - CEO</p>
          <a href="https://careers.planity.com/">Découvrir nos offres</a>
          </div>
        </article>
        <article className="stats">
          <span className="grey">PARTOUT EN FRANCE</span>
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



<Footer />
        
      </>
    );
  }
