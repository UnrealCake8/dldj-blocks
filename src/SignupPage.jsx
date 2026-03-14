import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signUp({
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
        <h1>Create account</h1>
        <p className="authSubtext">Start building and publishing with U8Code.</p>

        <form onSubmit={signup} className="authForm">
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
            placeholder="Choose a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className="primaryButton" type="submit">
            Sign up
          </button>
        </form>

        <p className="authFooterText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
