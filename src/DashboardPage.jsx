import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  async function loadDashboard() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUserEmail(user.email || "");

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setProjects(data || []);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <main className="dashboardPage">
      <div className="dashboardTop">
        <div>
          <h1>Your Projects</h1>
          <p className="dashboardSubtext">{projects.length} / 2 projects used</p>
          {userEmail ? <p className="dashboardUser">{userEmail}</p> : null}
        </div>

        <div className="dashboardActions">
          <Link className="secondaryButton darkButton" to="/">
            Back to Builder
          </Link>
          <button className="secondaryButton darkButton" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="projectGrid">
        {projects.map((project) => (
          <article key={project.id} className="projectCard">
            <h3>{project.name}</h3>
            <p className="projectMeta">
              {project.is_published ? "Published" : "Draft"}
            </p>
            <button className="primaryButton" type="button">
              Open
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
