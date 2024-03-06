import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Photos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localId = localStorage.getItem("_id");
  const [experienceId, setExperienceId] = useState(localId ? localId : "");
  const [photos, setPhotos] = useState([]);
  const [showBackdrop, setShowBackDrop] = useState(null);
  useEffect(() => {
    if (experienceId) {
      (async function () {
        const response = await fetch(
          `https://demo.turangh.com/experience/${experienceId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseJson = await response.json();
        const { img_link } = responseJson;
        if (!img_link || !img_link.length) {
          return;
        }
        setPhotos(img_link);
      })();
      return;
    }
    if (!experienceId) {
      alert("please add titel and categories");
      navigate("/titel");
    }
  }, []);
  const submit = async () => {
    if (photos.length === 0) {
      alert("please add photos");
      return;
    }
    const data = {
      img_link: photos,
    };
    const response = await fetch(
      `https://demo.turangh.com/experience/${experienceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseJson = await response.json();
    if (!response.ok) {
      alert(responseJson.error);
      return;
    }
    navigate("/videos", {
      state: {
        ...responseJson,
      },
    });
  };
  const goBack = () => {
    navigate("/exclusions");
  };

  const deletePhoto = (index) => {
    setPhotos((prevPhotos) => {
      return [...prevPhotos.slice(0, index), ...prevPhotos.slice(index + 1)];
    });
  };

  const handleImageChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    const reducedPhotoProcess = new Blob([e.target.files[0]], {
      type: e.target.files[0].type,
    });
    reader.onload = () => {
      console.log("reader", reader);
      const temp = {
        filename: e.target.files[0].name,
        path: reader.result,
        mimetype: e.target.files[0].type,
      };
      setPhotos((prevPhotos) => {
        console.log("prevPhotos", prevPhotos);
        return [...prevPhotos, temp];
      });
    };
  };

  const resizeImage = (imgEl, wantedWidth) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const aspect = imgEl.width / imgEl.height;

    canvas.width = wantedWidth;
    canvas.height = wantedWidth / aspect;

    ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ fontWeight: "bold", padding: "5px" }}>
          A photo is worth a thousand words!
        </h2>
        <p style={{ padding: "5px" }}>
          We recommend that you add at least 5 high quality photos to your
          experience with various angles and views
        </p>
      </div>

      <div style={{ width: "70%" }}>
        <Paper
          elevation={7}
          style={{
            padding: "20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px dashed #0000003D",
            borderRadius: "12px",
            height: "200px",
            boxShadow: "none",
            justifyContet: "center",
          }}
          // onDrop={handleDrop}
          // onDragOver={preventDefault}
        >
          <input
            type="file"
            // onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="file-upload-input"
            style={{
              height: "100%",
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h4>Drag photos here to upload</h4>
            <span>Supported file types are: .png, .jpg, .jpeg</span>
            {/* <span>Maximum file size is 17 MB</span> */}
            <IconButton component="span" size="large">
              {/* <Image src={FileUploadIcon} alt="Image" /> */}
              <CloudUploadIcon /> Browse Your Computer
            </IconButton>
          </label>
        </Paper>
      </div>

      <div
        style={{
          width: "70%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "150px",
        }}
      >
        <Button variant="outlined" onClick={goBack}>
          Back
        </Button>
        <Button variant="contained" onClick={submit}>
          Continue
        </Button>
      </div>

      <Grid container sx={{ mt: 5 }} spacing={2}>
        {photos && photos.length > 0
          ? photos?.map((item, index) => (
              <Grid
                item
                xs={4}
                key={index}
                sx={{ mr: 1 }}
                onMouseEnter={() => setShowBackDrop(index)}
                onMouseLeave={() => setShowBackDrop(null)}
              >
                <div style={{ position: "relative" }}>
                  {showBackdrop === index && (
                    <div className="showBackdrop">
                      <DeleteIcon
                        sx={{ color: "white", cursor: "pointer" }}
                        onClick={() => deletePhoto(index)}
                      />
                      {/* <EditIcon sx={{ color: "white", cursor: "pointer" }} /> */}
                    </div>
                  )}
                  <img
                    src={item?.path}
                    height="100%"
                    width="100%"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </Grid>
            ))
          : null}
      </Grid>
    </div>
  );
};

export default Photos;
