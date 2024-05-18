import React, { useEffect, useState } from 'react';

interface WaifuImage {
  url: string;
  source: string;
  artist: {
    name: string;
    url: string;
  };
}

const WaifuFetcher: React.FC = () => {
  const [waifus, setWaifus] = useState<WaifuImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaifus = async () => {
      try {
        const response = await fetch('https://api.waifu.im/search?included_tags=waifu');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWaifus(data.images);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchWaifus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Waifu Images</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {waifus.map((waifu, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img src={waifu.url} alt={`Waifu ${index + 1}`} style={{ width: '200px', height: 'auto' }} />
            <p>
              Artist: <a href={waifu.artist.url} target="_blank" rel="noopener noreferrer">{waifu.artist.name}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaifuFetcher;
