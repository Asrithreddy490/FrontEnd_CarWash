import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WashPackService from '../../services/WashPackService';
import WasherService from '../../services/WasherService';
const AddWasherToWashpack = () => {

    const [washPackName, setWashPackName] = useState('');
 
    const [washerId, setWasherId] = useState('');
    const { id } = useParams();
    const nav = useNavigate();

    const AddWashPack = (e) => {
        e.preventDefault();

        const washpack ={washerId}
        console.log(washpack);

        WashPackService.addWasherToWashpack(id,washpack).then((Response)=>{
            console.log(Response.data);
            nav("/admin/ListWashPack")
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(() => {
      WashPackService.getWashPackId(id).then((Response)=>{
        setWashPackName(Response.data.washPackName);
        setWasherId(Response.data.washerId);
        console.log(Response.data)
      }).catch(error=>{
        console.log(error);
      })
    }, [])

    const [washer, setWasher] = useState([]);
    useEffect(() => {
      WasherService.getAllWashers().then((Response)=>{
        setWasher(Response.data)

      }).catch((error) => {
        console.log(error);
      });
    }, [])
    
    
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add WashPack</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label htmlFor="washPackName">User Name:</label>
                  <input
                    type="text"
                    id="washPackName"
                    name="washPackName"
                    value={washPackName}
                    onChange={(e) => setWashPackName(e.target.value)}
                    className="form-control"
                    readOnly
                  />
                </div>

              
                <div className="form-group mb-2">
                  <label htmlFor="washerId">Selected WashPack ID:</label>
                  <input
                    type="text"
                    id="washerId"
                    name="washerId"
                    value={washerId}
                    className="form-control"
                    readOnly
                  />
                </div> 
                

                <div className="form-group mb-2">
                  <label htmlFor="selectWashPack">Select WashPack</label>
                  <select
                    id="selectWashPack"
                    name="washerId"
                    value={washerId}
                    onChange={(e) => setWasherId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="-1">- SELECT -</option>
                    {washer.map((washpack) => (
                      <option key={washpack.id} value={washpack.id}>
                        {washpack.washerName} 
                      </option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success" onClick={(e) => AddWashPack(e)}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  

export default AddWasherToWashpack