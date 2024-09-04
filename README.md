# Spotify Dashboard

This project provides a React-based dashboard application using Vite for fast development and builds. The dashboard fetches and displays music data from Spotify, specifically focusing on tracks released in India in 2023.

## Features

- **Spotify Integration**: Fetches and displays tracks from Spotify's API.
- **Chart Visualization**: Visualizes song data with interactive charts including Bar, Line, and Pie charts using `react-chartjs-2`.
- **Dynamic Filtering**: Allows filtering songs by artist, genre, and release month (currently disabled, can be re-enabled as needed).
- **Album Details**: Displays detailed information about albums including cover images, release dates, artists, and genres.
- **Responsive Design**: Ensures the dashboard is usable across different devices and screen sizes.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/spotify-dashboard.git
   cd spotify-dashboard
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup Environment Variables**:

   Create a `.env` file in the root directory and add your Spotify API credentials:

   ```env
   VITE_SPOTIFY_CLIENT_ID=your_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
   ```

4. **Start the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will start the development server, and you can view the dashboard at `http://localhost:3000`.

## Usage

- **Dashboard**: View the main dashboard with charts and album details.
- **Error Handling**: Error messages will be displayed if the data fetch fails.

## Configuration

- **Charts**: The dashboard uses `react-chartjs-2` to render Bar, Line, and Pie charts. Customize the charts by modifying the `transformDataToChart` function.
- **API Integration**: The `fetchSongsFromIndia2023` and `fetchAlbumAndArtistDetails` functions handle communication with the Spotify API. Ensure your `.env` file is correctly set up with valid credentials.

## Tools and Libraries

- **Vite**: A modern build tool that provides fast development and build processes.
- **React**: A JavaScript library for building user interfaces.
- **axios**: A promise-based HTTP client for making API requests.
- **chart.js**: A JavaScript library for creating charts and visualizations.
- **react-chartjs-2**: A React wrapper for Chart.js.

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.
