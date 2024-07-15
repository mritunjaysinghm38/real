import React, { useState } from 'react'
import axios from 'axios'
const AddContact = ({ showModal, handleModal,url }) => {
        const[name, setName]=useState("")
        const[gmail, setGmail]=useState("")

        const[phone, setPhone]=useState("")
        

        const submitHandler = async(e)=>{
          e.preventDefault();
          // console.log(name, gmail, phone);
          handleModal();
        
           //send data to api
           const api = await axios.post(`${url}/`,{name, gmail, phone}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("form submited ",api)
        }
  
  return (
    <>
      <div className="container text-center mt-5 ">
        <button className='btn btn-warning' onClick={handleModal}>Add Contact</button>

        {showModal && (

          //  <div className="container text-center mt-5 ">
          //  <button className='btn btn-warning' onClick={handleModel}>Add Contact</button>

          <div className="modal " tabIndex="-1" role="dialog"
            style={{ display: 'block' }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content bg-dark" style={{ border: '2px solid yellow' }}>
                <div className="modal-header">
                  <h3 className=''>Add Contact</h3>
                  <button type="button" ></button>
                </div>
                <div className="modal-body">
                  {/* //form */}
                  <form onSubmit={submitHandler}>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                      <input type="text" className="form-control" id="exampleInputName1" aria-describedby="emailHelp" 
                      value={name}
                      onChange ={(e=> setName(e.target.value))}
                      required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Gmail</label>
                      <input type="text" className="form-control" id="exampleInputGmail1"
                      value={gmail}
                      onChange ={(e=> setGmail(e.target.value))}
                      required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">phone</label>
                      <input type="text" className="form-control" id="exampleInputPassword1" 
                      value={phone}
                      onChange ={(e=> setPhone(e.target.value))}
                      required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary mx-3">Add Contact</button>
                    <button type="submit" className="btn btn-danger" onClick={handleModal}>Cancle</button>

                  </form>

                  {/* form end */}
                </div>
                
              </div>
            </div>
          </div>

        )}


      </div>
    </>
  )
}

export default AddContact
