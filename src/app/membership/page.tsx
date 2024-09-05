import React, { useState } from 'react';
import axios from 'axios';

const MembershipPage: React.FC = () => {
  const [account, setAccount] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
  const [metadataUri, setMetadataUri] = useState<string>('');
  const [membershipDetails, setMembershipDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreateMembership = async () => {
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('/api/membership/create-membership', {
        account,
        imageUri, // Ensure the correct data is sent to the server
      });
      setMetadataUri(response.data.metadataUri);
      setSuccessMessage('Membership created successfully!');
    } catch (err) {
      setError('Failed to create membership');
      console.error(err);
    }
  };

  const handleGetMembershipDetails = async () => {
    setError(null);

    try {
      const response = await axios.get(`/api/membership/membership-details/${account}`);
      setMembershipDetails(response.data.membershipDetails);
    } catch (err) {
      setError('Failed to retrieve membership details');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Membership</h1>

      <div>
        <h2>Create Membership</h2>
        <input
          type="text"
          placeholder="Account Public Key"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URI"
          value={imageUri}
          onChange={(e) => setImageUri(e.target.value)}
        />
        <button onClick={handleCreateMembership}>Create Membership</button>
        {successMessage && <div>Success: {successMessage}</div>}
      </div>

      <div>
        <h2>Get Membership Details</h2>
        <input
          type="text"
          placeholder="Account Public Key"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <button onClick={handleGetMembershipDetails}>Get Details</button>
        {membershipDetails && (
          <div>
            <h3>Membership Details</h3>
            <pre>{JSON.stringify(membershipDetails, null, 2)}</pre>
          </div>
        )}
      </div>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default MembershipPage;
