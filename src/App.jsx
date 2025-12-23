import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFilePdf, FaDatabase, FaCloud, FaCode } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const GITHUB_USERNAME = 'VinayMacharla'; // Replace with your username

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter(repo => !repo.fork && repo.language));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 min-h-screen">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Vinay Macharla
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              >
                <span className="sr-only">Toggle theme</span>
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section ref={heroRef} className="pt-24 pb-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 flex items-center justify-center mx-auto shadow-2xl">
              <FaDatabase className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Data Engineer
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
              3+ years ETL | PySpark | AWS | Azure | IDMC | Building production pipelines
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#projects"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                Latest Projects
              </a>
              <a
                href="/Vinay-Macharla-Resume.pdf"
                download
                className="px-8 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <FaFilePdf /> Download Resume
              </a>
            </div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-6 pb-20 max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="text-4xl opacity-50">
                      {repo.language === 'Python' && '🐍'}
                      {repo.language === 'JavaScript' && '⚛️'}
                      {repo.language === 'SQL' && '🗄️'}
                      {['Architecture', 'Pipeline', 'ETL'].some(term => 
                        repo.name.toLowerCase().includes(term.toLowerCase())
                      ) && '📊'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{repo.description || 'Data engineering project'}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>📁 {repo.language}</span>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 py-2 px-4 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                    >
                      <FaCode /> Code
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 py-2 px-4 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-20 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'ETL & Processing', skills: ['Informatica IDMC', 'PySpark', 'Apache Airflow'], icon: '🔄' },
              { title: 'Cloud Platforms', skills: ['AWS S3/Glue/Lambda', 'Azure Data Services', 'Redshift'], icon: '☁️' },
              { title: 'Databases', skills: ['SQL/PL-SQL', 'Oracle', 'MySQL/PostgreSQL'], icon: '🗄️' }
            ].map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
              >
                <div className="text-4xl mb-6">{stack.icon}</div>
                <h3 className="text-2xl font-bold mb-6 text-white">{stack.title}</h3>
                <ul className="space-y-3">
                  {stack.skills.map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      className="bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white px-6 py-3 rounded-xl font-medium"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 max-w-6xl mx-auto text-center border-t border-white/20">
          <div className="flex justify-center items-center gap-6 mb-6">
            <a href={`https://github.com/${GITHUB_USERNAME}`} className="text-2xl hover:text-blue-400 transition-colors">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/vinay-macharla" className="text-2xl hover:text-blue-400 transition-colors">
              <FaLinkedin />
            </a>
          </div>
          <p className="text-gray-400">
            © 2025 Vinay Macharla. Built with React + Vite on GitHub Pages.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
