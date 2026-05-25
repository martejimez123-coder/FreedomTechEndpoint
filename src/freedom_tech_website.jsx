import React, { useEffect, useState } from "react";

const services = [
  ["support", "IT Support", "Responsive technical support for everyday business issues, user requests, and operational technology needs."],
  ["desk", "Help Desk Support", "Friendly assistance for staff who need clear answers, fast triage, and dependable follow-through."],
  ["laptop", "Computer Setup & Deployment", "Professional setup, configuration, and rollout support for desktops, laptops, and new users."],
  ["wrench", "Device Troubleshooting", "Hands-on diagnosis for performance issues, software errors, access problems, and device reliability."],
  ["printer", "Printer & Peripheral Setup", "Setup and support for printers, scanners, docks, displays, and the tools your office uses daily."],
  ["cloud", "Microsoft 365 Support", "Practical help with email, Microsoft apps, accounts, access issues, and productivity workflows."],
  ["shield", "Endpoint Support", "Support for business workstations and user devices so teams can work with fewer interruptions."],
  ["windows", "Windows PC Support", "Troubleshooting, setup, updates, and optimization for Windows-based business environments."],
  ["network", "Network & Connectivity", "Help with Wi-Fi, internet access, device connectivity, and common office network issues."],
  ["briefcase", "Technology Consulting", "Straightforward guidance for technology decisions, office improvements, and practical planning."],
  ["map", "Onsite & Remote Support", "Flexible support options for Philadelphia-area businesses, offices, churches, and organizations."],
  ["users", "User Support & Training", "Clear, patient support that helps teams understand tools and avoid repeat technology issues."],
];

const industries = [
  ["building", "Small Businesses", "Dependable IT services in Philadelphia for owners and teams that need reliable technology without enterprise complexity."],
  ["briefcase", "Professional Offices", "Polished support for legal, finance, administrative, and client-facing workplaces where downtime matters."],
  ["health", "Healthcare-Related Offices", "Practical technology help for professional environments that need careful, privacy-conscious support."],
  ["church", "Churches & Nonprofits", "Approachable support for organizations that need devices, users, presentations, and office systems to work."],
  ["users", "Growing Teams", "Structured help for teams adding users, devices, cloud tools, and more dependable daily workflows."],
];

const values = [
  "Clear communication",
  "Responsive service",
  "Professional presentation",
  "Practical solutions",
  "Local Philadelphia focus",
  "Business-minded guidance",
];

const faqs = [
  ["Do you provide onsite IT support in Philadelphia?", "Yes. FreedomTech LLC supports Philadelphia and surrounding-area organizations with onsite and remote support options."],
  ["Can you help with Microsoft 365 and business email?", "Yes. We can assist with Microsoft 365 access, user support, email issues, apps, and related productivity workflows."],
  ["Do you work with small businesses and churches?", "Yes. We support small businesses, professional offices, churches, nonprofits, and growing organizations that need dependable tech support."],
  ["Do you list pricing online?", "Technology needs vary by scope and location. Custom quotes are available after a quick conversation about what you need."],
];

const pages = ["home", "services", "about", "industries", "contact", "privacy", "terms", "accessibility"];

function getInitialPage() {
  if (typeof window === "undefined") return "home";
  const requestedPage = new URLSearchParams(window.location.search).get("page");
  return pages.includes(requestedPage) ? requestedPage : "home";
}

