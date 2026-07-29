import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const terminalEndRef = useRef(null);

  // 1. Mouse Glow / Spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Scrollspy Navigation using scroll offsets
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section-container');
      const scrollPosition = window.scrollY;

      // If close to the top, default to 'about'
      if (scrollPosition < 100) {
        setActiveSection('about');
        return;
      }

      let currentSection = 'about';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        // If the scroll position has passed the section top (with a 150px offset threshold)
        if (scrollPosition >= sectionTop - 150) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Run initially (with a small timeout to let the page layout and heights stabilize)
    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Interactive Terminal Logic
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Welcome to David\'s secure terminal shell v3.1.2.' },
    { type: 'output', text: 'Type "help" to view a list of available CLI commands.' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: 'input', text: cmd }];
    const cleanCmd = cmd.toLowerCase();

    let output = [];
    switch (cleanCmd) {
      case 'help':
        output = [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  about      - Display brief bio overview' },
          { type: 'output', text: '  skills     - Show infrastructure, security & coding skills' },
          { type: 'output', text: '  projects   - Summary of IoT, Server, and Web projects' },
          { type: 'output', text: '  neofetch   - Run neofetch system analysis tool' },
          { type: 'output', text: '  contact    - Show contact links' },
          { type: 'output', text: '  clear      - Clear the console history' },
        ];
        break;
      case 'about':
        output = [
          { type: 'output', text: 'Name: David Muhaimin' },
          { type: 'output', text: 'Field: Infrastructure Engineer / Security Engineer' },
          { type: 'output', text: 'Focus: High-availability system setups, networks hardening, IoT integrations, and automation.' },
        ];
        break;
      case 'skills':
        output = [
          { type: 'output', text: '■ Infrastructure: Proxmox, Docker, Traefik, Nginx, Linux (Ubuntu/Debian/Rocky)' },
          { type: 'output', text: '■ Networking & Security: OPNsense, WireGuard, Cloudflare Zero Trust, VLANs' },
          { type: 'output', text: '■ Coding & IoT: JavaScript (React), ESP32, Python, Shell Scripting, MQTT, Node-RED' },
        ];
        break;
      case 'projects':
        output = [
          { type: 'output', text: '1. Secured Smart IoT Monitoring Gateway (ESP32 + MQTT + TLS)' },
          { type: 'output', text: '2. Zero Trust HomeLab Hypervisor Server (Proxmox VE + Docker + WireGuard)' },
          { type: 'output', text: '3. Modern Portfolio Website (Vite + React + Vanilla CSS)' },
          { type: 'output', text: 'Type "projects" details or scroll down to the projects section to explore!' },
        ];
        break;
      case 'neofetch':
        output = [
          { type: 'output', text: '      /\\       david@dapit-dev-core' },
          { type: 'output', text: '     /  \\      --------------------' },
          { type: 'output', text: '    / /\\ \\     OS: Rocky Linux 9.4 (Blue Onyx)' },
          { type: 'output', text: '   / ____ \\    Kernel: Linux 6.8.0-custom-pve' },
          { type: 'output', text: '  /_/    \\_\\   Uptime: 246 days, 4 hours' },
          { type: 'output', text: '               Shell: zsh 5.9' },
          { type: 'output', text: '               Role: Student & Tech Infrastructure Enthusiast' },
          { type: 'output', text: '               Core Interest: Network Hardening, HomeLabbing, IoT' },
        ];
        break;
      case 'contact':
        output = [
          { type: 'output', text: 'Connect with me:' },
          { type: 'output', text: '  Email:    davidmuhaimin@example.com' },
          { type: 'output', text: '  GitHub:   github.com/davidmuhaimin' },
          { type: 'output', text: '  LinkedIn: linkedin.com/in/davidmuhaimin' },
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = [
          { type: 'output', text: `dapitsh: command not found: ${cmd}` },
          { type: 'output', text: 'Type "help" to see valid commands.' },
        ];
    }

    setTerminalHistory([...newHistory, ...output]);
    setTerminalInput('');
  };

  return (
    <>
      {/* Dynamic Cursor Spotlight Overlay */}
      <div className="spotlight"></div>

      <div className="app-container">
        {/* LEFT COLUMN: Sticky Profile & Navigation */}
        <header className="left-panel">
          <div className="profile-info">
            <h1 className="profile-name">David Muhaimin</h1>
            <div className="profile-title">
              Infrastructure & Security Engineer
              <span className="profile-title-tag">Student</span>
            </div>
            <p className="profile-tagline">
              Membangun infrastruktur server yang aman, terotomatisasi, serta merancang sistem IoT terintegrasi.
            </p>

            {/* ScrollSpy Navigation Links */}
            <nav className="nav-links">
              {[
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'projects', label: 'Projects' },
                { id: 'blog', label: 'Blog' },
                { id: 'certifications', label: 'Certifications' },
              ].map((item) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="nav-line"></span>
                  <span>{item.label}</span>
                </div>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub Profile"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn Profile"
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="mailto:davidmuhaimin@example.com"
              className="social-icon"
              aria-label="Email Me"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </header>

        {/* RIGHT COLUMN: Scrollable Sections */}
        <main className="right-panel">
          
          {/* ABOUT SECTION */}
          <section id="about" className="section-container animate-fade-in">
            <h2 className="section-title-mobile">About</h2>
            <div className="about-text">
              <p>
                Halo! Saya <strong>David Muhaimin</strong>, mahasiswa program studi Teknologi Rekayasa Komputer yang sangat tertarik dengan ekosistem <strong className="highlight-cyan">Infrastructure Engineering</strong> dan <strong className="highlight-purple">Security Engineering</strong>. Saya fokus mempelajari bagaimana cara merancang, menerapkan, serta mengamankan layanan server dan infrastruktur jaringan baik secara lokal (Homelab) maupun cloud.
              </p>
              <p>
                Ketertarikan saya dimulai sejak mengeksplorasi virtualisasi dan containerization, di mana saya menyadari bahwa efisiensi server harus berjalan beriringan dengan postur keamanan yang ketat. Sejak saat itu, saya aktif membangun laboratorium pribadi (Homelab), melakukan hardening pada port-port server, menyusun sistem monitoring untuk IoT, dan menerapkan arsitektur jaringan berbasis Zero Trust.
              </p>
            </div>

            {/* Interactive CLI Terminal Widget */}
            <div className="terminal-container">
              <div className="terminal-header">
                <div className="terminal-buttons">
                  <div className="terminal-btn red"></div>
                  <div className="terminal-btn yellow"></div>
                  <div className="terminal-btn green"></div>
                </div>
                <span className="terminal-title">david@dapit-sh:~</span>
                <div style={{ width: 42 }}></div>
              </div>
              <div className="terminal-body">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="terminal-line">
                    {line.type === 'input' ? (
                      <>
                        <span className="terminal-prompt-prefix">
                          <span className="terminal-user">dapitsh</span>@guest:~$
                        </span>
                        <span>{line.text}</span>
                      </>
                    ) : (
                      <span>{line.text}</span>
                    )}
                  </div>
                ))}
                <form onSubmit={handleTerminalSubmit} className="terminal-input-container">
                  <span className="terminal-prompt-prefix">
                    <span className="terminal-user">dapitsh</span>@guest:~$
                  </span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    className="terminal-input"
                    placeholder="Tulis command..."
                    autoCapitalize="none"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="terminal-caret"></span>
                </form>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="section-container">
            <h2 className="section-title-mobile">Experience</h2>
            <div className="card-list">
              
              <div className="card-item">
                <div className="card-left">2025 — Present</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Lead Infrastructure Admin <span className="card-arrow">↗</span>
                  </h3>
                  <div className="card-subtitle">Student Laboratory Group</div>
                  <p className="card-description">
                    Mengelola server virtualisasi berbasis Proxmox untuk kebutuhan deployment praktikum mahasiswa. Melakukan konfigurasi reverse proxy (Traefik) dan automasi backup database mingguan menggunakan shell script dan cron jobs.
                  </p>
                  <div className="badge-list">
                    <span className="badge">Linux</span>
                    <span className="badge">Proxmox</span>
                    <span className="badge">Traefik</span>
                    <span className="badge">Shell Scripting</span>
                    <span className="badge">Docker</span>
                  </div>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">2024 — 2025</div>
                <div className="card-right">
                  <h3 className="card-title">
                    IoT Network Designer <span className="card-arrow">↗</span>
                  </h3>
                  <div className="card-subtitle">Freelance & Academic Projects</div>
                  <p className="card-description">
                    Merancang jaringan transmisi data sensor IoT dengan protokol MQTT. Mengimplementasikan autentikasi TLS pada broker Mosquitto untuk melindungi payload sensor dari ancaman Eavesdropping dan Man-In-The-Middle (MITM) attacks.
                  </p>
                  <div className="badge-list">
                    <span className="badge green">IoT</span>
                    <span className="badge">MQTT</span>
                    <span className="badge">ESP32</span>
                    <span className="badge">Node-RED</span>
                    <span className="badge">TLS/SSL</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section id="education" className="section-container">
            <h2 className="section-title-mobile">Education</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">2023 — Present</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Sarjana Terapan (D4) Teknologi Rekayasa Komputer <span className="card-arrow">↗</span>
                  </h3>
                  <div className="card-subtitle">Politeknik Negeri</div>
                  <p className="card-description">
                    Mempelajari arsitektur jaringan komputer modern, sistem operasi server (Windows & Linux), pemrograman embedded system, serta prinsip pertahanan siber (defensive cybersecurity). Aktif dalam riset mengenai keamanan IoT dan optimasi server.
                  </p>
                  <div className="badge-list">
                    <span className="badge">Computer Networking</span>
                    <span className="badge">Operating Systems</span>
                    <span className="badge">Embedded IoT</span>
                    <span className="badge">Cyber Security</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="section-container">
            <h2 className="section-title-mobile">Projects</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">IoT System</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Secured Smart Home Monitoring Gateway <span className="card-arrow">↗</span>
                  </h3>
                  <p className="card-description">
                    Sistem pemantau kondisi rumah pintar menggunakan ESP32 dan Raspberry Pi 4. Komunikasi data diamankan secara end-to-end menggunakan sertifikat TLS kustom, kemudian divisualisasikan melalui dashboard real-time Grafana yang diproteksi autentikasi 2FA.
                  </p>
                  <div className="badge-list">
                    <span className="badge green">IoT</span>
                    <span className="badge">Raspberry Pi</span>
                    <span className="badge">ESP32</span>
                    <span className="badge">Grafana</span>
                    <span className="badge">InfluxDB</span>
                  </div>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Setup Server</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Zero Trust HomeLab Hypervisor Setup <span className="card-arrow">↗</span>
                  </h3>
                  <p className="card-description">
                    Penerapan konsep Zero Trust Network Access (ZTNA) di jaringan homelab. Menggunakan Cloudflare Tunnels untuk mengekspos dashboard container lokal ke internet publik tanpa membuka open ports (NAT) pada router utama, diamankan dengan filter IP dan SSO.
                  </p>
                  <div className="badge-list">
                    <span className="badge">Zero Trust</span>
                    <span className="badge">Cloudflare Tunnels</span>
                    <span className="badge">OPNsense</span>
                    <span className="badge">WireGuard</span>
                    <span className="badge">Docker</span>
                  </div>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Website</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Minimalist Responsive Terminal Portfolio <span className="card-arrow">↗</span>
                  </h3>
                  <p className="card-description">
                    Aplikasi web portofolio interaktif dengan tampilan modern dua kolom, dilengkapi widget terminal emulator interaktif berbasis React. Dibuat dengan performa tinggi tanpa dependensi framework CSS yang berat (Vanilla CSS).
                  </p>
                  <div className="badge-list">
                    <span className="badge purple">React</span>
                    <span className="badge purple">Vite</span>
                    <span className="badge purple">Vanilla CSS</span>
                    <span className="badge purple">JavaScript</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* BLOG SECTION */}
          <section id="blog" className="section-container">
            <h2 className="section-title-mobile">Blog</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">Jul 2026</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Hardening Server Linux: Panduan Awal Bagi Sysadmin Pemula <span className="card-arrow">↗</span>
                  </h3>
                  <p className="card-description">
                    Langkah-langkah praktis memperkuat pertahanan server Linux Anda setelah fresh install, mulai dari menonaktifkan SSH root login, setup SSH key-based auth, mengaktifkan UFW/Fail2ban, hingga integrasi log auditd.
                  </p>
                  <div className="badge-list">
                    <span className="badge">Security</span>
                    <span className="badge">Linux Hardening</span>
                    <span className="badge">Sysadmin</span>
                  </div>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">May 2026</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Mengenal Perbedaan SSH Tunneling vs WireGuard VPN untuk Homelab <span className="card-arrow">↗</span>
                  </h3>
                  <p className="card-description">
                    Komparasi mendalam antara tunnel port forwarding dan VPN Layer-3. Membedah performa enkripsi ChaCha20 pada WireGuard versus enkripsi default OpenSSH untuk kebutuhan remote access homelab.
                  </p>
                  <div className="badge-list">
                    <span className="badge">Networking</span>
                    <span className="badge">WireGuard</span>
                    <span className="badge">Cryptography</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" className="section-container">
            <h2 className="section-title-mobile">Certifications</h2>
            <div className="cert-grid">

              <div className="cert-card">
                <div className="cert-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <div className="cert-info">
                  <h4 className="cert-name">Cisco Certified Network Associate (CCNA)</h4>
                  <span className="cert-issuer">Cisco</span>
                  <span className="cert-date">Issued: 2025</span>
                </div>
              </div>

              <div className="cert-card purple">
                <div className="cert-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <div className="cert-info">
                  <h4 className="cert-name">CompTIA Security+</h4>
                  <span className="cert-issuer">CompTIA (Exam Prep)</span>
                  <span className="cert-date">Target: Q4 2026</span>
                </div>
              </div>

              <div className="cert-card">
                <div className="cert-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                  </svg>
                </div>
                <div className="cert-info">
                  <h4 className="cert-name">AWS Certified Cloud Practitioner</h4>
                  <span className="cert-issuer">Amazon Web Services</span>
                  <span className="cert-date">Issued: 2025</span>
                </div>
              </div>

            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer-text">
            <p>
              Dibuat menggunakan <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a>, <a href="https://vite.dev/" target="_blank" rel="noreferrer">Vite</a>, dan <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">Vanilla CSS</a>. Terinspirasi oleh desain web <a href="https://brittanychiang.com/" target="_blank" rel="noreferrer">Brittany Chiang</a>.
            </p>
            <p style={{ marginTop: 8 }}>
              &copy; {new Date().getFullYear()} David Muhaimin. All rights reserved.
            </p>
          </footer>

        </main>
      </div>
    </>
  );
}

export default App;
