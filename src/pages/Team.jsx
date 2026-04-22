import "../styles/team.css";

const teamMembers = [
  { name: "Binuk", role: "Technical Director", icon: "🔧" },
  { name: "Khor Zheng Yu", role: "Camera Director", icon: "🎥" },
  { name: "Lim Zheng Yan", role: "Lead Broadcasting", icon: "📡" },
  { name: "Tan Kee Wei", role: "Photographer", icon: "📷" },
  { name: "Lee Yu Zheng", role: "Audio Engineer Front of House", icon: "🎧" },
];

function Team() {
  return (
    <div className="team-container">
      <h1>Our Team</h1>
      <p className="subtitle">Meet the crew behind the scenes.</p>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="avatar">{member.icon}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;