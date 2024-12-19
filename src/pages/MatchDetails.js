import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/match-details.css';

const MatchDetails = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation d'un appel API
    const fetchMatchDetails = () => {
      // Pour l'exemple, on utilise des données statiques
      const demoMatch = {
        id: 1,
        competition: "Ligue 1",
        time: "20:00",
        status: "En cours",
        stadium: "Parc des Princes",
        attendance: "45,000",
        referee: "M. Dupont",
        homeTeam: {
          name: "PSG",
          logo: "/images/teams/psg.png",
          score: 2,
          scorers: ["Mbappé (23')", "Messi (45')"],
          possession: 60,
          shots: 15,
          shotsOnTarget: 8,
          corners: 6,
          fouls: 10
        },
        awayTeam: {
          name: "Marseille",
          logo: "/images/teams/marseille.png",
          score: 1,
          scorers: ["Payet (35')"],
          possession: 40,
          shots: 8,
          shotsOnTarget: 3,
          corners: 4,
          fouls: 12
        }
      };

      setMatch(demoMatch);
      setLoading(false);
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) return <div className="loading">Chargement des détails du match...</div>;
  if (!match) return <div>Match non trouvé</div>;

  return (
    <div className="match-details">
      <div className="match-header-details">
        <div className="competition-info">
          <h2>{match.competition}</h2>
          <p>{match.stadium}</p>
        </div>
        
        <div className="match-score-details">
          <div className="team-detail home">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} />
            <h3>{match.homeTeam.name}</h3>
            <span className="score">{match.homeTeam.score}</span>
          </div>
          
          <div className="match-status-detail">
            <span className="time">{match.status}</span>
          </div>
          
          <div className="team-detail away">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} />
            <h3>{match.awayTeam.name}</h3>
            <span className="score">{match.awayTeam.score}</span>
          </div>
        </div>

        <div className="match-stats">
          <h3>Statistiques</h3>
          <div className="stat-row">
            <span>{match.homeTeam.possession}%</span>
            <span className="stat-label">Possession</span>
            <span>{match.awayTeam.possession}%</span>
          </div>
          <div className="stat-row">
            <span>{match.homeTeam.shots}</span>
            <span className="stat-label">Tirs</span>
            <span>{match.awayTeam.shots}</span>
          </div>
          <div className="stat-row">
            <span>{match.homeTeam.shotsOnTarget}</span>
            <span className="stat-label">Tirs cadrés</span>
            <span>{match.awayTeam.shotsOnTarget}</span>
          </div>
          <div className="stat-row">
            <span>{match.homeTeam.corners}</span>
            <span className="stat-label">Corners</span>
            <span>{match.awayTeam.corners}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails; 