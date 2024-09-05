import React, { useEffect, useState } from 'react';

// Define the NFT interface
interface NFT {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: string[] | null;
}

// Define the Props interface
interface NFTPageProps {
  nftId: string; // The ID or public key of the NFT
}

const NFTPage: React.FC<NFTPageProps> = ({ nftId }) => {
  const [nftData, setNftData] = useState<NFT | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/nft/${nftId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch NFT data: ${response.statusText}`);
        }
        const data: NFT = await response.json();
        setNftData(data);
      } catch (err) {
        setError(`Error fetching NFT data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTData();
  }, [nftId]);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
        {/* Consider using a spinner or skeleton loader */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        {/* Optionally provide a retry button */}
      </div>
    );
  }

  if (!nftData) {
    return <p>No data available for NFT ID: {nftId}</p>;
  }

  return (
    <div className="nft-page">
      <h1>{nftData.name || 'No Name'}</h1>
      <p><strong>Symbol:</strong> {nftData.symbol || 'N/A'}</p>
      <p><strong>Seller Fee:</strong> {nftData.sellerFeeBasisPoints / 100}%</p>
      <p><strong>Creators:</strong> {nftData.creators?.length ? nftData.creators.join(', ') : 'None'}</p>
      <div>
        <img src={nftData.uri} alt={nftData.name || 'NFT Image'} style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default NFTPage;
