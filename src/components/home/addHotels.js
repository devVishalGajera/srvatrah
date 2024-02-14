import React from "react";
import "../../assets/css/app.min.css";
import "../../assets/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
// import jwt from 'react-jwt';
import Cookies from "js-cookie";

const AddHotels = () => {
  const [formData, setFormData] = useState({
    hotelType: "",
    // roomType: [],
    hotelName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    email: "",
    contactPerson: "",
    description: "",
    images: null,
  });
  const [rooms, setRooms] = useState([
    {
      roomType: null,
      inventory: 0,
      occupancyRates: [0, 0, 0],
      childWithBedPrice: 0,
      childWithoutBedPrice: "",
      amenities: [],
    },
  ]);
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDuration: { days: 0, nights: 0 },
    availableVehicle: [{ vehicleType: "", price: 0, vehicleCategory: "" }],
    roomLimit: 0,
    price: 0,
  });

  const handlePackageChange = (key, value) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleVehicleChange = (index, key, value) => {
    const updatedVehicles = [...packageData.availableVehicle];
    updatedVehicles[index][key] = value;
    setPackageData((prevData) => ({
      ...prevData,
      availableVehicle: updatedVehicles,
    }));
  };

  const addVehicle = () => {
    setPackageData((prevData) => ({
      ...prevData,
      availableVehicle: [
        ...prevData.availableVehicle,
        { vehicleType: "", price: 0, vehicleCategory: "" },
      ],
    }));
  };

  const removeVehicle = (index) => {
    if (packageData.availableVehicle.length > 1) {
      const updatedVehicles = [...packageData.availableVehicle];
      updatedVehicles.splice(index, 1);
      setPackageData((prevData) => ({
        ...prevData,
        availableVehicle: updatedVehicles,
      }));
    }
  };

  const roomTypeOptions = [...roomType];
  const amenitiesOptions = [...amenities];

  const handleRoomChange = (index, key, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][key] = value;
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    if (rooms.length < 3) {
      setRooms([
        ...rooms,
        {
          roomType: null,
          inventory: 0,
          occupancyRates: [0, 0, 0],
          childWithBedPrice: 0,
          childWithoutBedPrice: "",
          amenities: [],
        },
      ]);
    }
  };

  const removeRoom = (index) => {
    // Allow removing rooms only when there are more than one
    if (rooms.length > 1) {
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleAutocompleteChange = (key, selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: selectedOption.label || "",
    }));
  };

  // const handleAutocompleteChangeMultipel = (key, event, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [key]: value?.map((option) => option.label) ?? [],
  //   }));
  // };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files); // Convert FileList to an array

    setFormData((prevData) => ({
      ...prevData,
      images: imagesArray,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formDataWithImages = new FormData();
      formDataWithImages.append(`file`, formData.images);

      Object.entries(formData).forEach(([key, value]) => {
        formDataWithImages.append(key, value);
      });

      const updatedFormData = { rooms: JSON.stringify(rooms) };
      // const token = jwt.sign(updatedFormData, 'your-secret-key');

      // Cookies.set('roomInfo', token, {
      // expires: new Date(Date.now() + 3600 * 1000), // 1 hour
      // path: '/',
      // secure: true, // Uncomment for secure cookie (HTTPS)
      // httpOnly: true, // Uncomment for HTTP-only cookie
      // });

      // console.log(token);

      // console.log("formDataWithImages----------->",formData);
      // console.log("formDataWithImages----------->",rooms);

      const response = await fetch(
        `https://demo.turangh.com/inventries/hotel`,
        {
          method: "POST",
          headers: {
            // 'Cookie': `roomInfo=${token}`,
          },
          body: formDataWithImages,
        }
      );
      if (response.ok) {
        console.log("Hotel added successfully");
      } else {
        console.error("Failed to add hotel");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card" style={{ margin: "15px", padding: "15px" }}>
        <div className="card-header align-items-center d-flex">
          <h1 className="card-title  flex-grow-1 ">Add Hotels</h1>
        </div>

        <div className="card-body">
          <div className="live-preview">
            <div className="row g-3">
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Hotel Type
                </label>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  size="small"
                  options={countries}
                  autoHighlight
                  required
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Hotel Type"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) =>
                        handleInputChange("hotelType", e.target.value)
                      }
                    />
                  )}
                  onChange={(e, selectedOption) =>
                    handleAutocompleteChange("hotelType", selectedOption)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Hotel Name
                </label>
                <input
                  required
                  type="name"
                  className="form-control"
                  placeholder="Hotel Name"
                  aria-label="hotel-name"
                  onChange={(e) =>
                    handleInputChange("hotelName", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) => handleInputChange("address", e.target.value)}
                ></textarea>
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Select State
                </label>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  size="small"
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose a state"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                    />
                  )}
                  onChange={(e, selectedOption) =>
                    handleAutocompleteChange("state", selectedOption)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Select City
                </label>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  size="small"
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Choose a City"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                    />
                  )}
                  onChange={(e, selectedOption) =>
                    handleAutocompleteChange("city", selectedOption)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Pincode
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Pincode"
                  aria-label="pincode"
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Contact Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Contact Number"
                  aria-label="contact-number"
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  aria-label="email-address"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Contact Person
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Person"
                  aria-label="contact-person"
                  onChange={(e) =>
                    handleInputChange("contactPerson", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id=""
                  rows="3"
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imagesInput"
                  // multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div >
          <div className="card-header align-items-center d-flex" style={{ borderTop: '1px solid #e9ebec' }}>
            <h1 className="card-title  flex-grow-1 " style={{ marginBottom: '0px' }}>Package details</h1>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-sm-4">
                <label htmlFor="packageNameInput" className="form-label">Package Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Package Name"
                  onChange={(e) => handlePackageChange('packageName', e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="packageDurationDaysInput" className="form-label">Package Duration (Days)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Days"
                  onChange={(e) => handlePackageChange('packageDuration', { ...packageData.packageDuration, days: e.target.value })}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="packageDurationNightsInput" className="form-label">Package Duration (Nights)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nights"
                  onChange={(e) => handlePackageChange('packageDuration', { ...packageData.packageDuration, nights: e.target.value })}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="roomLimitInput" className="form-label">Room Limit</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Room Limit"
                  onChange={(e) => handlePackageChange('roomLimit', e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="priceInput" className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  onChange={(e) => handlePackageChange('price', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            {packageData.availableVehicle.map((vehicle, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div className="card-header align-items-center d-flex" style={{ borderTop: '1px solid #e9ebec' }}>
                  <h1 className="card-title flex-grow-1" style={{ marginBottom: '0px' }}>Vehicle Type</h1>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <label htmlFor={`vehicleTypeInput-${index}`} className="form-label">Vehicle Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle Type"
                        value={vehicle.vehicleType}
                        onChange={(e) => handleVehicleChange(index, 'vehicleType', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                  {index >= packageData.availableVehicle.length - 2 && (
                    <button onClick={() => removeVehicle(index)} className="form-label btn btn-danger btn-border" style={{ marginBottom: '0px' }}>
                      Remove Vehicle
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
              {packageData.availableVehicle.length < 3 && (
                <button onClick={addVehicle} className="form-label btn btn-primary btn-border" style={{ marginBottom: '0px' }}>
                  Add Vehicle
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'end', padding: '15px', borderTop: '1px solid #f1f1f1' }}>
            <button className="btn btn-primary btn-border" onClick={handlePackageSubmit}>
              Create Package
            </button>
          </div>
        </div> */}

        <div>
          {rooms.map((room, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                className="card-header align-items-center d-flex"
                style={{ borderTop: "1px solid #e9ebec" }}
              >
                <h1
                  className="card-title  flex-grow-1 "
                  style={{ marginBottom: "0px" }}
                >
                  Room Type
                </h1>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row g-3">
                    <div className="col-sm-4">
                      <label
                        htmlFor={`roomTypeInput-${index}`}
                        className="form-label"
                      >
                        Room Type
                      </label>
                      <Autocomplete
                        id={`roomTypeInput-${index}`}
                        sx={{ width: "100%" }}
                        size="small"
                        options={roomTypeOptions}
                        autoHighlight
                        value={room.roomType}
                        onChange={(e, newValue) =>
                          handleRoomChange(index, "roomType", newValue)
                        }
                        required
                        getOptionLabel={(option) =>
                          option ? option.label : ""
                        }
                        isOptionEqualToValue={(option, value) =>
                          option && value && option.label === value.label
                        }
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            {option.label}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Room Type"
                            inputProps={{
                              ...params.inputProps,
                              autoComplete: "new-password",
                            }}
                            // onChange={(e) => handleInputChange('roomType', e.target.value)}
                          />
                        )}
                        // onChange={(e, selectedOption) => handleAutocompleteChange('roomType', selectedOption)}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`inventoryInput-${index}`}
                        className="form-label"
                      >
                        Inventry
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Inventry"
                        aria-label="contact-person"
                        value={room.inventory === 0 ? "" : room.inventory}
                        onChange={(e) =>
                          handleRoomChange(index, "inventory", e.target.value)
                        }
                        // onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`occupancy1Input-${index}`}
                        className="form-label"
                      >
                        Occupancy-1
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        aria-label="contact-person"
                        value={
                          room.occupancyRates[0] === 0
                            ? ""
                            : room.occupancyRates[0]
                        }
                        onChange={(e) =>
                          handleRoomChange(index, "occupancyRates", [
                            e.target.value,
                            room.occupancyRates[1],
                            room.occupancyRates[2],
                          ])
                        }
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`occupancy2Input-${index}`}
                        className="form-label"
                      >
                        Occupancy-2
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        aria-label="contact-person"
                        value={
                          room.occupancyRates[1] === 0
                            ? ""
                            : room.occupancyRates[1]
                        }
                        onChange={(e) =>
                          handleRoomChange(index, "occupancyRates", [
                            room.occupancyRates[0],
                            e.target.value,
                            room.occupancyRates[2],
                          ])
                        }
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`occupancy3Input-${index}`}
                        className="form-label"
                      >
                        Occupancy-3
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        aria-label="contact-person"
                        value={
                          room.occupancyRates[2] === 0
                            ? ""
                            : room.occupancyRates[2]
                        }
                        onChange={(e) =>
                          handleRoomChange(index, "occupancyRates", [
                            room.occupancyRates[0],
                            room.occupancyRates[1],
                            e.target.value,
                          ])
                        }
                        // onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`childWithBedInput-${index}`}
                        className="form-label"
                      >
                        Child-WithBedPrice
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Rate"
                        aria-label="contact-person"
                        value={
                          room.childWithBedPrice === 0
                            ? ""
                            : room.childWithBedPrice
                        }
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            "childWithBedPrice",
                            e.target.value
                          )
                        }
                        // onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`childWithoutBedInput-${index}`}
                        className="form-label"
                      >
                        Child-WithoutBedPrice
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Rate"
                        aria-label="contact-person"
                        value={
                          room.childWithoutBedPrice === 0
                            ? ""
                            : room.childWithoutBedPrice
                        }
                        onChange={(e) =>
                          handleRoomChange(
                            index,
                            "childWithoutBedPrice",
                            e.target.value
                          )
                        }
                        // onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label
                        htmlFor={`amenitiesInput-${index}`}
                        className="form-label"
                      >
                        Amenities
                      </label>
                      <Autocomplete
                        multiple
                        id={`amenitiesInput-${index}`}
                        size="small"
                        options={amenitiesOptions}
                        getOptionLabel={(option) =>
                          option ? option.label : ""
                        }
                        value={room.amenities}
                        onChange={(e, newValue) =>
                          handleRoomChange(index, "amenities", newValue)
                        }
                        filterSelectedOptions
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Amenities"
                            // onChange={(e) => handleInputChange('amenities', e.target.value)}
                          />
                        )}
                        // onChange={(event, value) => handleAutocompleteChangeMultipel('amenities', event, value)}
                      />
                    </div>
                    {/* <div className="col-sm-4" style={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
                      <button className="form-label btn btn-primary btn-border" style={{ marginBottom: '0px' }}>Add Rooms</button>
                    </div> */}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                {index >= rooms.length - 2 && ( // Show "Remove Room" button only for the last 2 forms
                  <button
                    onClick={() => removeRoom(index)}
                    className="form-label btn btn-danger btn-border"
                    style={{ marginBottom: "0px" }}
                  >
                    Remove Room
                  </button>
                )}
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
            }}
          >
            {rooms.length < 3 && ( // Show "Add Room" button only if there are less than 3 forms
              <button
                onClick={addRoom}
                className="form-label btn btn-primary btn-border"
                style={{ marginBottom: "0px" }}
              >
                Add Room
              </button>
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "15px",
            borderTop: "1px solid #f1f1f1",
          }}
        >
          <button class="btn btn-primary btn-border" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddHotels;

const amenities = [
  { label: "TV" },
  { label: "AC" },
  { label: "FREEZ" },
  { label: "WIFI" },
];
const roomType = [
  { label: "Standard" },
  { label: "Deluxe" },
  { label: "Super Deluxe" },
];
const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
];
