import { useRef } from "react";
import { Input } from "antd";
import { Autocomplete } from "@react-google-maps/api";

const EnhancedPlacesAutocomplete = ({ 
  value, 
  onChange, 
  onPlaceSelect,
  placeholder = "Nhập địa chỉ" 
}) => {
  const autocompleteRef = useRef(null);

  // Called when the user selects a suggestion from Google dropdown
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (place && place.formatted_address) {
      // Update the input value
      onChange(place.formatted_address);

      // Extract detailed information from the place object
      const placeData = extractPlaceData(place);
      
      // Notify parent component with extracted data
      if (onPlaceSelect) {
        onPlaceSelect(placeData);
      }
    }
  };

  // Extract relevant data from Google Places API response
  const extractPlaceData = (place) => {
    const data = {
      formattedAddress: place.formatted_address,
      name: place.name,
      coordinates: null,
      city: null
    };

    // Extract coordinates
    if (place.geometry && place.geometry.location) {
      data.coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    }

    // Extract city from address components
    if (place.address_components) {
      place.address_components.forEach(component => {
        const types = component.types;
        
        // City (administrative_area_level_1 for provinces/cities in Vietnam)
        if (types.includes('administrative_area_level_1')) {
          data.city = component.long_name;
        }
      });
    }

    return data;
  };

  return (
    <Autocomplete
      onLoad={ref => (autocompleteRef.current = ref)}
      onPlaceChanged={handlePlaceChanged}
      options={{
        componentRestrictions: { country: "vn" },
        fields: [
          'formatted_address',
          'name',
          'geometry.location',
          'address_components',
          'place_id'
        ]
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

export default EnhancedPlacesAutocomplete;
