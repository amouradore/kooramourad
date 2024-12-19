// Composant de navigation
class Navbar {
    constructor() {
        this.template = `
            <nav class="navbar">
                <div class="navbar-brand">
                    <img src="assets/images/logo.png" alt="Yalla Foot" class="logo">
                    <h1>Yalla Foot</h1>
                </div>
                <ul class="nav-links">
                    <li><a href="#" data-page="matches">Matches</a></li>
                    <li><a href="#" data-page="standings">Classements</a></li>
                    <li><a href="#" data-page="teams">Équipes</a></li>
                </ul>
            </nav>
        `;
    }

    render() {
        return this.template;
    }
}