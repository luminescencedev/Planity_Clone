import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header() {
    const { token } = useContext(AuthContext); // Accéder à l'authentification depuis le contexte

    return (
        <header>
            <a href="/home"><img src="/planity-logo.png" alt="Planity Logo" /></a>
            <nav>
                <a href="/categories/Coiffeur">Coiffeur</a>
                <a href="/categories/Barbier">Barbier</a>
                <a href="/categories/Manucure">Manucure</a>
            </nav>
            {/* Rediriger vers /account si l'utilisateur est connecté, sinon vers /login */}
            <a href={token ? "/account" : "/login"}>
                <img src="/userwhite.svg" alt="User Icon" /> Mon compte
            </a>
        </header>
    );
}
