import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import WasherService from '../../services/WasherService';
import './WasherProfile.css';

const WasherProfile = () => {
  const { id } = useParams();
  const [washers, setWasher] = useState([]);

  useEffect(() => {
    WasherService.getWasherForWashPack(id)
      .then((response) => {
        console.log(response.data);
        setWasher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2>Wash packs assigned to you:</h2>
        <Link to={`/washerHome/${id}`}>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Back
          </button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {washers.map((washer) => (
          <div
            key={washer.id}
            className="card m-2 card-sm card-hover lavender-bg"
            style={{ width: '300px', height: '200px' }}
          >
            <div className="card-body">
              <h5 className="card-title">{washer.washPackName}</h5>
              <h5 className="card-title">{washer.id}</h5>
              <p className="card-text">{washer.washPackDescription}</p>
              <Link to={`/userForWasher/${washer.id}/${washer.washPackName}`}>
                <button>View User</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WasherProfile;
