class MatchCard {
    constructor(match) {
        this.match = match;
    }

    render() {
        return `
            <div class="match-card">
                <div class="match-header">
                    <span class="league">${this.match.league}</span>
                    <span class="status">${this.match.status}</span>
                </div>
                <div class="match-teams">
                    <div class="team home">
                        <img src="${this.match.homeTeam.logo}" alt="${this.match.homeTeam.name}" class="team-logo">
                        <span class="team-name">${this.match.homeTeam.name}</span>
                        <span class="score">${this.match.homeTeam.score}</span>
                    </div>
                    <div class="vs">VS</div>
                    <div class="team away">
                        <span class="score">${this.match.awayTeam.score}</span>
                        <span class="team-name">${this.match.awayTeam.name}</span>
                        <img src="${this.match.awayTeam.logo}" alt="${this.match.awayTeam.name}" class="team-logo">
                    </div>
                </div>
                <div class="match-info">
                    <span class="time">${this.match.time}</span>
                    <span class="date">${this.match.date}</span>
                </div>
            </div>
        `;
    }
}