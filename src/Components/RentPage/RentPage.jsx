import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { links } from "../Assets/IconsLinks";
import "../RentPage/Rent.css";
import CountrySelect from "./CountrySelect";
import Counter from "./Counter";
import properties from "../../lib/CloudinaryMultiImage";
import Axios from "../../lib/Axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export default function RentPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [category, setCategory] = useState({ category: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    properties: [],
    roomCount: "",
    bathroomCount: "",
    guestCount: "",
    price: "",
    location: "",
    category: "",
  });
  const handleCategoryChange = (label) => {
    setFormdata({ ...formdata, category: label });
    setSelectedCategory(label);
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
  };
  const handleCountChange = (e) => {
    const { id, value } = e;
    setFormdata({ ...formdata, [id]: value });
  };

  const handleLocationChange = (selectedCountry) => {
    setFormdata({ ...formdata, location: selectedCountry });
  };
  // console.log(formdata);

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formdata.properties.length < 7) {
      setUploading(true);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(properties(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormdata({
            ...formdata,
            properties: formdata.properties.concat(urls),
          });
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
        });
    } else {
      setUploading(false);
    }
  };
  // console.log(uploading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter && e.nativeEvent.submitter.type === "submit") {
      if (activeStep !== 5) {
        // Don't submit the form if it's not on the last step
        return;
      }
    }
    try {
      const res = await Axios.post("/api/users/listings", formdata, {
        headers: { Authorization: `Bearer ${cookies.access_token}` },
      });
      console.log(res);
      toast.success("Listing will create after admin approved!");
      navigate("/");
    } catch (error) {
      toast("error in creating");
      console.log(error);
    }
  };

  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
        <Step onClick={() => setActiveStep(3)}>4</Step>
        <Step onClick={() => setActiveStep(4)}>5</Step>
        <Step onClick={() => setActiveStep(5)}>6</Step>
      </Stepper>
      <form onSubmit={handleSubmit}>
        {activeStep === 0 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Select Your Category:</h3>
            <div className="categ-main-div">
              {links.map((item, index) => (
                <div
                  key={index}
                  className={`categ-div ${
                    selectedCategory === item.label ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryChange(item.label)}
                >
                  {item.imgSrc}
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Title:</h3>
            <input
              type="text"
              className="price-input"
              id="title"
              onChange={handleChange}
              value={formdata.title}
            />
            <h3 className="rent-categ">Select your Location</h3>
            <div>
              <CountrySelect
                value={formdata.location}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Give Information About It.</h3>
            <div
              // style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
              className="counter-main-div"
            >
              <div
                style={{ display: "flex",gap:"15rem", alignItems: "center" ,justifyContent:"space-between"}}
              >
                <div><h4 style={{ fontSize: "1.5rem" }}>Bedrooms:</h4></div>
                <div><Counter id="roomCount" onChange={handleCountChange} /></div>
              </div>
              <div
                style={{ display: "flex", gap: "15rem", alignItems: "center" }}
              >
                <h4 style={{ fontSize: "1.5rem" }}>Bathrooms:</h4>
                <Counter id="bathroomCount" onChange={handleCountChange} />
              </div>
              <div
                style={{ display: "flex", gap: "12rem", alignItems: "center" }}
              >
                <h4 style={{ fontSize: "1.5rem" }}>Guest Capacity:</h4>
                <Counter id="guestCount" onChange={handleCountChange} />
              </div>
            </div>
          </div>
        )}
        {activeStep === 3 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Images</h3>
            <label for="imageUpload">Select an Image:</label>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            ></input>
            <button onClick={handleImageUpload} className="upload-btn">
              Upload
            </button>
            <br />
            <br />
            {uploading && <Loading />}
          </div>
        )}
        {activeStep === 4 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Description:</h3>
            <textarea
              className="textarea"
              rows="10"
              cols="160"
              placeholder="Type the description here..."
              id="description"
              value={formdata.description}
              onChange={handleChange}
            ></textarea>
          </div>
        )}
        {activeStep === 5 && (
          <div>
            <h1 className="rent-h1">Rent your Property</h1>
            <h3 className="rent-categ">Add Price:</h3>
            <input
              type="number"
              className="price-input"
              placeholder=" enter price"
              id="price"
              value={formdata.price}
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </div>
        )}
        <div className="mt-16 flex justify-between"></div>
      </form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
