"use client";
import FluidBackground from "./FluidBackground"; 
import { useState, useEffect, useRef } from "react";
import ResumeEnvelope from "./ResumeEnvelope";
import "./globals.css";
import Image from "next/image"; 

// 1. DATA: Projects
const projectsData = [
  { id: 1, title: "Machine learning To predict Suicide rate", description: "Advanced machine learning project utilizing TensorFlow and Python for predictive analytics for Farmers suicide rate on Geografical level.", tech: ["Python", "ML", "streamlit", "XGBoost"], img: "./imgs/p4.jpg", link: "https://github.com/OMx0777/Farmer_Suicide_Risk_Predictor", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
  { id: 2, title: "Offline Code Generation App", description: "Full stack code developer tool using Self finetuned deepseek LLM for Security and Privacy.", tech: ["Python", "Ollama", "LLM", "HuggingFace"], img: "./imgs/p2.jpg", link: "https://github.com/OMx0777/offline-finetuned-coder-AI", vdlink: "https://youtu.be/6aF9wwdzKMY?si=Jef-bpxBOaNcdCq5" },
  { id: 3, title: "Real-Time Emotion Tracker with music", description: "Real-Time Emotion Tracker with Recommendation Model for live Music Recommendation.", tech: ["Torch","OpenCV", "ML", "python", "Jupyter Notebook"], img: "./imgs/p3.jpg", link: "https://github.com/OMx0777/Real_time_Emotion_Detector_With_music_Recommendation", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
  { id: 4, title: "Credit Card Fraud Detector", description: "Credit Card Fraud Detector using ML.", tech: ["Python", "sklearn", "Pandas & Numpy", "SQL", "ML", "Jupyter Notebook"], img: "./imgs/p5.jpg", link: "https://github.com/OMx0777/Credit_Card_Fraud_Detaction", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
  { id: 5, title: "Unemployment Predictor", description: "Evaluates your professional profile to predict job risk, then recommends personalized skills and roles to secure your career.", tech: ["Python", "Recommendation Engine", "API", "ML", "XGBoost"], img: "./imgs/p6.jpg", link: "https://github.com/OMx0777/Unemployment_Predictor", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
  { id: 6, title: "Potholes Detector and Reporter", description: "Potholes Detector and Reporter Using ML..", tech: ["ML", "AI", "OpenCV", "MySQL", "API"], img: "./imgs/p1.png", link: "https://github.com/OMx0777/Pothole-Detector-prototype", vdlink: "https://youtu.be/6aF9wwdzKMY?si=Jef-bpxBOaNcdCq5" }
];

// 2. DATA: Tech Icons
const techIcons = [
  { src: "./imgs/python69.png", alt: "Python" },
  { src: "./imgs/html-69.png", alt: "HTML" },
  { src: "./imgs/css-69.png", alt: "CSS" },
  { src: "./imgs/java-script69.png", alt: "javascript" },
  { src: "./imgs/c++69.png", alt: "c++" },
  { src: "./imgs/sql-server69.png", alt: "sql" },
  { src: "./imgs/server69.png", alt: "Cloud" },
  { src: "./imgs/sass69.png", alt: "sass" },
  { src: "./imgs/php69.png", alt: "php" },
  { src: "./imgs/artificial-intelligence169.png", alt: "ai" },
  { src: "./imgs/ml69.png", alt: "ml" },
  { src: "./imgs/java69.png", alt: "java" },
  { src: "./imgs/blockchain69.png", alt: "blockchain" },
  { src: "./imgs/git69.png", alt: "git" },
];

// 3. DATA: Live Websites (PNG Icons)
// REPLACE THESE PATHS with your actual icon images in public/imgs/
const liveWebsites = [
  { src: "./imgs/web1.png", link: "https://omx0777.github.io/3D-Car-Model-RayTracing/", alt: "Website 1" },
  { src: "./imgs/web2.png", link: "https://omx0777.github.io/TANK/", alt: "Website 2" },
  { src: "./imgs/web3.png", link: "https://omx0777.github.io/solar-system3D/", alt: "Website 3" },
  { src: "./imgs/web4.png", link: "https://omx0777.github.io/Photo-gen-old/", alt: "Website 4" },
];

export default function Home() {
    
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Chatbot states
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help you learn more about Om and his Resume?' }
  ]);
  const [formErrors, setFormErrors] = useState({});

  // UI States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marqueeSpeed, setMarqueeSpeed] = useState(30);

  // Refs
  const heroTextRef = useRef(null);
  const videoRef = useRef(null);

  // EmailJS & Form States
  const [isSending, setIsSending] = useState(false);
  const [contactForm, setContactForm] = useState({ fullName: '', email: '', message: '' });
  const [contactErrors, setContactErrors] = useState({});

  // --- 1. OPTIMIZED LOADING & VIDEO ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.85;
    }
    
    return () => clearTimeout(timer);
  }, []);

  // --- 2. OPTIMIZED SCROLL LISTENER ---
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = (window.scrollY / totalHeight) * 100;
          setScrollProgress(progress);
          setShowBackToTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 3. ANIMATION OBSERVER ---
  useEffect(() => {
    if (loading) return; 

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // --- 4. TYPEWRITER EFFECT ---
  useEffect(() => {
    if (!loading && heroTextRef.current) {
      const text = "Om";
      let index = 0;
      heroTextRef.current.textContent = "";
      heroTextRef.current.style.visibility = "visible";
      
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          heroTextRef.current.textContent += text[index];
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 200);

      return () => clearInterval(typeInterval);
    }
  }, [loading]);
  
  // Auto-scroll chat
  useEffect(() => {
    const scrollArea = document.querySelector('.scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);
  
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const validateForm = () => {
    const errors = {};
    if (!messageInput.trim()) errors.message = "Please enter a message";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please enter a message", "error");
      return;
    }

    let newMessages = [...messages, { role: 'user', content: messageInput }];
    setMessages(newMessages);
    setMessageInput('');
    setFormErrors({});

    try {
      const apiMessage = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      }).then(res => res.json());
      
      setMessages([...newMessages, { role: 'assistant', content: apiMessage.message }]);
      showToast("Message sent successfully!");
    } catch (error) {
      showToast("Failed to send message", "error");
    }
  };

  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.fullName.trim()) errors.fullName = "Please enter your full name";
    if (!contactForm.email.trim()) errors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = "Please enter a valid email";
    if (!contactForm.message.trim()) errors.message = "Please enter a message";
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitContactForm = async (e) => { 
    e.preventDefault();
    if (!validateContactForm()) {
      showToast("Please fill in all fields correctly", "error");
      return;
    }

    setIsSending(true);

    try {
        const emailjs = (await import('@emailjs/browser')).default;
        
        // BEST PRACTICE: Use process.env.NEXT_PUBLIC_... for these in production
        const serviceId = 'service_b799y0f'; 
        const templateId = 'template_z6mctvk';
        const publicKey = 'MU_F_uzHCyFV8Apdy';

        const templateParams = {
            from_name: contactForm.fullName,
            from_email: contactForm.email,
            message: contactForm.message,
            to_name: 'Om Sathe',
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        showToast("Message sent successfully! I'll get back to you soon.");
        setContactForm({ fullName: '', email: '', message: '' });
        setContactErrors({});
    } catch (error) {
        console.error('FAILED...', error);
        showToast("Failed to send message. Please try again later.", "error");
    } finally {
        setIsSending(false); 
    }
  };

  const handleResumeDownload = () => {
    showToast("Resume downloaded successfully!");
    console.log("Resume downloaded at:", new Date().toISOString());
  };

  // --- LOADING SCREEN (Stays 100% Scale) ---
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Portfolio...</p>
        <style jsx>{`
          .loading-screen {
             display: flex; flex-direction: column; align-items: center; justify-content: center;
             height: 100vh; background: black; color: white;
          }
          .spinner {
             width: 50px; height: 50px; border: 5px solid rgba(255,255,255,0.3);
             border-top-color: white; border-radius: 50%;
             animation: spin 1s linear infinite; margin-bottom: 20px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* GLOBAL ELEMENTS (Stay 100% Scale) */}
      <FluidBackground />
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to Top"
      >
        ↑
      </button>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
            <h2>{selectedProject.title}</h2>
            <img src={selectedProject.img} alt={selectedProject.title} className="modal-img" />
            <p className="modal-desc">{selectedProject.description}</p>
            <div className="modal-tags">
              {selectedProject.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="modal-actions">
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="button prlink">
                View Project
                </a>
                <a href={selectedProject.vdlink} target="_blank" rel="noopener noreferrer" className="button vdlink">
                Watch Video
                </a>
            </div>
          </div>
        </div>
      )}

      {/* SCALE WRAPPER: Make sure globals.css has .scale-wrapper set to scale(0.75) */}
      <div className="scale-wrapper">
        <header>
            <a href="#" className="logo-holder">
            <img src="./imgs/omnobgprof2.png" alt="Logo" className="logo-img" />
            <div className="logo-text">My Portfolio website</div>
            </a>
            <nav>
            <ul id="menu" className={menuOpen ? "active" : ""}>
                <li><a href="#" className="btn-rainbow-smooth">Home</a></li>
                <li><a href="#skills" className="btn-rainbow-smooth">Skills</a></li>
                <li><a href="#projects" className="btn-rainbow-smooth">Projects</a></li>
                <li><a href="#contact" className="button btn-rainbow-smooth">Contact Me</a></li>
            </ul>
            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
                </svg>
            </button>
            </nav>
        </header>

        <main>
            <section className="hero container animate-on-scroll">
            <div className="hero-blue">
                <h1>
                <small>Hi I'm</small>
                <span ref={heroTextRef} className="typing-text">Om</span>
                </h1>
                <p>
                AI/ML Engineer & Lichess.com Contributor focused on turning complex problems into elegant code. 
                My Python back-end and model architecture skills are amplified by elite Teamwork. 
                <span> I seek an IT role valuing high performance and strategic direction.</span>
                </p>

                <div className="call-to-action-wrapper">
                    <a href="mailto:Om.Sathe23@iccs.ac.in" className="btn-dark-glass">
                        Contact Me
                    </a>
                    <div className="envelope-wrapper">
                        <ResumeEnvelope onClick={handleResumeDownload} />
                    </div>
                </div>

                <div className="social-links">
                <a href="https://github.com/OMx0777" aria-label="Github"><img src="./imgs/github.png" alt="Github" width="48" /></a>
                <a href="https://www.linkedin.com/in/om-sathe-547756304/" aria-label="LinkedIn"><img src="./imgs/linkedin.png" alt="linkedin" width="48" /></a>
                <a href="https://www.youtube.com/@OmSathe-0777" aria-label="YouTube"><img src="./imgs/youtube.png" alt="youtube" width="48" /></a>
                </div>
            </div>
            <div className="hero-yellow">
                <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        className="hero-video"
        onCanPlay={(e) => { e.target.playbackRate = 0.85; }} 
    >
        <source src="./imgs/marvelbg.mp4" type="video/mp4" />
        <source src="./imgs/marvelbg.webm" type="video/webm" />
    </video>
                <img src="./imgs/omnobg692.png" alt="Om Profile" className="hero-img-overlay"/>
            </div>
            </section>

            <section className="logos container animate-on-scroll">
            <div className="marquee" style={{ '--marquee-speed': `${marqueeSpeed}s` }}>
                <div className="track">
                    {[...techIcons, ...techIcons].map((icon, index) => (
                        <img key={index} src={icon.src} alt={icon.alt} width="80" height="80" loading="lazy" />
                    ))}
                </div>
            </div>
            <div className="speed-controls">
                <button className="speed-btn" onClick={() => setMarqueeSpeed(prev => Math.max(0.1, prev <= 1 ? prev - 0.1 : prev - 1))} disabled={marqueeSpeed <= 0.1}>Fast</button>
                <span className="speed-indicator">Speed: {marqueeSpeed.toFixed(1)}s</span>
                <button className="speed-btn" onClick={() => setMarqueeSpeed(prev => Math.min(60, prev < 1 ? prev + 0.1 : prev + 1))} disabled={marqueeSpeed >= 60}>Slow</button>
            </div>

            {/* --- NEW: Website PNG Icon Links --- */}
            <div className="website-links">
                <h3>Check Out My FUN Live Websites</h3>
                <div className="links-row">
                    {liveWebsites.map((site, index) => (
                        <a key={index} href={site.link} target="_blank" rel="noopener noreferrer" className="icon-link">
                            <img src={site.src} alt={site.alt} loading="lazy" />
                        </a>
                    ))}
                </div>
            </div>
            {/* ---------------------------------- */}
            </section>

            <section id="skills" className="skills container animate-on-scroll">
            <h2><small>About Me</small>Skills</h2>
            <div className="holder-blue">
                <div className="left-column">
                <h3>Programming Languages</h3>
    <ul>
    <li>Python</li>
    <li>Java</li>
    <li>C</li>
    <li>SQL</li>
    <li>TypeScript</li>
    </ul>

    <h3>Web Tech</h3>
    <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>PHP</li>
    <li>JavaScript</li>
    <li>React</li>
    <li>Next.js</li>
    <li>Node.js</li>
    <li>Tailwind</li>
    </ul>

    <h3>AI/ML</h3>
    <ul>
    <li>AI Tools</li>
    <li>GenAI</li>
    <li>TensorFlow</li>
    <li>PyTorch</li>
    <li>OpenCV</li>
    <li>YOLO</li>
    <li>XGBoost</li>
    <li>Ollama</li>
    <li>LLMs</li>
    <li>RAG Pipelines</li>
    </ul>

    <h3>Data Science</h3>
    <ul>
    <li>Pandas</li>
    <li>NumPy</li>
    <li>Scikit-learn</li>
    <li>Matplotlib</li>
    </ul>

    <h3>Database</h3>
    <ul>
    <li>MySQL</li>
    <li>PostgreSQL</li>
    <li>Cloud</li>
    </ul>

    <h3>Hardware</h3>
    <ul>
    <li>Arduino</li>
    <li>Raspberry Pi</li>
    <li>ESP32</li>
    <li>IoT</li>
    </ul>

    <h3>Tools</h3>
    <ul>
    <li>AWS</li>
    <li>Git</li>
    <li>Linux</li>
    <li>VS Code</li>
    <li>Neo-vim</li>
    <li>Docker</li>
    </ul>
                </div>
                <div className="right-column">
                <h4>Little About Me</h4>
                <p>
        I sit at the intersection of software, data, and hardware. As a <strong>Full Stack & Python Developer</strong>,
        my skillset is amplified by a strong foundation in Data Science, Artificial Intelligence, and Electronics.
        I don't just build applications; I build data-intensive systems that learn and adapt. Whether I am analyzing
        signal processing in hardware or optimizing neural networks, I approach every challenge with a focus on scalability.
                </p>
                <p>
        My professional journey is defined by tangible impact. Currently, as an <strong>AI/ML Engineer Intern at BluOrigin Media</strong>,
        I develop models to optimize lead scoring and engineer data pipelines that drive business decisions.
        This builds on my previous success at Alfido IT Services, where I architected a custom solution that 
        eliminated 100% of third-party API costs, proving that resourcefulness often beats expensive dependencies.
                </p>
                <p>
        My drive for innovation was recognized when I secured <strong>first place in an
        Intercollege Hackathon</strong>. I developed a "Pothole Detection" project using YOLOv5 and OpenCV,
        leveraging computer vision to address critical real-world infrastructure challenges.
        This victory demonstrated not only my ability to deliver complex solutions under tight deadlines but also 
        my commitment to engineering for social impact.
                </p>
                <p>
        This technical rigor is matched by my personal discipline. As a <strong>Pune District Wrestling Champion</strong>,
        I apply the same resilience to solving hard engineering problems as I do to competition. Furthermore,
        serving as <strong>Vice President of the Rotaract club</strong> has taught me that successful projects require more than
        just logic—they require empathy, clear communication, and a unified team vision.
            </p>
            </div>
            </div>
            </section>

            <section className="work-experience container animate-on-scroll">
            <h2><small>Recent</small>Experiences</h2>
            <div className="jobs">
                <article>
    <figure>
        <div>
        <img src="./imgs/bluorigin.png" alt="BluOrigin Media" loading="lazy" />
        <figcaption>Pune, India</figcaption>
        </div>
    </figure>
    <h3>BluOrigin Media</h3>
    <div>Dec 2025 - Present</div>
    <p>
        Developed AI/ML models for lead scoring and campaign prediction. Engineered automated 
        data pipelines and translated technical insights into actionable business strategies.
    </p>
    </article>
                <article>
                <figure>
                    <div>
                    <img src="./imgs/alfidologo.png" alt="internship" loading="lazy" />
                    <figcaption>Remote</figcaption>
                    </div>
                </figure>
                <h3>Alfido IT Services</h3>
                <div>2025</div>
                <p>Worked as a Python Developer Intern for 4 months managing website and an application.</p>
                </article>      
                <article>
                <figure>
                    <div>
                    <img src="./imgs/rtr1.png" alt="vicepresident" loading="lazy" />
                    <figcaption>Pharmacy Auditorium</figcaption>
                    </div>
                </figure>
                <h3>Rotaract Club Of IC</h3>
                <div>2023-2025</div>
                <p>Worked at Rotaract club as Board of director and Vice president.</p>
                </article>
                <article>
                <figure>
                    <div>
                    <img src="./imgs/coach.png" alt="wrestling-awards" loading="lazy" />
                    <figcaption>State Wrestling Federation</figcaption>
                    </div>
                </figure>
                <h3>Narendra Wrestling Club</h3>
                <div>2021-2023</div>
                <p>Worked under Netaji Subhas National Institute of Sports (NSNIS) Coach as assistant coach.</p>
                </article>  
            </div>
            </section>

            <section id="projects" className="bento container animate-on-scroll">
            <h2><small>Recent</small>Check My Completed Projects</h2>
            <div className="bento-grid">
                {projectsData.map((project, index) => (
                <a 
                    key={project.id}
                    href="#" 
                    className="bento-item" 
                    onClick={(e) => { e.preventDefault(); setSelectedProject(project); }}
                >
                    <img src={project.img} alt={project.title} loading="lazy" />
                </a>
                ))}
            </div>
            </section>

            <section className="chatbot container animate-on-scroll">
            <h2><small>Talk to</small>OMI</h2>
            <div className="chatbot-blue">
                <div className="chat-info">
                <h3>My AI Assistant</h3>
                <p>She is Omi. Omi knows all my skills and About my Acadamics and Experiences. She also have my Resume.</p>
                <p>I'm currently looking for new opportunities so if you have a requirement and you think I'd be a good fit for, please get in touch!</p>

                    <div className="envelope-wrapper-chat">
                        <ResumeEnvelope onClick={handleResumeDownload} />
                    </div>
                </div>
                <div className="chat-box">
                <div className="scroll-area">
                    <ul id="chat-log">
                    {messages.map((message, index) => (
                        <li key={index} className={`${message.role}`}>
                        <span className={`avatar`}>{message.role === 'user' ? 'You' : 'Omi'}</span>
                        <div className="message">{message.content}</div>
                        </li>
                    ))}
                    </ul>
                </div>
                <form onSubmit={submitForm} className="chat-message">
                    <input 
                    type="text" 
                    placeholder="Hey Omi, what skills are Om best at?" 
                    value={messageInput} 
                    onChange={e => setMessageInput(e.target.value)}
                    className={formErrors.message ? 'input-error' : ''}
                    />
                    <button className="button black">Send</button>
                </form>
                </div>
            </div>
            </section>

            <section id="contact" className="contact-section container animate-on-scroll">
            <h2><small>Get In Touch</small>Contact Me</h2>
            <div className="contact-container">
                <form onSubmit={submitContactForm} className="contact-form">
                <div className="form-group">
                    <label htmlFor="fullName">Your Name</label>
                    <input
                    type="text"
                    id="fullName"
                    value={contactForm.fullName}
                    onChange={(e) => setContactForm({...contactForm, fullName: e.target.value})}
                    className={contactErrors.fullName ? 'input-error' : ''}
                    placeholder="Bhupendra jogi"
                    disabled={isSending}
                    />
                    {contactErrors.fullName && <p className="error-message">{contactErrors.fullName}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input
                    type="email"
                    id="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className={contactErrors.email ? 'input-error' : ''}
                    placeholder="Om@example.com"
                    disabled={isSending}
                    />
                    {contactErrors.email && <p className="error-message">{contactErrors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message for Om</label>
                    <textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className={contactErrors.message ? 'input-error' : ''}
                    placeholder="Hi Om, I'd like to discuss..."
                    disabled={isSending}
                    />
                    {contactErrors.message && <p className="error-message">{contactErrors.message}</p>}
                </div>

                <button 
                    type="submit" 
                    className="button black submit-btn"
                    disabled={isSending}
                    style={{ opacity: isSending ? 0.7 : 1, cursor: isSending ? 'not-allowed' : 'pointer' }}
                >
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
                </form>
            </div>
            </section>
        </main>
      </div> 
    </>
  );
}