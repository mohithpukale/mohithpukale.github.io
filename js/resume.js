/**
 * Modern Portfolio JavaScript Logic - Mohith Pukale
 * Tailored for a Principal Systems & Cloud Security Developer.
 * Bypasses jQuery and Bootstrap legacy dependencies; runs on native, high-performance web APIs.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  // ==========================================
  // 2. Light / Dark Theme Switcher
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  // Check local storage for preference
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    if (themeIcon) {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }

  if (themeToggleBtn && themeIcon) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      let theme = 'dark';
      if (document.body.classList.contains('light-theme')) {
        theme = 'light';
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
      localStorage.setItem('theme', theme);
    });
  }

  // ==========================================
  // 3. Back to Top Button
  // ==========================================
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 4. ScrollSpy & Reveal Animations
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-level-fill');

  // Reveal scroll observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill progress animations if the skills section is visible
        if (entry.target.id === 'skills') {
          skillFills.forEach(fill => {
            const width = fill.getAttribute('data-width');
            fill.style.width = width;
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
  // Specifically observe the skills section itself for trigger
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    revealObserver.observe(skillsSection);
  }

  // Active navigation link observer (ScrollSpy)
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-75px 0px -20% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  // ==========================================
  // 5. Canvas Particle Network (Constellation)
  // ==========================================
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        // Adapt colors according to light/dark themes
        const isLightTheme = document.body.classList.contains('light-theme');
        ctx.fillStyle = isLightTheme ? 'rgba(13, 148, 136, 0.4)' : 'rgba(45, 212, 191, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLightTheme = document.body.classList.contains('light-theme');
      
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Connect particles close to each other
      ctx.strokeStyle = isLightTheme ? 'rgba(13, 148, 136, 0.08)' : 'rgba(45, 212, 191, 0.08)';
      ctx.lineWidth = 0.8;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
  }

  // ==========================================
  // 6. Interactive Developer Console
  // ==========================================
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');
  const terminalHistory = document.getElementById('terminalHistory');
  const terminalContainer = document.querySelector('.terminal-container');
  
  // Terminal commands database
  const commands = {
    help: () => `Available commands:
  - <span class="terminal-prompt">help</span>       Show this listing
  - <span class="terminal-prompt">skills</span>     Print main programming languages & stack
  - <span class="terminal-prompt">experience</span> Summarize professional career nodes
  - <span class="terminal-prompt">projects</span>   Show list of technical projects
  - <span class="terminal-prompt">decrypt</span>    Decrypt a system statement using PAILLIER
  - <span class="terminal-prompt">clear</span>      Clear history buffer`,
    
    skills: () => `Languages: Java, Python, Go, C, SQL
Infrastructure: AWS Cloud, OCI, Identity Providers (IDP), IAM enforcement
Security & Crypto: YubiKeys, Paillier Homomorphic Encryption, E2EE, ORAM
Data & Platforms: MongoDB, MySQL, Hadoop Big Data pipelines, Apache Pig`,
    
    experience: () => `Tenure Summary:
[Oracle Cloud Infrastructure] (August 2017 - Present)
  * Software Developer - Access Management & Authorization Enforcement.
[UC Santa Barbara] (Summer 2018)
  * Graduate Student Researcher - Privacy-Preserving Cloud Storage (ORAM).
[Amazon] (August 2015 - August 2017)
  * Software Developer - Consumer Knowledge Platforms & Big Data.
[Amazon Intern] (Jan 2015 - July 2015)
  * Marketing Analytics Pipelines.
[Intuit Intern] (June 2014 - August 2014)
  * QBO Platform Sanitization Service.`,
    
    projects: () => `Select Projects:
* <span class="text-gradient">Ramsey Search (Go)</span>: Cloud distributed algorithm counterexample finder.
* <span class="text-gradient">Paillier Cryptographic Filter (Python)</span>: homomorphic spam classification.
* <span class="text-gradient">S-Chat (Java)</span>: Cryptographically secure instant messaging platform.
* <span class="text-gradient">Reflector (C)</span>: TCP state spoofing and interception using libpcap.
* <span class="text-gradient">WikiSummary (Python)</span>: Abstract NLP density summary engine.`,
    
    decrypt: () => {
      // Return a temporary div that we will replace via animation
      setTimeout(triggerDecryptionAnimation, 50);
      return `<div id="decryptedOutput" style="color: var(--primary); font-weight: 500;">Initializing decryption cipher...</div>`;
    },
    
    clear: () => {
      if (terminalHistory) terminalHistory.innerHTML = '';
      return '';
    }
  };

  // Click on terminal container focus input
  if (terminalContainer && terminalInput) {
    terminalContainer.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        terminalInput.focus();
      }
    });
  }

  // Handle enter key in terminal
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmdText = terminalInput.value.trim();
        terminalInput.value = '';
        
        if (cmdText) {
          executeCommandText(cmdText);
        }
      }
    });
  }

  // Terminal tab interaction
  const tabs = document.querySelectorAll('.term-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const tabName = tab.getAttribute('data-tab');
      if (tabName === 'details') {
        // Output system information in terminal style
        if (terminalHistory) {
          terminalHistory.innerHTML += `
<div class="terminal-line"><span class="terminal-prompt">mohith@pukale:~$</span> <span class="terminal-cmd">cat sysinfo.log</span></div>
<div class="terminal-line" style="color: var(--secondary);">System Metadata:
-----------------------
Host: mohithpukale.github.io
Role: Principal Developer
OS: macOS / Linux Core
Uptime: 6+ Years of Production Deployments
Specialties: Distributed Systems & Identity Architectures
Infrastructure: OCI, AWS, Zero-Trust Access
Status: Active and Secure
-----------------------</div>`;
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        // Switch back active status automatically
        setTimeout(() => {
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelector('[data-tab="shell"]').classList.add('active');
        }, 1000);
      }
    });
  });

  // Global function for command execution (called by presets and input)
  window.executeCommand = function(cmd) {
    if (terminalInput) {
      terminalInput.value = '';
      executeCommandText(cmd);
    }
  };

  function executeCommandText(cmdText) {
    const formattedCmd = cmdText.toLowerCase().trim();
    
    // Add command to terminal history
    const inputLine = document.createElement('div');
    inputLine.className = 'terminal-line';
    inputLine.innerHTML = `<span class="terminal-prompt">mohith@pukale:~$</span> <span class="terminal-cmd">${cmdText}</span>`;
    terminalHistory.appendChild(inputLine);
    
    // Process output
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line terminal-output';
    
    if (commands[formattedCmd]) {
      outputLine.innerHTML = commands[formattedCmd]();
    } else {
      outputLine.innerHTML = `command not found: ${cmdText}. Type <span class="terminal-prompt">help</span> for a list of commands.`;
    }
    
    if (formattedCmd !== 'clear') {
      terminalHistory.appendChild(outputLine);
    }
    
    // Auto scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Decryption matrix animation for 'decrypt' command
  function triggerDecryptionAnimation() {
    const outputElement = document.getElementById('decryptedOutput');
    if (!outputElement) return;

    const targetQuote = `"Simplicity is prerequisite for reliability." - E.W. Dijkstra | Secure distributed architectures require strong identity verification and cryptographic isolation at the boundary.`;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";
    let currentIteration = 0;
    
    const interval = setInterval(() => {
      let displayString = "";
      let isDone = true;
      
      for (let i = 0; i < targetQuote.length; i++) {
        if (targetQuote[i] === " " || targetQuote[i] === "-" || targetQuote[i] === "." || targetQuote[i] === "|" || targetQuote[i] === '"' || targetQuote[i] === ',') {
          displayString += targetQuote[i];
          continue;
        }
        
        if (i < currentIteration) {
          displayString += targetQuote[i];
        } else {
          displayString += charset[Math.floor(Math.random() * charset.length)];
          isDone = false;
        }
      }
      
      outputElement.innerHTML = `[DECRYPTING CIPHER] -> <span style="color: #fff; font-family: monospace;">${displayString}</span>`;
      
      if (isDone) {
        clearInterval(interval);
        outputElement.innerHTML = `[DECRYPTION KEY VERIFIED]<br><span style="color: var(--primary); font-family: var(--font-mono); font-weight: bold; line-height: 1.5;">${targetQuote}</span>`;
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
      
      currentIteration += 2; // Decrypt 2 chars per frame for speed
    }, 45);
  }

  // ==========================================
  // 7. Project Architecture SVG Drawers Toggles
  // ==========================================
  window.toggleArchitecture = function(btn) {
    const card = btn.closest('.project-card');
    const drawer = card.querySelector('.arch-drawer');
    
    btn.classList.toggle('active');
    drawer.classList.toggle('open');
    
    if (drawer.classList.contains('open')) {
      btn.innerHTML = '<i class="fa fa-chevron-up"></i> Hide Architecture Diagram';
    } else {
      btn.innerHTML = '<i class="fa fa-chevron-down"></i> View Architecture Diagram';
    }
  };

});
