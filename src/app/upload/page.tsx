import React, { useState } from 'react';

const MediaUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64Data = reader.result?.toString();
        if (base64Data) {
          // Kirim data base64 ke server untuk disimpan
          try {
            const response = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: base64Data }),
            });
            if (response.ok) {
              console.log('File berhasil diunggah');
            } else {
              console.error('Gagal mengunggah file:', response.statusText);
            }
          } catch (error) {
            console.error('Terjadi kesalahan:', error);
          }
        }
      };
    } else {
      console.log('Tidak ada file yang dipilih');
    }
  };

  return (
    <div>
      <h1>Media Upload Page</h1>
      <input type="file" onChange={handleFileChange} accept="image/*, video/*" />
      <button onClick={handleUpload}>Unggah</button>
      {selectedFile && (
        <div>
          <h2>Preview:</h2>
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />
        </div>
      )}
    </div>
  );
};

export default MediaUploadPage;
