import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import WashPackService from '../../services/WashPackService';
import Swal from 'sweetalert2'; // Import SweetAlert
import './AddWashPacktoUser.css'; // Import the external CSS file

const AddWashPacktoUser = () => {
  const [userName, setUserName] = useState('');

  const [washpacks, setWashPacks] = useState([]);
 
  const [washPackId, setWashPackId] = useState('');

  const [selectedWashPackCost, setSelectedWashPackCost] = useState(0);
  const { id } = useParams();
  const nav = useNavigate();

  const AddWashPack = (e) => {
    e.preventDefault();

    const user = { washPackId };
    console.log(user);
    UserService.updateWashPackIdinUser(id, user) 
      .then((Response) => {
        console.log(Response.data);
        // Show a success notification using SweetAlert
        Swal.fire({
          title: 'WashPack Added',
          text: 'The selected washpack has been added successfully!',
          icon: 'success',
        }).then(() => {
          nav("/payment", {state: { totalPrice: selectedWashPackCost }});
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch user data and set the state
  useEffect(() => {
    UserService.getUserById(id)
      .then((Response) => {
        setUserName(Response.data.userName);
        
        setWashPackId(Response.data.washPackId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    WashPackService.getAllWashPacks()
      .then((Response) => {
        setWashPacks(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (washPackId) {
      const selectedWashPack = washpacks.find((washpack) => washpack.id === washPackId);
      if (selectedWashPack) {
        setSelectedWashPackCost(selectedWashPack.washPackCost);
      }
    }
  }, [washPackId, washpacks]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add WashPack</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label htmlFor="userName">User Name:</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-control"
                    readOnly
                  />
                </div>

              
                {/* <div className="form-group mb-2">
                  <label htmlFor="washPackId">Selected WashPack ID:</label>
                  <input
                    type="text"
                    id="washPackId"
                    name="washPackId"
                    value={washPackId}
                    className="form-control"
                    readOnly
                  />
                </div>  */}
                

                <div className="form-group mb-2">
                  <label htmlFor="selectWashPack">Select WashPack</label>
                  <select
                    id="selectWashPack"
                    name="washPackId"
                    value={washPackId}
                    onChange={(e) => setWashPackId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option >- SELECT -</option>
                    {washpacks.map((washpack) => (
                      <option key={washpack.id} value={washpack.id}>
                        {washpack.washPackName} - ₹{washpack.washPackCost}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success" onClick={AddWashPack}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWashPacktoUser;
