import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageComponent: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [jsonData, setJsonData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.waifu.im/search?included_tags=waifu');
        const data = response.data;
        // Memastikan bahwa respons memiliki properti 'files' dan tidak kosong
        if (data.files && data.files.length > 0) {
          setImageUrl(data.files[0].url);
          setJsonData(data); // Menyimpan seluruh data JSON
        } else {
          console.log('Tidak ada gambar yang ditemukan');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {imageUrl && (
        <img src={imageUrl} alt="Waifu" style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )}
    </div>
  );
};

export default ImageComponent;
