import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// Fonction utilitaire pour convertir l'heure dans différents fuseaux horaires
const getTimeInTimeZone = (date, timezone) => {
  return new Date(date).toLocaleTimeString('fr-FR', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Composant pour la page de détails du match
function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  // Liste des chaînes par compétition
  const getChannelsByLeague = (leagueName) => {
    const channelsMap = {
      'La Liga': [
        { name: 'beIN Sports Premium 1', country: 'MENA' },
        { name: 'beIN Sports HD 3', country: 'MENA' },
        { name: 'SuperSport LaLiga', country: 'Afrique' },
        { name: 'ESPN Deportes', country: 'USA' },
        { name: 'Movistar LaLiga', country: 'Espagne' },
        { name: 'Eleven Sports 1', country: 'Belgique' },
        { name: 'Canal+ Sport', country: 'France' }
      ],
      'Premier League': [
        { name: 'beIN Sports Premium 1', country: 'MENA' },
        { name: 'Canal+ Sport', country: 'France' },
        { name: 'Sky Sports', country: 'UK' }
      ],
      // Ajoutez d'autres ligues selon vos besoins
    };

    return channelsMap[leagueName] || [];
  };

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?id=${id}`,
          {
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': 'd7e2ba82dd1f70a9849322cee345826f'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.response && data.response.length > 0) {
          setMatch(data.response[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching match details:', error);
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) return <div className="loading">Chargement des détails du match...</div>;
  if (!match) return <div className="error">Match non trouvé</div>;

  const channels = getChannelsByLeague(match.league.name);

  return (
    <div className="match-details-container">
      <div className="teams-header">
        <div className="team-detail">
          <img src={match.teams.home.logo} alt={match.teams.home.name} className="team-logo-large" />
          <h2>{match.teams.home.name}</h2>
        </div>
        <div className="match-status">
          <div className="match-time-big">
            {new Date(match.fixture.date).toLocaleString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          <div className="league-name">{match.league.name}</div>
        </div>
        <div className="team-detail">
          <img src={match.teams.away.logo} alt={match.teams.away.name} className="team-logo-large" />
          <h2>{match.teams.away.name}</h2>
        </div>
      </div>

      <div className="match-info-details">
        <h3>Informations du match</h3>
        
        <div className="tv-channels">
          <h4>Chaînes de diffusion :</h4>
          {channels.length > 0 ? (
            <ul>
              {channels.map((channel, index) => (
                <li key={index}>
                  <div className="channel-info">
                    <span className="channel-name">
                      {channel.name}
                      <span className="channel-country"> ({channel.country})</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune information de diffusion disponible pour le moment</p>
          )}
        </div>

        {/* Section des fuseaux horaires */}
        <div className="time-zones">
          <h4>Horaires selon les fuseaux horaires :</h4>
          <div className="time-zones-grid">
            {/* Moyen-Orient et Afrique du Nord */}
            <div className="time-zone-group">
              <h5>Moyen-Orient et Afrique du Nord</h5>
              <ul>
                <li>Égypte : {getTimeInTimeZone(match.fixture.date, 'Africa/Cairo')}</li>
                <li>Arabie Saoudite : {getTimeInTimeZone(match.fixture.date, 'Asia/Riyadh')}</li>
                <li>Émirats : {getTimeInTimeZone(match.fixture.date, 'Asia/Dubai')}</li>
                <li>Qatar : {getTimeInTimeZone(match.fixture.date, 'Asia/Qatar')}</li>
                <li>Koweït : {getTimeInTimeZone(match.fixture.date, 'Asia/Kuwait')}</li>
              </ul>
            </div>

            {/* Maghreb */}
            <div className="time-zone-group">
              <h5>Maghreb</h5>
              <ul>
                <li>Algérie : {getTimeInTimeZone(match.fixture.date, 'Africa/Algiers')}</li>
                <li>Maroc : {getTimeInTimeZone(match.fixture.date, 'Africa/Casablanca')}</li>
                <li>Tunisie : {getTimeInTimeZone(match.fixture.date, 'Africa/Tunis')}</li>
              </ul>
            </div>

            {/* Europe */}
            <div className="time-zone-group">
              <h5>Europe</h5>
              <ul>
                <li>France : {getTimeInTimeZone(match.fixture.date, 'Europe/Paris')}</li>
                <li>Belgique : {getTimeInTimeZone(match.fixture.date, 'Europe/Brussels')}</li>
                <li>Suisse : {getTimeInTimeZone(match.fixture.date, 'Europe/Zurich')}</li>
                <li>Royaume-Uni : {getTimeInTimeZone(match.fixture.date, 'Europe/London')}</li>
              </ul>
            </div>

            {/* Amériques */}
            <div className="time-zone-group">
              <h5>Amériques</h5>
              <ul>
                <li>New York : {getTimeInTimeZone(match.fixture.date, 'America/New_York')}</li>
                <li>Montréal : {getTimeInTimeZone(match.fixture.date, 'America/Montreal')}</li>
                <li>Los Angeles : {getTimeInTimeZone(match.fixture.date, 'America/Los_Angeles')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant pour la diffusion en direct
function LiveMatch() {
  const handleM3UStream = () => {
    // Le fichier est servi depuis le dossier public
    const m3uFileUrl = '/playlists/live-matches.m3u';
    
    // Lecteurs compatibles M3U
    const players = {
      clappr: 'https://cdn.clappr.io/latest/demo/?url=',
      hlsplayer: 'https://www.hlsplayer.net/play?url=',
      vlc: 'vlc://'
    };

    // Créer un menu de sélection du lecteur
    const playerChoice = window.confirm('Voulez-vous ouvrir avec VLC (OK) ou dans le navigateur (Annuler) ?');
    
    if (playerChoice) {
      // Ouvrir avec VLC
      window.location.href = `vlc://${window.location.origin}${m3uFileUrl}`;
    } else {
      // Ouvrir dans le navigateur avec Clappr
      window.open(players.clappr + encodeURIComponent(window.location.origin + m3uFileUrl), '_blank');
    }
  };

  return (
    <div className="live-match-container">
      <button onClick={handleM3UStream} className="watch-live-button">
        Regarder en Direct
      </button>
      <p className="player-note">
        Note: Pour une meilleure expérience, assurez-vous d'avoir VLC installé sur votre ordinateur.
      </p>
    </div>
  );
}

