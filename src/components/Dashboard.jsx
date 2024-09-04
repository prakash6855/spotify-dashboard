import { useEffect, useState } from "react";
import { fetchSongsFromIndia2023 } from "../api/spotifyService";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSongsFromIndia2023();
        transformDataToChart(data);
      } catch (err) {
        setError("Failed to fetch data from Spotify.", err);
      }
    };
    fetchData();
  }, []);

  const transformDataToChart = (songs) => {
    const artists = songs.map((song) => song.artists[0].name);
    const artistCounts = artists.reduce((acc, artist) => {
      acc[artist] = (acc[artist] || 0) + 1;
      return acc;
    }, {});

    setChartData({
      bar: {
        labels: Object.keys(artistCounts),
        datasets: [
          {
            label: "Number of Songs by Artist",
            data: Object.values(artistCounts),
            backgroundColor: "rgba(75,192,192,0.6)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      },
      line: {
        labels: Object.keys(artistCounts),
        datasets: [
          {
            label: "Songs Released Over Time",
            data: Object.values(artistCounts),
            fill: false,
            borderColor: "#742774",
            tension: 0.1,
          },
        ],
      },
      pie: {
        labels: Object.keys(artistCounts),
        datasets: [
          {
            data: Object.values(artistCounts),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  };

  return (
    <div className="dashboard">
      <h1>Spotify Dashboard - Music Released in India (2023)</h1>
      {error ? <p className="error">{error}</p> : null}
      <div className="chart-container">
        {chartData.bar && <Bar data={chartData.bar} />}
        {chartData.line && <Line data={chartData.line} />}
        {chartData.pie && <Pie data={chartData.pie} />}
      </div>
    </div>
  );
};

export default Dashboard;
