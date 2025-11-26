"use client";
import FluidBackground from "./FluidBackground"; 
import { useState, useEffect, useRef } from "react";
import ResumeEnvelope from "./ResumeEnvelope";
import "./globals.css";

export default function Home() {
    
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I help you learn more about Om and his Resume?'
    }
  ]);

  // STATES
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [marqueeSpeed, setMarqueeSpeed] = useState(30);

  // --- REFS (Modified) ---
  const heroTextRef = useRef(null);
  const videoRef = useRef(null); // <--- ADDED VIDEO REF HERE

  // EmailJS Loading State
  const [isSending, setIsSending] = useState(false);
  
  // Contact form states
  const [contactForm, setContactForm] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});

  // Projects data
  const projectsData = [
    { id: 1, title: "Machine learning To predict Suicide rate", description: "Advanced machine learning project utilizing TensorFlow and Python for predictive analytics for Farmers suicide rate on Geografical level.", tech: ["Python", "ML", "streamlit", "XGBoost"], img: "./imgs/p4.jpg", link: "https://github.com/OMx0777/Farmer_Suicide_Risk_Predictor", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
    { id: 2, title: "Offline Code Generation App", description: "Full stack code developer tool using Self finetuned deepseek LLM for Security and Privacy.", tech: ["Python", "Ollama", "LLM", "HuggingFace"], img: "./imgs/p2.jpg", link: "https://github.com/OMx0777/offline-finetuned-coder-AI", vdlink: "https://youtu.be/6aF9wwdzKMY?si=Jef-bpxBOaNcdCq5" },
    { id: 3, title: "Real-Time Emotion Tracker with music", description: "Real-Time Emotion Tracker with Recommendation Model for live Music Recommendation.", tech: ["Torch","OpenCV", "ML", "python", "Jupyter Notebook"], img: "./imgs/p3.jpg", link: "https://github.com/OMx0777/Real_time_Emotion_Detector_With_music_Recommendation", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
    { id: 4, title: "Credit Card Fraud Detector", description: "Credit Card Fraud Detector using ML.", tech: ["Python", "sklearn", "Pandas & Numpy", "SQL", "ML", "Jupyter Notebook"], img: "./imgs/p5.jpg", link: "https://github.com/OMx0777/Credit_Card_Fraud_Detaction", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
    { id: 5, title: "Unemployment Predictor", description: "Evaluates your professional profile to predict job risk, then recommends personalized skills and roles to secure your career.", tech: ["Python", "Recommendation Engine", "API", "ML", "XGBoost"], img: "./imgs/p6.jpg", link: "https://github.com/OMx0777/Unemployment_Predictor", vdlink: "https://youtu.be/MBLSE1GMEho?si=pEKjLiMXuJr0UXFT" },
    { id: 6, title: "Potholes Detector and Reporter", description: "Potholes Detector and Reporter Using ML..", tech: ["ML", "AI", "OpenCV", "MySQL", "API"], img: "./imgs/p1.png", link: "https://github.com/OMx0777/Pothole-Detector-prototype", vdlink: "https://youtu.be/6aF9wwdzKMY?si=Jef-bpxBOaNcdCq5" }
  ];

  // Loading effect
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Scroll progress and back to top
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
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

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  // Typing animation
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

  // --- NEW CODE: SET VIDEO SPEED ---
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Sets speed to 50%
    }
  }, []);
  // ---------------------------------
  
  // Toast notification
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

  // Chatbot Form validation
  const validateForm = () => {
    const errors = {};
    if (!messageInput.trim()) {
      errors.message = "Please enter a message";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Chatbot submit
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

  // Contact form validation
  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.fullName.trim()) {
      errors.fullName = "Please enter your full name";
    }
    if (!contactForm.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!contactForm.message.trim()) {
      errors.message = "Please enter a message";
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit contact form
  const submitContactForm = async (e) => { 
    e.preventDefault();
    
    if (!validateContactForm()) {
      showToast("Please fill in all fields correctly", "error");
      return;
    }

    setIsSending(true);

    const emailjs = (await import('@emailjs/browser')).default;

    const serviceId = 'service_b799y0f';
    const templateId = 'template_z6mctvk';
    const publicKey = 'MU_F_uzHCyFV8Apdy';

    const templateParams = {
        from_name: contactForm.fullName,
        from_email: contactForm.email,
        message: contactForm.message,
        to_name: 'Om Sathe',
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        showToast("Message sent successfully! I'll get back to you soon.");
        
        setContactForm({
          fullName: '',
          email: '',
          message: ''
        });
        setContactErrors({});
      })
      .catch((error) => {
        console.error('FAILED...', error);
        showToast("Failed to send message. Please try again later.", "error");
      })
      .finally(() => {
        setIsSending(false); 
      });
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resume download tracking
  const handleResumeDownload = () => {
    showToast("Resume downloaded successfully!");
    console.log("Resume downloaded at:", new Date().toISOString());
  };

  // Loading screen
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'black',
        color: 'white'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid rgba(255,255,255,0.3)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p>Loading Portfolio...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <FluidBackground />
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
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
            <img src={selectedProject.img} alt={selectedProject.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
            <p style={{ marginBottom: '20px' }}>{selectedProject.description}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {selectedProject.tech.map((tech, i) => (
                <span key={i} style={{ background: '#333', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '14px' }}>
                  {tech}
                </span>
              ))}
            </div>
            <a 
              href={selectedProject.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button prlink"
            >
              View Project
            </a>
            <a 
              href={selectedProject.vdlink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button vdlink"
            >
              Watch Video
            </a>
          </div>
        </div>
      )}

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
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
            </svg>
          </a>
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
              Passionate Full Stack Developer focused on
              turning complex problems into elegant code.
              My technical foundation is amplified by 
              elite Problem solving & leadership skills <span>I seek an IT role valuing high performance and strategic direction.</span>
            </p>

            {/* --- UPDATED CALL TO ACTION LAYOUT --- */}
            <div className="call-to-action" style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '20px', 
              flexWrap: 'wrap', 
              marginTop: '20px',
              marginBottom: '20px'
            }}>
                {/* 1. DARK GLASS CONTACT BUTTON */}
                <a href="mailto:Om.Sathe23@iccs.ac.in" className="btn-dark-glass" style={{ margin: 0 }}>
                    Contact Me
                </a>
                
                {/* 2. ENVELOPE WRAPPER (160x46px) */}
                <div style={{ position: 'relative', width: '160px', height: '46px' }}>
                    <ResumeEnvelope onClick={handleResumeDownload} />
                </div>
            </div>
            {/* ------------------------------------- */}

            <div className="social-links">
              <a href="https://github.com/OMx0777">
                <img src="./imgs/github.png" alt="Github" width="48" />
              </a>
              <a href="https://www.linkedin.com/in/om-sathe-547756304/">
                <img src="./imgs/linkedin.png" alt="linkedin" width="48" />
              </a>
              <a href="https://www.youtube.com/@OmSathe-0777">
                <img src="./imgs/youtube.png" alt="youtube" width="48" />
              </a>
            </div>
          </div>
          <div className="hero-yellow">
            <video 
                ref={videoRef} /* --- ADDED REF HERE --- */
                autoPlay 
                loop 
                muted 
                playsInline
                className="hero-video"
            >
                <source src="./imgs/marvelbg.mp4" type="video/mp4" />
                <source src="./imgs/marvelbg.webm" type="video/webm" />
            </video>
            <img src="./imgs/omnobg692.png" alt="om-foto" width="105%" height="120%"/>
          </div>
        </section>

        <section className="logos container animate-on-scroll">
          <div className="marquee" style={{ '--marquee-speed': `${marqueeSpeed}s` }}>
            <div className="track">
              <img src="./imgs/python69.png" alt="Python" width="80" height="80" />
              <img src="./imgs/html-69.png" alt="HTML" width="80" height="80" />
              <img src="./imgs/css-69.png" alt="CSS" width="80" height="80"/>
              <img src="./imgs/java-script69.png" alt="javascript" width="80" height="80"/>
              <img src="./imgs/c++69.png" alt="c++" width="80" height="80" />
              <img src="./imgs/sql-server69.png" alt="sql" width="80" height="80" />
              <img src="./imgs/server69.png" alt="Cloud" width="80" height="80" />
              <img src="./imgs/sass69.png" alt="sass" width="80" height="80"/>
              <img src="./imgs/php69.png" alt="php" width="80" height="80" />
              <img src="./imgs/artificial-intelligence169.png" alt="ai" width="80" height="80" />
              <img src="./imgs/ml69.png" alt="ml" width="80" height="80" />
              <img src="./imgs/sass69.png" alt="sass" width="80" height="80" />
              <img src="./imgs/java69.png" alt="java" width="80" height="80" />
              <img src="./imgs/blockchain69.png" alt="blockchain" width="80" height="80" />
              <img src="./imgs/git69.png" alt="git" width="80" height="80" />
              {/* Duplicates for marquee */}
              <img src="./imgs/python69.png" alt="Python" width="80" height="80" />
              <img src="./imgs/html-69.png" alt="HTML" width="80" height="80" />
              <img src="./imgs/css-69.png" alt="CSS" width="80" height="80"/>
              <img src="./imgs/java-script69.png" alt="javascript" width="80" height="80"/>
              <img src="./imgs/c++69.png" alt="c++" width="80" height="80" />
              <img src="./imgs/sql-server69.png" alt="sql" width="80" height="80" />
              <img src="./imgs/server69.png" alt="Cloud" width="80" height="80" />
              <img src="./imgs/sass69.png" alt="sass" width="80" height="80"/>
              <img src="./imgs/php69.png" alt="php" width="80" height="80" />
              <img src="./imgs/artificial-intelligence169.png" alt="ai" width="80" height="80" />
              <img src="./imgs/ml69.png" alt="ml" width="80" height="80" />
              <img src="./imgs/sass69.png" alt="sass" width="80" height="80" />
              <img src="./imgs/java69.png" alt="java" width="80" height="80" />
              <img src="./imgs/blockchain69.png" alt="blockchain" width="80" height="80" />
              <img src="./imgs/git69.png" alt="git" width="80" height="80" />
            </div>
          </div>
          <div className="speed-controls">
            <button 
              className="speed-btn" 
              onClick={() => {
                if (marqueeSpeed > 1) {
                  setMarqueeSpeed(marqueeSpeed - 1);
                } else if (marqueeSpeed > 0.1) {
                  setMarqueeSpeed(Math.max(0.1, marqueeSpeed - 0.1));
                }
              }}
              disabled={marqueeSpeed <= 0.1}
            >
              Fast
            </button>
            <span className="speed-indicator">Speed: {marqueeSpeed.toFixed(1)}s</span>
            <button 
              className="speed-btn" 
              onClick={() => {
                if (marqueeSpeed < 1) {
                  setMarqueeSpeed(Math.min(1, marqueeSpeed + 0.1));
                } else {
                  setMarqueeSpeed(Math.min(60, marqueeSpeed + 1));
                }
              }}
              disabled={marqueeSpeed >= 60}
            >
            Slow
            </button>
          </div>
        </section>

        <section id="skills" className="skills container animate-on-scroll">
          <h2>
            <small>About Me</small>
            Skills
          </h2>
          <div className="holder-blue">
            <div className="left-column">
              <h3>Programming Languages</h3>
              <ul>
                <li>Python</li>
                <li>C</li>
                <li>JAVA</li>
              </ul>
              <h3>Web Tech</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP</li>
                <li>JavaScript</li>
                <li>React & Next.js</li>
                <li>Git/GitHub</li>
              </ul>
              <h3>AI/ML</h3>
              <ul>
                <li>AI Tools</li>
                <li>GenAI</li>
                <li>Model Training & Evaluation</li>
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>OpenCV</li>
                <li>YOLO</li>
                <li>XGBoost</li>
                <li>Numpy & Pandas</li>
                <li>Ollama</li>
                <li>Large Languages Models</li>
              </ul>
              <h3>Database</h3>
              <ul>
                <li>MySQL</li>
                <li>PostgreSQL</li>
                <li>Cloud</li>
              </ul>
            </div>
            <div className="right-column">
              <h4>Little About Me</h4>
              <p>
             I view software development as a collaborative craft where technical skills meet real-world impact.
              As a Full Stack & Python Developer, I don’t just write code—I look for ways to make the entire team’s 
              life easier and the product better. During my recent internship, this proactive mindset led me to engineer
               a solution that eliminated 100% of third-party API costs, proving that I’m always hunting for efficiency and value.

              What makes me an interesting addition to any team is the energy I bring to the table. I 
              thrive in environments where I can tackle new challenges head-on, whether it’s debugging 
              a critical issue or brainstorming a creative feature. I’m the team member who dives deep into 
              the documentation to find the best solution and brings a genuine enthusiasm to every stand-up 
              meeting. I believe that a great developer elevates the people around them, not just the code base.

            My discipline extends far beyond the screen. I bring the same grit from the wrestling mat, where 
            I compete as a District Champion, to solving complex technical problems. Leading a 90+member Rotaract
            team as Vice President has also shaped me into a leader who values empathy and clear communication. I’m 
            looking for a role where I can not only grow as a developer but also contribute to a culture of innovation and success.
              </p>
            </div>
          </div>
        </section>

        <section className="work-experience container animate-on-scroll">
          <h2>
            <small>Recent</small>
            Experiences
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img src="./imgs/alfidologo.png" alt="internship" width="100%" />
                  <figcaption>
                    Remote
                  </figcaption>
                </div>
              </figure>
              <h3>Alfido IT Services</h3>
              <div>2025</div>
              <p>Worked as a Python Developer Intern for 4 months managing website and an application.</p>
            </article>      
            <article>
              <figure>
                <div>
                  <img src="./imgs/rtr1.png" alt="vicepresident" width="100%" />
                  <figcaption>
                    Pharmacy Auditorium
                  </figcaption>
                </div>
              </figure>
              <h3>Rotaract Club Of IC</h3>
              <div>2023-2025</div>
              <p>Worked at Rotaract club as Board of director and Vice president.</p>
            </article>
            <article>
              <figure>
                <div>
                  <img src="./imgs/coach.png" alt="wrestling-awards" width="100%" />
                  <figcaption>
                    State Wrestling Federation
                  </figcaption>
                </div>
              </figure>
              <h3>Narendra Wrestling Club</h3>
              <div>2021-2023</div>
              <p>Worked under Netaji Subhas National Institute of Sports (NSNIS) Coach as assistant coach.</p>
            </article>  
          </div>
        </section>

        <section id="projects" className="bento container animate-on-scroll">
          <h2>
            <small>
              Recent
            </small>
            Check My Completed Projects
          </h2>
          <div className="bento-grid">
            {projectsData.map((project, index) => (
              <a 
                key={project.id}
                href="#" 
                className="bento-item" 
                onClick={(e) => { e.preventDefault(); setSelectedProject(project); }}
              >
                <img src={project.img} alt={`project-${index+1}`} width="100%" />
              </a>
            ))}
          </div>
        </section>

        <section className="chatbot container animate-on-scroll">
          <h2>
            <small>
              Talk to
            </small>
            OMI
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>My AI Assistant</h3>
              <p>She is Omi. Omi knows all my skills and About my Acadamics and Experiences.She also have my Resume.
                You can talk to her about me and ask her questions about me.
                To get better idea about who i am and about my goals and projects.
              </p>
              <p>You can also download my resume here if you want to take a look at it.
                I'm currently looking for new opportunities so if you have a requirement and 
                you think I'd be a good fit for, please get in touch!</p>

                {/* --- CHATBOT SECTION ENVELOPE --- */}
                <div style={{ 
                    position: 'relative', 
                    width: '160px', /* Matches Button CSS */
                    height: '46px', /* Matches Button CSS */
                    marginTop: '20px',
                    marginLeft: '160px', 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ResumeEnvelope onClick={handleResumeDownload} />
                </div>
                {/* -------------------------------- */}

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
              {formErrors.message && <p className="error-message">{formErrors.message}</p>}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section container animate-on-scroll">
          <h2>
            <small>Get In Touch</small>
            Contact Me
          </h2>
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
    </>
  );
}