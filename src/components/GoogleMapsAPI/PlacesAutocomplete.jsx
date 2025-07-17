import { useRef } from "react";
import { Input } from "antd";
import { Autocomplete } from "@react-google-maps/api";

const PlacesAutocomplete = ({ value, onChange, placeholder = "Nhập địa chỉ" }) => {
  const autocompleteRef = useRef(null);

  // called when the user select a suggestion from google dropdown
  // update the input box content with user selection
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace(); // return the selected place's object

    // place object and its string representation is not null 
    if (place && place.formatted_address) {
      onChange(place.formatted_address); // insert the place's address string into input box
    }
  };

  return (
    // wrap Autocomplete around Input so it can be used to send google the input content
    // to search and display a list of suggested places
    <Autocomplete
      onLoad={ref => (autocompleteRef.current = ref)} // get reference to the Google Autocomplete instance
      onPlaceChanged={handlePlaceChanged}
      options={{
        componentRestrictions: { country: "vn" }
      }}
    >
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Autocomplete>
  );
};

export default PlacesAutocomplete;