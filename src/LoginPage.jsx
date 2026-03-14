import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <h1>Login</h1>
        <p className="authSubtext">Sign in to manage your U8Code projects.</p>

        <form onSubmit={login} className="authForm">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className="primaryButton" type="submit">
            Login
          </button>
        </form>

        <p className="authFooterText">
          No account yet? <Link to="/signup">Create one</Link>
        </p>
      </section>
    </main>
  );
}
