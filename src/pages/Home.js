import React, { useState, useEffect } from 'react';
import MatchCard from '../components/match-card';
import '../styles/home.css';

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchTodayMatches = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${today}`,
        {
          headers: {
            'X-Auth-Token': '3f9226033c324e538d8d34a36118390b'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des matches');
      }

      const data = await response.json();
      
      const formattedMatches = data.matches.map(match => ({
        id: match.id,
        competition: match.competition.name,
        time: new Date(match.utcDate).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isLive: match.status === 'IN_PLAY' || match.status === 'PAUSED',
        kickoff: new Date(match.utcDate).toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: match.status,
        homeTeam: {
          name: match.homeTeam.name,
          logo: match.homeTeam.crest,
          score: match.score.fullTime.home
        },
        awayTeam: {
          name: match.awayTeam.name,
          logo: match.awayTeam.crest,
          score: match.score.fullTime.away
        }
      }));

      setMatches(formattedMatches);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Impossible de charger les matches');
      setLoading(false);
    }
  };

  // Premier chargement
  useEffect(() => {
    fetchTodayMatches();
  }, []);

  // Rafraîchissement automatique
  useEffect(() => {
    const hasLiveMatches = matches.some(match => 
      match.status === 'IN_PLAY' || match.status === 'PAUSED'
    );

    let interval;
    if (hasLiveMatches) {
      interval = setInterval(() => {
        fetchTodayMatches();
      }, 60000); // Rafraîchissement toutes les 60 secondes
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [matches]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Suivez tous vos matches en direct</h1>
        <p>Les scores en temps réel des plus grandes compétitions</p>
      </div>

      <div className="matches-section">
        <div className="matches-header">
          <h2>Matches du jour</h2>
          <div className="last-update">
            Dernière mise à jour : {lastUpdate.toLocaleTimeString('fr-FR')}
          </div>
        </div>
        
        {loading ? (
          <div className="loading">Chargement des matches...</div>
        ) : matches.length > 0 ? (
          <div className="matches-grid">
            {matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="no-matches">Aucun match prévu aujourd'hui</div>
        )}
      </div>
    </div>
  );
};

export default Home; 