// Composant séparé pour la liste des matches
function MatchesList({ matches }) {
  const navigate = useNavigate();

  // Définir l'ordre de priorité des compétitions
  const leaguePriority = {
    2: 1,    // Champions League
    39: 2,   // Premier League
    140: 3,  // La Liga
    78: 4,   // Bundesliga
    135: 5,  // Serie A
    61: 6,   // Ligue 1
    3: 7,    // Europa League
    848: 8,  // EFL Cup
    143: 9,  // Copa del Rey
    45: 10,  // FA Cup
    528: 11  // Saudi Super Cup
  };

  // Regrouper les matches par compétition
  const matchesByLeague = matches.reduce((acc, match) => {
    const leagueId = match.league.id;
    if (!acc[leagueId]) {
      acc[leagueId] = {
        league: match.league,
        matches: [],
        priority: leaguePriority[match.league.name] || 999 // Priorité par défaut pour les autres compétitions
      };
    }
    acc[leagueId].matches.push(match);
    return acc;
  }, {});

  // Trier les compétitions par priorité
  const sortedLeagues = Object.values(matchesByLeague).sort((a, b) => a.priority - b.priority);

  const handleMatchClick = (match, index, isFirstLeague) => {
    // Premier match de la première ligue
    if (index === 0 && isFirstLeague) {
      const streamUrl = "http://mo3ad.xyz:80/play/0g1pF61pK2eO6wdlWCDN29pfJhjXNFgTlKvaIe7mL3k/ts";
      try {
        window.location.href = `potplayer://${streamUrl}`;
      } catch (error) {
        console.error('Erreur lors de l\'ouverture avec PotPlayer:', error);
        window.open(streamUrl, '_blank');
      }
    } 
    // Deuxième match de la première ligue
    else if (index === 1 && isFirstLeague) {
      const m3uFileUrl = `${window.location.origin}/playlists/beinsport3.m3u`;
      try {
        window.location.href = `potplayer://${m3uFileUrl}`;
      } catch (error) {
        console.error('Erreur lors de l\'ouverture avec PotPlayer:', error);
        window.open(m3uFileUrl, '_blank');
      }
    } 
    // Autres matches
    else {
      navigate(`/match/${match.fixture.id}`);
    }
  };

  return (
    <div className="matches-list">
      {sortedLeagues.map(({ league, matches }, leagueIndex) => (
        <div key={league.id} className="league-section">
          <div className="league-header">
            <div className="league-info">
              <img 
                src={league.logo} 
                alt={league.name} 
                className="league-logo"
              />
              <span className="league-name">{league.name}</span>
              <img 
                src={league.flag} 
                alt={league.country} 
                className="country-flag"
              />
            </div>
          </div>
          
          <div className="league-matches">
            {matches.map((match, matchIndex) => (
              <div 
                key={match.fixture.id} 
                className="match-card"
                onClick={() => handleMatchClick(match, matchIndex, leagueIndex === 0)}
              >
                <div className="match-info">
                  <div className="team-info">
                    <div className="team-container">
                      <img src={match.teams.home.logo} alt={match.teams.home.name} className="team-logo" />
                      <span className="equipe">{match.teams.home.name}</span>
                    </div>
                  </div>
                  <span className="score">
                    {match.fixture.status.short === 'FT' 
                      ? `${match.goals.home} - ${match.goals.away}`
                      : match.fixture.status.short === 'LIVE'
                      ? `${match.goals.home} - ${match.goals.away} (En cours)`
                      : 'vs'}
                  </span>
                  <div className="team-info">
                    <div className="team-container">
                      <img src={match.teams.away.logo} alt={match.teams.away.name} className="team-logo" />
                      <span className="equipe">{match.teams.away.name}</span>
                    </div>
                  </div>
                </div>
                <div className="match-time">
                  {new Date(match.fixture.date).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLiveMatches, setShowLiveMatches] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        console.log('Début de la récupération des matches...');
        
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?date=${today}`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'v3.football.api-sports.io',
              'x-rapidapi-key': 'd7e2ba82dd1f70a9849322cee345826f'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Données reçues:', data);

        if (data.response && data.response.length > 0) {
          // Filtrer les matches des compétitions qui nous intéressent
          const filteredMatches = data.response.filter(match => {
            const leagueId = match.league.id;
            return [
              2,    // Champions League
              39,   // Premier League
              140,  // La Liga
              78,   // Bundesliga
              61,   // Ligue 1
              135,  // Serie A
              3,    // Europa League
              848,  // EFL Cup
              143,  // Copa del Rey
              45,   // FA Cup
              528   // Saudi Super Cup
            ].includes(leagueId);
          });

          console.log('Matches filtrés:', filteredMatches);
          setMatches(filteredMatches);
        } else {
          console.log('Aucun match trouvé');
          setMatches([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Erreur détaillée:', err);
        setError(`Erreur de connexion à l'API: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMatches();
    
    // Rafraîchir toutes les 5 minutes
    const interval = setInterval(fetchMatches, 300000);
    
    return () => clearInterval(interval);
  }, []); // Dépendances vides pour ne s'exécuter qu'au montage

  useEffect(() => {
    // Mettre à jour l'heure actuelle chaque minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Pour le débogage
  console.log('État actuel:', {
    matches,
    loading,
    error,
    currentTime: new Date().toISOString()
  });

  // Rendu de l'application
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="time-display">
              {currentTime.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              <div className="date-display">
                {currentTime.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>
            <h1>مراد فالسطاد - Matches en Direct</h1>
            <button 
              className="live-button"
              onClick={() => {
                const m3uFileUrl = `${window.location.origin}/playlists/live-matches.m3u`;
                const usePotPlayer = window.confirm('Voulez-vous ouvrir avec PotPlayer (OK) ou dans le navigateur (Annuler) ?');
                
                if (usePotPlayer) {
                  window.location.href = `potplayer://${m3uFileUrl}`;
                } else {
                  window.open(`https://www.hlsplayer.net/play?url=${encodeURIComponent(m3uFileUrl)}`, '_blank');
                }
              }}
            >
              Regarder en Direct
            </button>
          </div>
        </header>

        <Routes>
          <Route 
            path="/" 
            element={
              loading ? (
                <div className="loading">Chargement des matches...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <MatchesList matches={matches} />
              )
            } 
          />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path="/live/:id" element={<LiveMatch />} />
        </Routes>

        {showLiveMatches && (
          <div className="live-overlay">
            <button 
              className="close-button"
              onClick={() => setShowLiveMatches(false)}
            >
              ✕
            </button>
            <LiveMatch />
          </div>
        )}
      </div>
    </Router>
  );
}

// Fonction pour obtenir le code du pays
function getCountryCode(countryName) {
  const countryCodes = {
    'England': 'gb-eng',
    'Spain': 'es',
    'Germany': 'de',
    'Italy': 'it',
    'France': 'fr',
    'Netherlands': 'nl',
    'Portugal': 'pt',
    'Belgium': 'be',
    'Turkey': 'tr',
    'Scotland': 'gb-sct',
    'Brazil': 'br',
    'Argentina': 'ar',
    'Saudi Arabia': 'sa',
    // Ajoutez d'autres codes pays si nécessaire pour les nouvelles compétitions
  };
  return countryCodes[countryName] || 'unknown';
}

export default App; 