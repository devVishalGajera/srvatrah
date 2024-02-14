import React, { useState } from "react";
import "../../assets/css/app.min.css";
import "../../assets/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import jwt from 'react-jwt';
import Cookies from "js-cookie";
import { FormControlLabel, Switch } from "@mui/material";

const AddHolidayPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDuration: { days: 0, nights: 0 },
    roomLimit: 0,
    price: 0,
    selectType: "",
    uniqueId: "",
    packageType: "",
    destinationCity: "",
    images: null,
    highlights: "",
    status: false,
    createPilgrimage: false,
    displayHomepage: false,
    partialPayment: false,
    recommendedPackage: false,
    vehiclePrices: [{ vehicleType: "", price: 0 }],
    includes: "",
    excludes: "",
    paymentDueDays: 0,
    partialPaymentPercentage: 0,
    cancellationPolicyType: "",
  });

  const handlePackageChange = (key, value) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleAutocompleteChange = (key, selectedOption) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: selectedOption.label || "",
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files); // Convert FileList to an array

    setPackageData((prevData) => ({
      ...prevData,
      images: imagesArray,
    }));
  };

  const handleSwitchChange = (key) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: !prevData[key],
    }));
  };

  const handleNestedInputChange = (arrayKey, index, key, value) => {
    setPackageData((prevData) => {
      const updatedArray = [...prevData[arrayKey]];
      updatedArray[index][key] = value;
      return {
        ...prevData,
        [arrayKey]: updatedArray,
      };
    });
  };

  // const handleAddVehicle = () => {
  //     setPackageData((prevData) => ({
  //         ...prevData,
  //         vehiclePrices: [...prevData.vehiclePrices, { vehicleType: '', price: 0 }],
  //     }));
  // };

  const addVehicleField = () => {
    setPackageData((prevData) => ({
      ...prevData,
      vehiclePrices: [...prevData.vehiclePrices, { vehicleType: "", price: 0 }],
    }));
  };

  // const handleRemoveVehicle = (index) => {
  //     setPackageData((prevData) => {
  //         const updatedArray = [...prevData.vehiclePrices];
  //         updatedArray.splice(index, 1);
  //         return {
  //             ...prevData,
  //             vehiclePrices: updatedArray,
  //         };
  //     });
  // };

  const removeVehicleField = (index) => {
    setPackageData((prevData) => {
      const updatedVehiclePrices = [...prevData.vehiclePrices];
      updatedVehiclePrices.splice(index, 1);
      return {
        ...prevData,
        vehiclePrices: updatedVehiclePrices,
      };
    });
  };

  const handlePriceFieldChange = (key, value) => {
    setPackageData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handlePaymentDueChange = (e) => {
    handlePriceFieldChange("paymentDueDays", e.target.value);
  };

  const handlePartialPaymentChange = (e) => {
    handlePriceFieldChange("partialPaymentPercentage", e.target.value);
  };

  const handleCancellationPolicyChange = (e) => {
    handlePriceFieldChange("cancellationPolicyType", e.target.value);
  };

  const handleSubmit = async () => {
    // try {
    //     const formDataWithImages = new FormData();
    //     formDataWithImages.append(`file`, formData.images);
    //     Object.entries(formData).forEach(([key, value]) => {
    //         formDataWithImages.append(key, value);
    //     });
    //     const updatedFormData = { rooms: JSON.stringify(rooms) };
    //     const response = await fetch(`https://demo.turangh.com/inventries/hotel`, {
    //         method: 'POST',
    //         headers: {
    //             // 'Cookie': `roomInfo=${token}`,
    //         },
    //         body: formDataWithImages,
    //     });
    //     if (response.ok) {
    //         console.log('Hotel added successfully');
    //     } else {
    //         console.error('Failed to add hotel');
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    // }
  };

  return (
    <div className="col-lg-12">
      <div className="card" style={{ margin: "15px", padding: "15px" }}>
        <div>
          <div
            className="card-header align-items-center d-flex"
            style={{ borderTop: "1px solid #e9ebec" }}
          >
            <h1
              className="card-title  flex-grow-1 "
              style={{ marginBottom: "0px" }}
            >
              Package details
            </h1>
          </div>

          <div className="card-body">
            {/* Package details inputs */}
            <div className="row g-3">
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Select Type
                </label>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  size="small"
                  options={selectType}
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
                      placeholder="Selct Type"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) =>
                        handlePackageChange("selectType", e.target.value)
                      }
                    />
                  )}
                  onChange={(e, selectedOption) =>
                    handleAutocompleteChange("selectType", selectedOption)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="packageNameInput" className="form-label">
                  Unique Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Package Name"
                  onChange={(e) =>
                    handlePackageChange("uniqueId", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Package Type
                </label>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  size="small"
                  options={packageType}
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
                      placeholder="Package Type"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                      onChange={(e) =>
                        handlePackageChange("packageType", e.target.value)
                      }
                    />
                  )}
                  onChange={(e, selectedOption) =>
                    handleAutocompleteChange("packageType", selectedOption)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="packageNameInput" className="form-label">
                  Package Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Package Name"
                  onChange={(e) =>
                    handlePackageChange("packageName", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="packageNameInput" className="form-label">
                  Destination City
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Destination City"
                  onChange={(e) =>
                    handlePackageChange("destinationCity", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label
                  htmlFor="packageDurationDaysInput"
                  className="form-label"
                >
                  No of Days
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Days"
                  onChange={(e) =>
                    handlePackageChange("packageDuration", {
                      ...packageData.packageDuration,
                      days: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-sm-4">
                <label
                  htmlFor="packageDurationNightsInput"
                  className="form-label"
                >
                  No of Nights
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nights"
                  onChange={(e) =>
                    handlePackageChange("packageDuration", {
                      ...packageData.packageDuration,
                      nights: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-sm-4">
                <label for="firstNameinput" className="form-label">
                  Banner Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imagesInput"
                  // multiple
                  onChange={handleImageChange}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor={`highlightInput`} className="form-label">
                  Highlight
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) =>
                    handlePackageChange("highlight", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="col-sm-4">
                <label htmlFor={`highlightInput`} className="form-label">
                  Includes
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) =>
                    handlePackageChange("includes", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="col-sm-4">
                <label htmlFor={`highlightInput`} className="form-label">
                  Excludes
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={(e) =>
                    handlePackageChange("excludes", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="col-sm-4">
                <label htmlFor="statusSwitch" className="form-label">
                  Status
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      id="statusSwitch"
                      checked={packageData.status}
                      onChange={() => handleSwitchChange("status")}
                    />
                  }
                  label={packageData.status ? "Active" : "Inactive"}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="createPilgrimageSwitch" className="form-label">
                  Create Pilgrimage
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      id="createPilgrimageSwitch"
                      checked={packageData.createPilgrimage}
                      onChange={() => handleSwitchChange("createPilgrimage")}
                    />
                  }
                  label={packageData.createPilgrimage ? "Yes" : "No"}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="displayHomepageSwitch" className="form-label">
                  Display Homepage
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      id="displayHomepageSwitch"
                      checked={packageData.displayHomepage}
                      onChange={() => handleSwitchChange("displayHomepage")}
                    />
                  }
                  label={packageData.displayHomepage ? "Yes" : "No"}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="partialPaymentSwitch" className="form-label">
                  Partial Payment
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      id="partialPaymentSwitch"
                      checked={packageData.partialPayment}
                      onChange={() => handleSwitchChange("partialPayment")}
                    />
                  }
                  label={packageData.partialPayment ? "Yes" : "No"}
                />
              </div>
              <div className="col-sm-4">
                <label
                  htmlFor="recommendedPackageSwitch"
                  className="form-label"
                >
                  Recommended Package
                </label>
                <FormControlLabel
                  control={
                    <Switch
                      id="recommendedPackageSwitch"
                      checked={packageData.recommendedPackage}
                      onChange={() => handleSwitchChange("recommendedPackage")}
                    />
                  }
                  label={packageData.recommendedPackage ? "Yes" : "No"}
                />
              </div>
              {/* <div className="col-sm-4">
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
                            </div> */}
            </div>
          </div>

          <div className="card-body">
            <div className="live-preview">
              <div className="row g-3">
                <div className="">
                  <label htmlFor="availableVehicleInput" className="form-label">
                    Vehicle Prices
                  </label>
                  {packageData.vehiclePrices.map((vehicle, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", marginBottom: "10px" }}
                      className="row g-3"
                    >
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle Type"
                          aria-label="vehicle-type"
                          value={vehicle.vehicleType}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "vehiclePrices",
                              index,
                              "vehicleType",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      {/* <div className="col-sm-4">
                                                <Autocomplete
                                                    id="country-select-demo"
                                                    sx={{ width: "100%" }}
                                                    size='small'
                                                    options={selectVechicleType}
                                                    autoHighlight
                                                    required
                                                    getOptionLabel={(option) => option.label}
                                                    renderOption={(props, option) => (
                                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                            {option.label}
                                                        </Box>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Selct Type"
                                                            inputProps={{
                                                                ...params.inputProps,
                                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                                            }}
                                                            onChange={(e) => handleNestedInputChange('vehiclePrices', index, 'vehicleType', e.target.value)}
                                                        />
                                                    )}
                                                    onChange={(e, selectedOption) => handleAutocompleteChange('vehiclePrices', selectedOption)}
                                                />
                                            </div> */}
                      <div className="col-sm-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          aria-label="vehicle-price"
                          value={vehicle.price}
                          onChange={(e) =>
                            handleNestedInputChange(
                              "vehiclePrices",
                              index,
                              "price",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-sm-4">
                        {index < packageData.vehiclePrices.length - 1 && (
                          <button
                            className="btn btn-link"
                            onClick={() => removeVehicleField(index)}
                          >
                            Remove Vehicle
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="col-sm-4">
                    <button className="btn btn-link" onClick={addVehicleField}>
                      Add Vehicle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional fields for Package Price */}
          <div className="card-body">
            <div className="row g-3">
              <div className="col-sm-4">
                <label htmlFor="roomLimitInput" className="form-label">
                  Rooms Limit
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Room Limit"
                  onChange={(e) =>
                    handlePackageChange("roomLimit", e.target.value)
                  }
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="priceInput" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  onChange={(e) => handlePackageChange("price", e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="paymentDueInput" className="form-label">
                  Payment Due (Days)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Payment Due (Days)"
                  onChange={handlePaymentDueChange}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="partialPaymentInput" className="form-label">
                  Partial Payment (%)
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Partial Payment (%)"
                  onChange={handlePartialPaymentChange}
                />
              </div>
              <div className="col-sm-4">
                <label htmlFor="cancellationPolicyInput" className="form-label">
                  Cancellation Policy Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cancellation Policy Type"
                  onChange={handleCancellationPolicyChange}
                />
              </div>
            </div>
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
          <button
            class="btn btn-primary btn-border"
            // onClick={handleSubmit}
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddHolidayPackage;

const selectType = [{ label: "Holiday" }, { label: "Pilgrims" }];
const packageType = [
  { label: "India" },
  { label: "International" },
  { label: "Himachal Holiday" },
];

const selectVechicleType = [
  { label: "SUV" },
  { label: "MUV" },
  { label: "Hadback" },
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