function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const icons = {
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    support: <><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2Z" /><path d="M20 13v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2Z" /><path d="M14 20h-4" /></>,
    desk: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" /></>,
    laptop: <><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 19h20" /></>,
    wrench: <><path d="M14.7 6.3a4 4 0 0 0-5.3 5.3L3 18l3 3 6.4-6.4a4 4 0 0 0 5.3-5.3l-3 3-3-3 3-3Z" /></>,
    printer: <><path d="M6 9V3h12v6" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v7H6z" /></>,
    cloud: <><path d="M17.5 19H7a5 5 0 0 1-.6-10A6.5 6.5 0 0 1 19 11.5 3.8 3.8 0 0 1 17.5 19Z" /></>,
    windows: <><path d="M3 5.5 10 4v7H3z" /><path d="M12 3.6 21 2v9h-9z" /><path d="M3 13h7v7l-7-1.5z" /><path d="M12 13h9v9l-9-1.6z" /></>,
    network: <><rect x="9" y="2" width="6" height="6" rx="1" /><rect x="3" y="16" width="6" height="6" rx="1" /><rect x="15" y="16" width="6" height="6" rx="1" /><path d="M12 8v4" /><path d="M6 16v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>,
    map: <><path d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
    building: <><path d="M3 21h18" /><path d="M6 21V4h12v17" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>,
    health: <><path d="M12 21s-8-4.8-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.2-8 11-8 11Z" /><path d="M12 8v6M9 11h6" /></>,
    church: <><path d="M12 2v5" /><path d="M10 4h4" /><path d="M5 21V10l7-4 7 4v11" /><path d="M9 21v-6a3 3 0 0 1 6 0v6" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.7-2.8a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 1.7 2v3Z" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <><circle cx="12" cy="12" r="10" /><path d="m8 12 3 3 5-6" /></>,
  };

  return <svg className="icon" {...common}>{icons[name] || icons.shield}</svg>;
}

function Button({ href, children, variant = "primary" }) {
  return <a className={`btn btn-${variant}`} href={href}>{children}</a>;
}

