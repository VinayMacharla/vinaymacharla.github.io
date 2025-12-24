// Modern, Dynamic React Portfolio for Vinay Macharla (Data Engineer)
// Data strictly aligned with resume (NO assumptions)
// Dark Mode + Multi-color accents + Dynamic GitHub Projects
// Tech: React + Tailwind CSS v4 + Framer Motion

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// -----------------------------
// Fallback projects (from resume)
// -----------------------------
const FALLBACK_PROJECTS = [
  {
    id: "p1",
    name: "Customers Data Integration & Analytics Platform",
    description:
      "End-to-end data engineering pipeline built using PySpark to ingest, cleanse, deduplicate, and transform customer, product, inventory, and order data from REST APIs, CSV/JSON files, and streaming sources. Implemented SCD Type-2, CDC, and data quality validations, loading curated datasets into MySQL for analytics.",
    html_url: "https://github.com/vinaymacharla",
  },
];

export default function App() {
  const [repos, setRepos] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/vinaymacharla/repos?per_page=6")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data.filter((r) => !r.fork));
        } else {
          setRepos(FALLBACK_PROJECTS);
        }
      })
      .catch(() => setRepos(FALLBACK_PROJECTS));
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-slate-200 px-6 transition-colors duration-300">
        {/* HEADER */}
        <header className="flex justify-between items-center py-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-indigo-400">Vinay Macharla</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-800 text-indigo-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* HERO / ABOUT */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-20 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Data Engineer
          </h2>
          <p className="mt-6 text-lg text-slate-400">
            Data Engineer and Informatica Developer with 3+ years of experience in designing, developing, and
            optimizing end-to-end ETL/ELT pipelines using Informatica IDMC/IICS (CDI, CAI), PowerCenter, PySpark,
            SQL, and cloud platforms. Experienced in large-scale data migration, cloud data integration,
            performance tuning, and delivering reliable, production-grade data solutions.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/vinaymacharla"><Github /></a>
            <a href="https://linkedin.com/in/vinay-macharla"><Linkedin /></a>
            <a href="mailto:vinaymacharla18@gmail.com"><Mail /></a>
            <a href="/resume.pdf"><FileDown /></a>
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <section className="max-w-5xl mx-auto mb-24">
          <h3 className="text-3xl font-semibold mb-8 text-indigo-400">Experience</h3>

          <div className="space-y-6">
            <div className="bg-slate-800/60 rounded-xl p-6">
              <h4 className="text-xl font-semibold">Migration Consultant – Inflecto Technologies</h4>
              <p className="text-sm text-slate-500">July 2023 – Present | Hyderabad, Telangana</p>
              <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
                <li>Design, develop, and maintain end-to-end ETL/ELT pipelines using Informatica IDMC/IICS and PowerCenter.</li>
                <li>Lead migration of complex on-prem Informatica workflows to IDMC ensuring zero data loss and improved uptime.</li>
                <li>Build and optimize integrations across flat files, RDBMS, REST/SOAP APIs, JSON, XML, and Azure data platforms.</li>
                <li>Improve ETL performance using partitioning, pushdown optimization, caching, and SQL tuning (30% runtime reduction).</li>
                <li>Collaborate with analysts and architects to translate business requirements into scalable data models.</li>
              </ul>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-6">
              <h4 className="text-xl font-semibold">Informatica Developer – Prodg Technologies</h4>
              <p className="text-sm text-slate-500">November 2022 – May 2023 | Hyderabad, Telangana</p>
              <ul className="mt-3 list-disc list-inside text-slate-400 space-y-1">
                <li>Developed batch and real-time ETL workflows using Informatica Cloud Data Integration and CAI.</li>
                <li>Configured Service Connectors and REST/SOAP integrations for cloud and on-prem systems.</li>
                <li>Optimized SQL queries across Oracle, SQL Server, and MySQL to improve throughput and reduce latency.</li>
                <li>Created technical documentation for mappings, workflows, and deployments.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="max-w-6xl mx-auto mb-24">
          <h3 className="text-3xl font-semibold mb-8 text-indigo-400">Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                whileHover={{ scale: 1.04 }}
                className="bg-slate-800/70 rounded-2xl p-6 shadow-lg"
              >
                <h4 className="text-xl font-semibold">{repo.name}</h4>
                <p className="text-slate-400 mt-2">{repo.description}</p>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 mt-3 inline-block"
                >
                  View on GitHub →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="max-w-5xl mx-auto mb-24">
          <h3 className="text-3xl font-semibold mb-6 text-indigo-400">Skills</h3>
          <div className="grid md:grid-cols-3 gap-3 text-slate-300">
            <span>Informatica PowerCenter</span>
            <span>Informatica IDMC / IICS (CDI, CAI)</span>
            <span>Python, PySpark</span>
            <span>SQL (Oracle, SQL Server, Snowflake, MySQL)</span>
            <span>Apache Airflow</span>
            <span>AWS, Microsoft Azure, Databricks</span>
            <span>REST/SOAP APIs, JSON, XML</span>
            <span>ETL Performance Tuning</span>
            <span>Data Warehousing, SCD, CDC</span>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <section className="max-w-5xl mx-auto mb-24">
          <h3 className="text-3xl font-semibold mb-6 text-indigo-400">Certifications & Achievements</h3>
          <ul className="list-disc list-inside text-slate-400 space-y-2">
            <li>Rising Star Award – Recognized for exceptional contributions in data integration projects.</li>
            <li>Informatica Data Engineering Foundation Certification.</li>
            <li>Cloud Data Integration Services R41 – Informatica.</li>
            <li>SQL Programming Essentials – Udemy.</li>
          </ul>
        </section>

        {/* EDUCATION */}
        <section className="max-w-5xl mx-auto mb-24">
          <h3 className="text-3xl font-semibold mb-6 text-indigo-400">Education</h3>
          <div className="bg-slate-800/60 rounded-xl p-6">
            <h4 className="text-xl font-semibold">Bachelor of Technology – Mechanical Engineering</h4>
            <p className="text-slate-400">Kakatiya Institute of Technology and Science, Warangal</p>
            <p className="text-slate-500">2018 – 2022 | GPA: 8.42 / 10.00</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center py-8 text-slate-500">
          © 2025 Vinay Macharla | Data Engineer Portfolio
        </footer>
      </div>
    </div>
  );
}
