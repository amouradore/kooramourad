import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/match-card.css';

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/match/${match.id}`);
  };

  return (
    <div className="match-card">
      <div className="match-header">
        <span className="competition">{match.competition}</span>
        <span className="match-time">{match.time}</span>
      </div>
      
      <div className="match-teams">
        <div className="team home">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="team-logo" />
          <span className="team-name">{match.homeTeam.name}</span>
          <span className="score">{match.homeTeam.score}</span>
        </div>
        
        <div className="match-status">
          {match.isLive ? (
            <span className="live-badge">EN DIRECT</span>
          ) : (
            <span className="time">{match.kickoff}</span>
          )}
        </div>
        
        <div className="team away">
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="team-logo" />
          <span className="team-name">{match.awayTeam.name}</span>
          <span className="score">{match.awayTeam.score}</span>
        </div>
      </div>
      
      <div className="match-footer">
        <button className="details-btn" onClick={handleClick}>Voir les détails</button>
      </div>
    </div>
  );
};

export default MatchCard; 