function SectionHeader({ eyebrow, title, text, light = false }) {
  return (
    <div className={`section-header reveal reveal-text ${light ? "light" : ""}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text && <span>{text}</span>}
    </div>
  );
}

export default function FreedomTechWebsite() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [openServices, setOpenServices] = useState([]);

  const toggleService = (title) => {
    setOpenServices((current) =>
      current.includes(title)
        ? current.filter((serviceTitle) => serviceTitle !== title)
        : [...current, title]
    );
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getInitialPage());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pageHref = (page) => (page === "home" ? "/" : `/?page=${page}`);

  const goToPage = (event, page) => {
    event.preventDefault();
    window.history.pushState({}, "", pageHref(page));
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = currentPage === "home";
  const isServices = currentPage === "services";
  const isAbout = currentPage === "about";
  const isIndustries = currentPage === "industries";
  const isContact = currentPage === "contact";
  const isPrivacy = currentPage === "privacy";
  const isTerms = currentPage === "terms";
  const isAccessibility = currentPage === "accessibility";

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a className="brand" href={pageHref("home")} onClick={(event) => goToPage(event, "home")} aria-label="FreedomTech LLC home">
            <span className="brand-mark"><img src="/2.png" alt="" /></span>
            <span><strong>FreedomTech LLC</strong><small>Philadelphia IT Services</small></span>
          </a>
          <div className="nav-links">
            <a className={isHome ? "active" : ""} aria-current={isHome ? "page" : undefined} href={pageHref("home")} onClick={(event) => goToPage(event, "home")}>Home</a>
            <a className={isServices ? "active" : ""} aria-current={isServices ? "page" : undefined} href={pageHref("services")} onClick={(event) => goToPage(event, "services")}>Services</a>
            <a className={isAbout ? "active" : ""} aria-current={isAbout ? "page" : undefined} href={pageHref("about")} onClick={(event) => goToPage(event, "about")}>About</a>
            <a className={isIndustries ? "active" : ""} aria-current={isIndustries ? "page" : undefined} href={pageHref("industries")} onClick={(event) => goToPage(event, "industries")}>Who We Help</a>
            <a className={isContact ? "active" : ""} aria-current={isContact ? "page" : undefined} href={pageHref("contact")} onClick={(event) => goToPage(event, "contact")}>Contact</a>
          </div>
          <Button href={pageHref("contact")}>Request Support</Button>
        </nav>
      </header>

      <main id="main-content">
        {isHome && <section className="hero" id="home">
          <div className="hero-bg" />
          <div className="container hero-grid">
            <div className="hero-copy reveal reveal-text">
              <p className="eyebrow"><Icon name="map" /> Philadelphia and surrounding areas</p>
              <h1>Reliable IT Support for Philadelphia Businesses</h1>
              <p className="hero-subtitle">
                FreedomTech LLC helps small businesses, offices, churches, nonprofits, and professional teams stay productive with fast troubleshooting, endpoint support, setup, maintenance, and practical technology guidance.
              </p>
              <div className="hero-actions">
                <Button href={pageHref("contact")}>Request IT Support <Icon name="arrow" /></Button>
                <Button href={pageHref("contact")} variant="secondary">Book a Consultation</Button>
              </div>
              <div className="trust-row" aria-label="Service highlights">
                <span><Icon name="check" /> Onsite and remote support</span>
                <span><Icon name="check" /> Endpoint assistance</span>
                <span><Icon name="check" /> Business-first guidance</span>
              </div>
            </div>

            <div className="hero-panel reveal">
              <div className="support-panel">
                <div className="support-brand">
                  <span className="wordmark-text">Freedomtech</span>
                </div>
                <div className="support-panel-copy">
                  <p>Philadelphia IT support</p>
                  <h2>Responsive help for the technology your team depends on.</h2>
                  <span>Setup, troubleshooting, endpoint support, Microsoft 365 help, and practical technology guidance for local organizations.</span>
                </div>
                <div className="support-points">
                  <span><Icon name="check" /> Local business focus</span>
                  <span><Icon name="check" /> Clear next steps</span>
                  <span><Icon name="check" /> Onsite and remote options</span>
                </div>
              </div>
            </div>
          </div>
        </section>}

        {isHome && <section className="intro section-pad">
          <div className="container intro-grid reveal reveal-text">
            <div>
              <p className="eyebrow dark">Premium local IT support</p>
              <h2>Professional tech support that keeps your business running.</h2>
            </div>
            <p>
              FreedomTech LLC provides business IT support in Philadelphia with a customer-first approach: clear communication, hands-on service, and technology help that makes sense for real offices, nonprofits, churches, and teams.
            </p>
          </div>
        </section>}

        {isServices && <section className="section-pad muted page-section" id="services">
          <div className="container">
            <SectionHeader
              eyebrow="Services"
              title="Modern IT services for offices, organizations, and growing teams"
              text="Support that is easy to understand, professionally delivered, and focused on keeping your team moving."
            />
            <div className="service-grid reveal">
              {services.map(([icon, title, text]) => (
                <article className={`service-card ${openServices.includes(title) ? "is-open" : ""}`} key={title}>
                  <button
                    type="button"
                    className="service-toggle"
                    onClick={() => toggleService(title)}
                    aria-expanded={openServices.includes(title)}
                    aria-controls={`service-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  >
                    <span className="card-icon"><Icon name={icon} /></span>
                    <span>{title}</span>
                  </button>
                  <p id={`service-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{text}</p>
                </article>
              ))}
            </div>
            <div className="cta-strip">
              <div>
                <h3>Need help with your technology?</h3>
                <p>Contact FreedomTech LLC today for Philadelphia IT support, business troubleshooting, setup, or a practical consultation.</p>
              </div>
              <Button href={pageHref("contact")}>Get Started</Button>
            </div>
          </div>
        </section>}

        {isAbout && <section className="section-pad page-section" id="about">
          <div className="container split">
            <div className="about-card reveal reveal-text">
              <p className="eyebrow">About FreedomTech</p>
              <h2>Business-minded IT support with a local Philadelphia touch.</h2>
              <p>
                FreedomTech LLC is a modern Philadelphia IT services company focused on responsive support, professional service, and practical solutions for organizations that rely on technology every day.
              </p>
              <div className="mission">
                <strong>Mission</strong>
                <span>To provide dependable IT support that helps businesses operate smoothly, confidently, and with less technology friction.</span>
              </div>
            </div>
            <div className="about-copy reveal reveal-text">
              <h3>Practical IT support without the runaround.</h3>
              <p>
                We help clients solve device issues, support users, set up systems, troubleshoot connectivity, improve Microsoft 365 workflows, and keep business technology organized. The work is technical, but the communication is straightforward.
              </p>
              <div className="value-grid">
                {values.map((value) => <span key={value}><Icon name="check" /> {value}</span>)}
              </div>
            </div>
          </div>
        </section>}

        {isIndustries && <section className="section-pad dark-section page-section" id="industries">
          <div className="container">
            <SectionHeader
              eyebrow="Who We Help"
              title="Dependable IT support for professional environments"
              text="FreedomTech supports organizations that need responsive, reliable, and business-friendly technology help."
              light
            />
            <div className="industry-grid reveal domino-grid">
              {industries.map(([icon, title, text]) => (
                <article className="industry-card" key={title}>
                  <Icon name={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {isIndustries && <section className="section-pad">
          <div className="container">
            <SectionHeader
              eyebrow="How It Works"
              title="Simple, clear, and built around your needs"
              text="Getting support should feel straightforward from the first message to the finished solution."
            />
            <div className="process-grid reveal domino-grid">
              {["Reach out", "Assess the issue", "Resolve the problem", "Support what is next"].map((step, index) => (
                <article className="process-card" key={step}>
                  <span>{index + 1}</span>
                  <h3>{step}</h3>
                  <p>
                    {index === 0 && "Tell us what your business needs help with."}
                    {index === 1 && "We review the request and recommend a practical path forward."}
                    {index === 2 && "We provide hands-on support onsite or remotely when appropriate."}
                    {index === 3 && "We help improve reliability and reduce repeat issues."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>}

        {isHome && <section className="section-pad testimonial-section">
          <div className="container testimonial-grid">
            <div>
              <p className="eyebrow dark">Trust</p>
              <h2>Built for clients who need professionalism from the first conversation.</h2>
            </div>
            <div className="quote-card">
              <p>Client success stories are being prepared and will be available soon.</p>
              <span>FreedomTech LLC</span>
            </div>
          </div>
        </section>}

        {isHome && <section className="section-pad muted">
          <div className="container faq-wrap">
            <SectionHeader eyebrow="FAQ" title="Questions businesses often ask" text="A few simple answers before you reach out." />
            {faqs.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>}

        {isContact && <section className="section-pad contact-section page-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy reveal reveal-text">
              <p className="eyebrow">Contact</p>
              <h2>Need reliable IT support?</h2>
              <p>
                Contact FreedomTech LLC for professional IT services in Philadelphia. Tell us what you need help with, and we will follow up with a practical next step.
              </p>
              <div className="contact-list">
                <span><Icon name="mail" /> info@freedomtechphilly.com</span>
                <span><Icon name="phone" /> +1 (267) 243-5201</span>
                <span><Icon name="map" /> Philadelphia, PA and surrounding areas</span>
              </div>
            </div>
            <form
              className="contact-form reveal reveal-text"
              aria-label="Request IT support form"
              action="https://formsubmit.co/info@freedomtechphilly.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New FreedomTech support request" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <h3>Request IT Support</h3>
              <p>Fill out the form and we will help you figure out the right solution.</p>
              <div className="form-row">
                <label className="field">
                  <span>Name</span>
                  <input name="name" autoComplete="name" placeholder="Jane Smith" required />
                </label>
                <label className="field">
                  <span>Business Name</span>
                  <input name="business_name" autoComplete="organization" placeholder="Company or organization" />
                </label>
              </div>
              <div className="form-row">
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
                <label className="field">
                  <span>Phone</span>
                  <input name="phone" type="tel" autoComplete="tel" placeholder="+1 (267) 243-5201" />
                </label>
              </div>
              <label className="field">
                <span>Service Needed</span>
                <select name="service_needed" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  <option>IT Support</option>
                  <option>Computer Setup</option>
                  <option>Microsoft 365 Support</option>
                  <option>Printer / Peripheral Setup</option>
                  <option>Network Troubleshooting</option>
                  <option>Consultation</option>
                </select>
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" placeholder="Tell us what you need help with" required />
              </label>
              <button type="submit">Submit Request <Icon name="arrow" /></button>
            </form>
          </div>
        </section>}

        {isPrivacy && <section className="section-pad muted page-section" id="privacy">
          <div className="container legal-wrap">
            <div className="section-header reveal reveal-text">
              <p>Privacy</p>
              <h1>Privacy Policy</h1>
              <span>Last updated May 24, 2026. This policy explains how FreedomTech LLC handles information submitted through this website.</span>
            </div>
            <div className="legal-card reveal reveal-text">
              <h2>Information we collect</h2>
              <p>
                When you contact FreedomTech LLC through this website, we may collect your name, business name, email address, phone number, service request details, and any message you choose to send.
              </p>
              <h2>How we use information</h2>
              <p>
                We use submitted information to respond to requests, provide IT support, schedule consultations, communicate with prospective clients, improve our services, and maintain business records.
              </p>
              <h2>Third-party services</h2>
              <p>
                This website may use third-party services such as GitHub Pages for hosting, Google Fonts for website typography, and FormSubmit to process contact form submissions. These providers may process technical information needed to operate their services.
              </p>
              <h2>Sharing information</h2>
              <p>
                FreedomTech LLC does not sell personal information. We may share information with service providers that help operate the website or business, when required by law, or when needed to protect our rights, clients, website, or services.
              </p>
              <h2>Data security</h2>
              <p>
                We use reasonable administrative and technical practices to protect information, but no website, email, or online form can be guaranteed completely secure. Please avoid submitting passwords, sensitive account credentials, or confidential system details through the contact form.
              </p>
              <h2>Your choices</h2>
              <p>
                To request access, correction, or deletion of information you submitted through this website, contact us at <a href="mailto:info@freedomtechphilly.com">info@freedomtechphilly.com</a>.
              </p>
            </div>
          </div>
        </section>}

        {isTerms && <section className="section-pad muted page-section" id="terms">
          <div className="container legal-wrap">
            <div className="section-header reveal reveal-text">
              <p>Terms</p>
              <h1>Terms of Service</h1>
              <span>Last updated May 24, 2026. These terms describe basic conditions for using this website and contacting FreedomTech LLC.</span>
            </div>
            <div className="legal-card reveal reveal-text">
              <h2>Website information</h2>
              <p>
                The information on this website is provided for general business and informational purposes. It does not create a client relationship, service agreement, warranty, or guarantee of availability.
              </p>
              <h2>Service requests</h2>
              <p>
                Submitting a contact form, email, or phone request does not guarantee immediate support or acceptance of a project. Services, scope, timelines, and pricing are handled through separate communication, quotes, or agreements.
              </p>
              <h2>No emergency guarantee</h2>
              <p>
                This website is not intended for emergency response. If your business has an urgent outage, security incident, or safety concern, use appropriate emergency, vendor, or internal escalation channels in addition to contacting FreedomTech LLC.
              </p>
              <h2>Acceptable use</h2>
              <p>
                You agree not to misuse this website, interfere with its operation, submit harmful code, attempt unauthorized access, or use the website for fraudulent, unlawful, or abusive activity.
              </p>
              <h2>Third-party links and tools</h2>
              <p>
                This website may rely on third-party tools or links. FreedomTech LLC is not responsible for the content, policies, security, or practices of third-party websites or providers.
              </p>
              <h2>Limitation of liability</h2>
              <p>
                To the fullest extent permitted by law, FreedomTech LLC is not liable for damages arising from use of this website, inability to use the website, or reliance on general website information.
              </p>
              <h2>Contact</h2>
              <p>
                Questions about these terms can be sent to <a href="mailto:info@freedomtechphilly.com">info@freedomtechphilly.com</a>.
              </p>
            </div>
          </div>
        </section>}

        {isAccessibility && <section className="section-pad muted page-section" id="accessibility">
          <div className="container legal-wrap">
            <div className="section-header reveal reveal-text">
              <p>Accessibility</p>
              <h1>Accessibility Statement</h1>
              <span>FreedomTech LLC is committed to making this website usable for all visitors, including people using assistive technology.</span>
            </div>
            <div className="legal-card reveal reveal-text">
              <h2>Our accessibility goal</h2>
              <p>
                We aim to follow WCAG Level AA accessibility practices where practical, including keyboard-friendly navigation, readable contrast, visible focus indicators, clear form labels, reduced-motion support, and structured page content.
              </p>
              <h2>Need help using this site?</h2>
              <p>
                If you experience a problem accessing information, completing the contact form, or using any part of this website, please contact FreedomTech LLC so we can assist you and improve the experience.
              </p>
              <p>
                Email: <a href="mailto:info@freedomtechphilly.com">info@freedomtechphilly.com</a><br />
                Phone: <a href="tel:+12672435201">+1 (267) 243-5201</a>
              </p>
            </div>
          </div>
        </section>}
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <p>Copyright {new Date().getFullYear()} FreedomTech LLC. All rights reserved.</p>
          <p>
            IT services in Philadelphia | Business IT support | Onsite and remote support |{" "}
            <a href={pageHref("privacy")} onClick={(event) => goToPage(event, "privacy")}>Privacy Policy</a> |{" "}
            <a href={pageHref("terms")} onClick={(event) => goToPage(event, "terms")}>Terms</a> |{" "}
            <a href={pageHref("accessibility")} onClick={(event) => goToPage(event, "accessibility")}>Accessibility</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
