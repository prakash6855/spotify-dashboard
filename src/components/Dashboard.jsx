import { useEffect, useState } from "react";
import {
  fetchSongsFromIndia2023,
  fetchAlbumAndArtistDetails,
} from "../api/spotifyService";
import "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, List, Tag, Spin, Alert } from "antd";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({});
  const [albumDetails, setAlbumDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSongsFromIndia2023();
        const trackIds = data.map((song) => song.id);
        const albumData = await fetchAlbumAndArtistDetails(trackIds);
        setAlbumDetails(albumData);
        transformDataToChart(data);
      } catch (err) {
        setError("Failed to fetch data from Spotify.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const transformDataToChart = (data) => {
    const artists = data.map((song) => song.artists[0].name);
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
            hoverOffset: 4,
          },
        ],
      },
    });
  };

  return (
    <div className="dashboard">
      <h1>Spotify Dashboard - Music Released in India (2023)</h1>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="chart-container">
            {chartData.bar && <Bar data={chartData.bar} />}
            {chartData.line && <Line data={chartData.line} />}
            {chartData.pie && (
              <>
                <h3>Number of Songs by Artist - Pie Chart</h3>{" "}
                <Pie data={chartData.pie} />
              </>
            )}
          </div>

          <div className="album-details" style={{ marginTop: "40px" }}>
            <h2>Album Details</h2>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={albumDetails}
              renderItem={(album) => (
                <List.Item>
                  <Card
                    title={album.name}
                    cover={
                      album?.album.images && album?.album.images[0] ? (
                        <img
                          alt={album.name}
                          src={album?.album.images[0].url}
                        />
                      ) : (
                        <img
                          alt="placeholder"
                          src="path/to/placeholder-image.jpg"
                        />
                      )
                    }
                  >
                    <p>Release Date: {album?.album?.release_date}</p>
                    <p>
                      Artists:{" "}
                      {album.artists.map((artist) => artist.name).join(", ")}
                    </p>
                    <div>
                      {album.genres?.map((genre) => (
                        <Tag color="blue" key={genre}>
                          {genre}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
