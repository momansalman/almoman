import { useState, useEffect, useRef } from "react";
import "./App.css";

const menuData = {
  mainCourse: {
    icon: "🥟", title: "Main Course",
    items: [
      { name: "Samosa & Roll Patti (All Sizes)", price: "320/Kg", tag: "bestseller" },
      { name: "Chicken with Vegetable Samosa (15 pcs)", price: "Rs 250" },
      { name: "Chicken Samosa (15 pcs)", price: "Rs 450" },
      { name: "Potato Samosa (15 pcs)", price: "Rs 220" },
      { name: "Potato Chicken Samosa (15 pcs)", price: "Rs 300" },
      { name: "Chicken Tikka Samosa (15 pcs)", price: "Rs 500", tag: "spicy" },
      { name: "Pizza Samosa", price: "Rs 500" },
      { name: "Malai Boti Samosa", price: "Rs 450", tag: "special" },
    ],
  },
  appetizers: {
    icon: "🍢", title: "Appetizers",
    items: [
      { name: "Chapli Kabab (6 pcs)", price: "Rs 500" },
      { name: "Seikh Kabab (8 pcs)", price: "Rs 500" },
      { name: "Burger Patti (6 pcs)", price: "Rs 500" },
      { name: "Nuggets (18 pcs)", price: "Rs 500", tag: "bestseller" },
      { name: "Chicken Sticks (50 pcs)", price: "Rs 600", tag: "value" },
      { name: "Chicken Kofta (12 pcs)", price: "Rs 550" },
      { name: "Drum Sticks (5 pcs)", price: "Rs 500" },
      { name: "Shami Kabab (12 pcs)", price: "Rs 500" },
    ],
  },
  course: {
    icon: "🌯", title: "Course",
    items: [
      { name: "Chicken with Vegetable Roll (12 pcs)", price: "Rs 250" },
      { name: "Chicken Roll (12 pcs)", price: "Rs 450" },
      { name: "Chicken Cheese Ball (6 pcs)", price: "Rs 550", tag: "special" },
      { name: "Chicken Bread Roll (6 pcs)", price: "Rs 450" },
      { name: "Chicken Tikka Roll (12 pcs)", price: "Rs 500", tag: "hot" },
      { name: "Thread Chicken (6 pcs)", price: "Rs 500" },
    ],
  },
};

const tagColors = {
  bestseller: "#c9942a",
  spicy: "#c0392b",
  special: "#7c5cbf",
  value: "#1e7e45",
  hot: "#c0392b",
};

function Tag({ label }) {
  return (
    <span style={{
      background: tagColors[label] || "#c9942a",
      color: "#fff", fontSize: "0.56rem", fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.1em",
      padding: "2px 8px", borderRadius: "2px",
      marginLeft: "10px", verticalAlign: "middle",
      display: "inline-block", fontFamily: "'Cinzel', serif",
    }}>{label}</span>
  );
}

function MenuItem({ item, index }) {
  return (
    <div className="menu-item" style={{ animationDelay: `${index * 0.06}s` }}>
      <span className="item-name">
        {item.name}
        {item.tag && <Tag label={item.tag} />}
      </span>
      <span className="item-price">{item.price}</span>
    </div>
  );
}

function MenuSection({ sectionKey, data }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} className={`menu-section ${visible ? "visible" : ""}`} id={sectionKey}>
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-icon">{data.icon}</span>
          <h2 className="section-title">{data.title}</h2>
        </div>
        <div className="section-line" />
      </div>
      <div className="items-grid">
        {data.items.map((item, i) => <MenuItem key={i} item={item} index={i} />)}
      </div>
    </section>
  );
}

const WA_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waMsg = encodeURIComponent("Assalam o Alaikum! I want to place an order from Al-Moman Frozen Items. 🍗");

  return (
    <>
      {/* NAVBAR */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">Al‑Moman</div>
        <div className="nav-links">
          <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
          <a href="#appetizers" onClick={() => setMenuOpen(false)}>Appetizers</a>
          <a href="#course" onClick={() => setMenuOpen(false)}>Course</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a>
        <a href="#appetizers" onClick={() => setMenuOpen(false)}>Appetizers</a>
        <a href="#course" onClick={() => setMenuOpen(false)}>Course</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-ornament tl" />
        <div className="hero-ornament tr" />
        <div className="hero-ornament bl" />
        <div className="hero-ornament br" />

        <div className="hero-badge">Special Frozen Chicken Food</div>
        <p className="hero-eyebrow">Authentic · Handcrafted · Premium</p>
        <h1 className="hero-title">
          AL‑<span className="line2">Moman</span>
        </h1>
        <div className="hero-title-underline" />
        <p className="hero-sub">Frozen Items · Premium Quality · Delivered Fresh</p>

        <div className="hero-divider">
          <div className="hero-divider-line" />
          <div className="hero-divider-diamond" />
          <div className="hero-divider-line right" />
        </div>

        <p className="hero-desc">
          Handcrafted frozen chicken delicacies made with authentic spices
          and premium ingredients. Ready to cook, impossible to resist.
        </p>

        <div className="hero-cta">
          <a href="#menu" className="btn-primary">View Full Menu</a>
          <a href="#contact" className="btn-outline">Order Now</a>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-dot" />
          <span>scroll</span>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[
          { num: "30+", label: "Menu Items" },
          { num: "100%", label: "Halal" },
          { num: "Fresh", label: "Frozen Daily" },
          { num: "Fast", label: "Delivery" },
        ].map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* MENU */}
      <div className="menu-container" id="menu">
        <div className="menu-headline">
          <p className="menu-headline-eyebrow">— Our Offerings —</p>
          <h1>The Menu</h1>
          <p>Everything made fresh &amp; frozen to perfection</p>
        </div>
        {Object.entries(menuData).map(([key, data]) => (
          <MenuSection key={key} sectionKey={key} data={data} />
        ))}
      </div>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <p className="contact-eyebrow">— Get in Touch —</p>
        <h2>Order Now</h2>
        <p>Call us or message on WhatsApp to place your order</p>

        <div className="contact-cards">
          <a href="tel:03206442107" className="contact-card">
            <span className="phone-icon">📞</span>
            <span className="phone-num">0320-6442107</span>
          </a>
          <a href="tel:03150179560" className="contact-card">
            <span className="phone-icon">📞</span>
            <span className="phone-num">0315-0179560</span>
          </a>
        </div>

        <div className="whatsapp-section">
          <p className="whatsapp-label">✦ Order via WhatsApp ✦</p>
          <div className="whatsapp-cards">
            <a href={`https://wa.me/923206442107?text=${waMsg}`} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
              {WA_SVG} Chat — 0320-6442107
            </a>
            <a href={`https://wa.me/923150179560?text=${waMsg}`} className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
              {WA_SVG} Chat — 0315-0179560
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 <span className="highlight">Al‑Moman Frozen Items</span>. All rights reserved.</p>
        <p className="footer-sub">Made with ❤️ in Pakistan</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a href={`https://wa.me/923206442107?text=${waMsg}`} className="float-wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Order">
        {WA_SVG}
      </a>
    </>
  );
}