"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
    
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'How can I help you learn more about Om and his Resume?'
    }
  ]);

  // NEW STATES - Add these
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const heroTextRef = useRef(null);
  const [marqueeSpeed, setMarqueeSpeed] = useState(30); // Add this line with other states

  // Projects data for modal
  const projectsData = [
    { id: 1, title: "Machine learning To predict Suicide rate", description: "Advanced machine learning project utilizing TensorFlow and Python for predictive analytics for Farmers suicide rate on Geografical level.", tech: ["Python", "ML", "TensorFlow", "AI"], img: "./imgs/p4.jpg", link: "https://github.com/OMx0777?tab=repositories" },
    { id: 2, title: "Offline Code Generation tool", description: "Full stack code developer tool using deepseek LLM for Security and Privacy.", tech: ["Python", "OLamma", "LLM"], img: "./imgs/p2.jpg", link: "https://github.com/OMx0777?tab=repositories" },
    { id: 3, title: "Real-Time Emotion Tracker with music", description: "Real-Time Emotion Tracker with Recommendation Model for live Music Recommendation.", tech: ["API", "ML", "python"], img: "./imgs/p3.jpg", link: "https://github.com/OMx0777?tab=repositories" },
    { id: 4, title: "Credit Card Fraud Detector", description: "Credit Card Fraud Detector using ML.", tech: ["SQL", "ML", "AI"], img: "./imgs/p5.jpg", link: "https://github.com/OMx0777?tab=repositories" },
    { id: 5, title: "Unemployment Predictor", description: "Advanced machine learning project utilizing ML and Python for predictive analytics for Students and Freshers by analysing skills and education.", tech: ["Python", "ML", "AI"], img: "./imgs/p6.jpg", link: "https://github.com/OMx0777?tab=repositories" },
    { id: 6, title: "Potholes Detector and Reporter", description: "Potholes Detector and Reporter Using ML..", tech: ["ML", "AI", "MySQL", "API"], img: "./imgs/p1.jpg", link: "https://github.com/OMx0777?tab=repositories" }
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

  // Intersection Observer for scroll animations
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

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Typing animation for hero text
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

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!messageInput.trim()) {
      errors.message = "Please enter a message";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Updated submit form with validation and toast
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
      {/* Particles Background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Dark Mode Toggle */}
      <button 
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle Dark Mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Back to Top"
      >
        ↑
      </button>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Project Modal */}
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
          </div>
        </div>
      )}
      {/* Header */}
      <header>
        <a href="#" className="logo-holder">
          <div className="logo">OM</div>
          <div className="logo-text">My Portfolio website</div>
        </a>
        <nav>
          <ul id="menu" className={menuOpen ? "active" : ""}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="mailto:omsathe0777@gmail.com" className="button">Contact Me</a>
            </li>
          </ul>
          <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
            </svg>
          </a>
        </nav>
      </header>
      {/* Main Content */}
      <main>
        <section className="hero container animate-on-scroll">
          <div className="hero-blue">
            <h1>
              <small>Hi I'm</small>
              <span ref={heroTextRef} className="typing-text">Om</span>
            </h1>
            <p>
              Passionate Python Developer focused on
              turning complex problems into elegant code.
              My technical foundation is amplified by 
              elite leadership skills <span>I seek an IT role valuing high performance and strategic direction.</span>
            </p>
            <div className="call-to-action">
              <a href="./omresume.pdf" className="button black" onClick={handleResumeDownload}>
                View Resume
              </a>
              <a href="mailto:omsathe0777@gmail.com" className="button white">
                Contact Me
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/OMx0777?tab=repositories">
                <img src="./imgs/github.png" alt="Github" width="48" />
              </a>
              <a href="https://www.linkedin.com/in/om-sathe-547756304/">
                <img src="./imgs/linkedin.png" alt="linkedin" width="48" />
              </a>
            </div>
          </div>
          <div className="hero-yellow">
            <img src="./imgs/omnobg692.png" alt="om-foto" width="105%" height="120%"/>
          </div>
        </section>
        <section className="logos containar animate-on-scroll">
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
        <section id="skills" className="skills containar animate-on-scroll">
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
                <li>C++</li>
                <li>JAVA</li>
              </ul>
              <h3>Web Technologis</h3>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>PHP</li>
                <li>JavaScript</li>
                <li>Git/GitHub</li>
              </ul>
              <h3>AI/ML</h3>
              <ul>
                <li>AI Tools</li>
                <li>GenAI</li>
                <li>Model Training & Evaluation</li>
                <li>TensorFlow</li>
                <li>PyTorch</li>
                <li>Numpy & Pandas</li>
              </ul>
              <h3>Database</h3>
              <ul>
                <li>PostgresSQL</li>
                <li>Cloud</li>
              </ul>
            </div>
            <div className="right-column">
              <h3> A bit more about Me</h3>
              <p>
                A passionate and highly capable Python Developer with a strong foundation
                in problem-solving and a drive to leverage technology to create real-life solutions.
                I am committed to advancing my career in the IT sector as a developer, backed by hands-on 
                experience in complex technical projects and extensive leadership roles.

                Technical Expertise

                I specialize in building Projects across various technical domains, focusing on clean, efficient code:

                Core Programming: Python (Advanced).

                Problem Solving: Successfully built and deployed projects addressing complex, real-world challenges.

                Leadership & Organizational Impact

                Beyond code, I excel at strategy, teamwork, and leading initiatives that deliver tangible results:

                Rotaract Vice President: Led a 90+ member team for one year as Vice President of the Rotaract Club of Indira College.

                Financial & Event Management: Successfully generated over ₹1 Lakh (100,000+) in club funding and charity, 
                and led the organization of multiple large-scale charity and professional development events.

                Teamwork & Coaching: Recognized for strong teamwork capabilities, reinforced by roles such as Wrestling Coach (2 years) 
                and Modeling Team Coordinator (2 years).

                Strategic & Competitive Discipline: My background as a State-level Professional Wrestler 
                and District-level Chess Player directly translates into resilience, strategic planning, 
                and the ability to perform under pressure—essential skills for project execution.

                Commitment to Growth

                With a comprehensive leadership track record—including three years as a class Representative
                and one year as Vice President actively seek and thrive in environments that require collaboration, 
                quick learning, and accepting responsibility.
              </p>
            </div>
          </div>
        </section>
        <section className="work-experience containar animate-on-scroll">
          <h2>
            <small>Recent</small>
            Experiences
          </h2>
          <div className="jobs">
            <article>
              <figure>
                <div>
                  <img src="./imgs/rtr1.png" alt="work1" width="100%" />
                  <figcaption>
                    Farmacy Auditorium
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
                  <img src="./imgs/coach.png" alt="work2" width="100%" />
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
        <section id="projects" className="bento containar animate-on-scroll">
          <h2>
            <small>
              Previous
            </small>
            Completed Projects
          </h2>
          <div className="bento-grid">
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[0]); }}>
              <img src="./imgs/p4.jpg" alt="project-1" width="100%" />
            </a>
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[1]); }}>
              <img src="./imgs/p2.jpg" alt="project-2" width="100%" />
            </a>
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[2]); }}>
              <img src="./imgs/p3.jpg" alt="project-3" width="100%" />
            </a>
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[3]); }}>
              <img src="./imgs/p5.jpg" alt="project-4" width="100%" />
            </a>
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[4]); }}>
              <img src="./imgs/p6.jpg" alt="project-5" width="100%" />
            </a>
            <a href="#" className="bento-item" onClick={(e) => { e.preventDefault(); setSelectedProject(projectsData[5]); }}>
              <img src="./imgs/p1.jpg" alt="project-6" width="100%" />
            </a>
          </div>
        </section>
        <section className="chatbot containar animate-on-scroll">
          <h2>
            <small>
              Talk to Me
            </small>
            chatbot
          </h2>
          <div className="chatbot-blue">
            <div className="chat-info">
              <h3>My Chat Assistant</h3>
              <p>She is my assistant Omi.She knows all my skills and About my Acadamics and Experiences.She also have my Resume.
                You can talk to her about me and ask her questions about me.
                To get better idea about who i am and about my goals and projects.
              </p>
              <p>You can also download my resume here if you want to take a look at it.
                I'm currently looking for new opportunities so if you have a requirement and 
                you think I'd be a good fit for, please get in touch!</p>
              <a href="./omresume.pdf" className="button black" onClick={handleResumeDownload}>Download Resume</a>
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
      </main>
    </>
  );
}
 