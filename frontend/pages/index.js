import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Header from "../component/header";
import Link from "next/link";

export default function Home() {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <Header />
      <main id="home">
        <h1>Bienvenue</h1>
        <Link href="/account">Mon Compte</Link>
      </main>
    </>
  );
}
