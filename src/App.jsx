import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const terminalBodyRef = useRef(null);

  const [slogan, setSlogan] = useState('');
  const fullSlogan = "Building Secure & Reliable Infrastructure.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullSlogan.length) {
        setSlogan(fullSlogan.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

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
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
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
          { type: 'output', text: '  Email:    davidmuhaimin.1@gmail.com' },
          { type: 'output', text: '  Phone:    0821-3940-7823' },
          { type: 'output', text: '  Website:  netphantom.myid' },
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
              Computer Engineering Student
            </div>
            <p className="profile-tagline">
              {slogan}<span className="slogan-caret"></span>
            </p>

            {/* ScrollSpy Navigation Links */}
            <nav className="nav-links">
              {[
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' },
                { id: 'projects', label: 'Projects' },
                { id: 'certifications', label: 'Certifications' },
              ].map((item, index) => (
                <div
                  key={item.id}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="nav-indicator"></div>
                  <span className="nav-text">{item.label}</span>
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
              href="mailto:davidmuhaimin.1@gmail.com"
              className="social-icon"
              aria-label="Email Me"
            >
              <svg viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>

            <a
              href="/resume.pdf"
              className="download-cv-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
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
                I'm a Computer Engineering Technology student passionate about designing secure, reliable, and automated <strong className="highlight-cyan">infrastructure</strong>. My interests span Linux, networking, cloud, automation, and <strong className="highlight-purple">cybersecurity</strong>, where I continuously build practical experience through homelabs and real-world projects.
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
                <span className="terminal-title">dapit@netphantom:~</span>
                <div style={{ width: 42 }}></div>
              </div>
              <div className="terminal-body" ref={terminalBodyRef}>
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="terminal-line">
                    {line.type === 'input' ? (
                      <>
                        <span className="terminal-prompt-prefix">
                          <span className="terminal-user">dapit</span>@netphantom:~$
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
                    <span className="terminal-user">dapit</span>@netphantom:~$
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
                </form>
              </div>
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="section-container">
            <h2 className="section-title-mobile">Experience</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">Des 2022</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Network Technician
                  </h3>
                  <div className="card-subtitle">INETmedia RT/RW Net</div>
                  <p className="card-description">
                    Melakukan instalasi dan konfigurasi jaringan FTTH, termasuk pemasangan ONU, UDP, dan fiber optic untuk pelanggan baru. Melaksanakan troubleshooting dan maintenance infrastruktur jaringan secara rutin untuk memastikan koneksi stabil, serta memberikan layanan customer service dengan menangani keluhan teknis secara langsung.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* EDUCATION SECTION */}
          <section id="education" className="section-container">
            <h2 className="section-title-mobile">Education</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">Aug 2024 — Present</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Sarjana Terapan (D4) Teknologi Rekayasa Komputer
                  </h3>
                  <div className="card-subtitle">Politeknik Negeri Banyuwangi</div>
                  <p className="card-description">
                    Fokus pada pengembangan infrastruktur jaringan, IoT, dan keamanan sistem. Meraih IPK 3.78. Aktif berorganisasi sebagai Anggota Divisi HUMAS Forbimwangi (2024-2025) dan Wakil Ketua Umum Forbimwangi (2025-2026).
                  </p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Juli 2021 — Juni 2024</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Teknologi Komputer dan Jaringan
                  </h3>
                  <div className="card-subtitle">SMKS Darussalam Blokagung</div>
                  <p className="card-description">
                    Mempelajari pondasi jaringan komputer, perangkat keras, dan administrasi dasar. Mengembangkan kemampuan kepemimpinan sebagai Ketua 1 OSIS pada periode 2022-2023.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="section-container">
            <h2 className="section-title-mobile">Projects</h2>
            <div className="card-list">

              <div className="card-item">
                <div className="card-left">Sysadmin</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Linux Web Server Deployment & Hardening
                  </h3>
                  <p className="card-description">
                    Membangun dan mengkonfigurasi LAMP & LEMP Stack di VPS berbasis Ubuntu dan CentOS. Melakukan deployment WordPress serta mengatur SSL/TLS dan basic security hardening untuk meningkatkan keamanan aplikasi dan server.
                  </p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">IoT & Robotics</div>
                <div className="card-right">
                  <h3 className="card-title">
                    ROV Control & Telemetry System
                  </h3>
                  <p className="card-description">
                    Mengembangkan sistem kendali dan telemetri ROV berbasis Raspberry Pi menggunakan Python dan Linux. Mengimplementasikan komunikasi berbasis UDP dan WebSocket antara Backend dan Frontend, serta mengintegrasikan komunikasi MAVLink antara Raspberry Pi dan Pixhawk.
                  </p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Networking</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Network & Server Monitoring Lab
                  </h3>
                  <p className="card-description">
                    Menginstal dan mengonfigurasi Zabbix Server di Ubuntu Server pada lingkungan virtualisasi VMware. Mengintegrasikan Grafana untuk visualisasi data, beserta konfigurasi dashboard dan basic alerting untuk kebutuhan monitoring real-time.
                  </p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Networking</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Three-Tier Network Architecture di GNS3
                  </h3>
                  <p className="card-description">
                    Mendesain dan membangun arsitektur jaringan three-tier (core, distribution, access) menggunakan perangkat virtual di GNS3. Melakukan konfigurasi Routing, VLAN, network automation, serta mengimplementasikan keamanan dasar dan monitoring trafik untuk simulasi ISP.
                  </p>
                </div>
              </div>

              <div className="card-item">
                <div className="card-left">Web Dev</div>
                <div className="card-right">
                  <h3 className="card-title">
                    Website Perusahaan Travel
                  </h3>
                  <p className="card-description">
                    Membangun website perusahaan travel menggunakan WordPress (banyuwangiijentrip.com). Berkolaborasi dengan tim untuk merancang tampilan dan struktur halaman, serta mengelola konfigurasi hosting, domain, dan optimasi dasar untuk performa website.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" className="section-container">
            <h2 className="section-title-mobile">Certifications</h2>
            <div className="cert-grid">

              <div className="cert-card">
                <div className="cert-info">
                  <h4 className="cert-name">Computer Networking</h4>
                  <span className="cert-issuer">BNSP (Badan Nasional Sertifikasi Profesi)</span>
                  <span className="cert-date">2024</span>
                </div>
              </div>

              <div className="cert-card purple">
                <div className="cert-info">
                  <h4 className="cert-name">Bootcamp Linux Sysadmin</h4>
                  <span className="cert-issuer">ID-Networkers</span>
                  <span className="cert-date">2025</span>
                </div>
              </div>

              <div className="cert-card">
                <div className="cert-info">
                  <h4 className="cert-name">Bootcamp Cyber Security</h4>
                  <span className="cert-issuer">ID-Networkers</span>
                  <span className="cert-date">2025</span>
                </div>
              </div>

              <div className="cert-card purple">
                <div className="cert-info">
                  <h4 className="cert-name">OCNA Routing & Switching</h4>
                  <span className="cert-issuer">TP-Link Systems Inc</span>
                  <span className="cert-date">2025</span>
                </div>
              </div>

              <div className="cert-card">
                <div className="cert-info">
                  <h4 className="cert-name">OCNA Wireless</h4>
                  <span className="cert-issuer">TP-Link Systems Inc</span>
                  <span className="cert-date">2025</span>
                </div>
              </div>

              <div className="cert-card purple">
                <div className="cert-info">
                  <h4 className="cert-name">Bootcamp Web Pentest</h4>
                  <span className="cert-issuer">Cyber Sentinel Secure</span>
                  <span className="cert-date">2026</span>
                </div>
              </div>

            </div>
          </section>


          {/* FOOTER */}
          <footer className="professional-footer">
            <div className="footer-content">
              <p className="footer-code">
                <span>[</span> david-muhaimin <span>]</span> ~ <span>$</span> exit
              </p>
              <p className="footer-text">
                Designed & Built with <span className="highlight">React</span> by David Muhaimin.
              </p>
              <p className="footer-copyright">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </footer>

        </main>
      </div>
    </>
  );
}

export default App;
