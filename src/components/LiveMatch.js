function LiveMatch() {
  const handleWatchLive = () => {
    // Chemin vers le fichier M3U dans le dossier public
    const m3uFileUrl = `${window.location.origin}/playlists/live-matches.m3u`;

    // Proposer à l'utilisateur d'ouvrir avec PotPlayer ou dans le navigateur
    const usePotPlayer = window.confirm('Voulez-vous ouvrir avec PotPlayer (OK) ou dans le navigateur (Annuler) ?');

    if (usePotPlayer) {
      // Ouvrir avec PotPlayer
      window.location.href = `potplayer://${m3uFileUrl}`;
    } else {
      // Ouvrir dans le navigateur avec un lecteur web
      const webPlayerUrl = `https://www.hlsplayer.net/play?url=${encodeURIComponent(m3uFileUrl)}`;
      window.open(webPlayerUrl, '_blank');
    }
  };

  return (
    <div className="live-match-container">
      <button onClick={handleWatchLive} className="watch-live-button">
        Regarder en Direct
      </button>
      <p className="player-info">
        Pour une meilleure expérience, nous recommandons d'utiliser PotPlayer 64 bit
      </p>
    </div>
  );
}

export default LiveMatch; 