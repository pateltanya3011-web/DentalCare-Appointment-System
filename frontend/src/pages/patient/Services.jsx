import './Patient.css';

const SERVICES = [
  { icon: '🦷', title: 'General Checkup', desc: 'Routine dental exam and cleaning to maintain oral health.', price: '₹500' },
  { icon: '⚪', title: 'Teeth Whitening', desc: 'Professional whitening treatment for a brighter smile.', price: '₹2,500' },
  { icon: '🔧', title: 'Cavity Filling', desc: 'Tooth-colored fillings to restore decayed teeth.', price: '₹800' },
  { icon: '👑', title: 'Dental Crown', desc: 'Custom crowns to protect and restore damaged teeth.', price: '₹5,000' },
  { icon: '📐', title: 'Braces / Aligners', desc: 'Orthodontic treatment for straighter, aligned teeth.', price: '₹15,000' },
  { icon: '🔩', title: 'Dental Implant', desc: 'Permanent tooth replacement with implant technology.', price: '₹25,000' },
  { icon: '🩺', title: 'Root Canal', desc: 'Pain-free root canal treatment to save infected teeth.', price: '₹3,500' },
  { icon: '✂️', title: 'Tooth Extraction', desc: 'Safe and gentle removal of damaged or wisdom teeth.', price: '₹600' },
];

export default function Services({ setActiveTab }) {
  return (
    <div>
      <div className="page-header">
        <h2>Our Dental Services</h2>
        <p>We offer a wide range of dental treatments for your complete oral care.</p>
      </div>

      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <div key={i} className="service-card card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-footer">
              <span className="service-price">{s.price}</span>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('book')}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
