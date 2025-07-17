
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import markerImg from "../../../assets/program-marker.png";
import centerMarker from "../../../assets/headquarter.png";
import { Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// our facility location, re-declare it here in case the initial state is lost
// so we can, reset map position to this through a button
const center = {
  lat: 10.773477807259052,
  lng: 106.6598671630604,
};

const mapOptions = {
  disableDefaultUI: true, // disables all default map UI buttons
};


const ProgramMapPanel = ({ selectedProgram, setSelectedProgram, mapCenter, programs, programsLoading, addresses, addressesLoading }) => {
  const navigate = useNavigate();

  // used the passed loading state here to render a spin
  if (programsLoading || addressesLoading) return <Spin size="large" fullscreen />;

  // Helper function to get address name
  const getAddressName = (addressId) => {
    //search through the address list to find addr associated with the selected program
    const address = addresses.find(addr => addr.id === addressId);
    return address ? address.name : "Unknown location";
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={selectedProgram ? mapCenter : center}
      zoom={15}
      options={mapOptions}
    >
      {/* Add a marker at our facility's address */}
      <Marker
        position={{ lat: center.lat, lng: center.lng }}
        icon={{
          url: centerMarker,
          scaledSize: { width: 40, height: 50 },
        }}
      />

      {/* Add markers for each program's address */}
      {programs && addresses &&
        programs.map((program) => {
          const address = addresses.find(
            (addr) => addr.id === program.addressId
          );
          if (address && address.latitude && address.longitude) {
            return (
              <Marker
                key={program.id}
                position={{ lat: address.latitude, lng: address.longitude }}
                title={program.proName}
                icon={{
                  url: markerImg,
                  scaledSize: { width: 60, height: 60 },
                }}
                onClick={() => setSelectedProgram(program)}
              />
            );
          }
          return null;
        })}

      {/* Info Window for selected program */}
      {selectedProgram && (
        <InfoWindow
          position={{
            lat: addresses.find(addr => addr.id === selectedProgram.addressId)?.latitude + 0.002,
            lng: addresses.find(addr => addr.id === selectedProgram.addressId)?.longitude
          }}
          onCloseClick={() => setSelectedProgram(null)}
        >
          <div style={{ flex: 1, minWidth: 0, maxWidth: 250 }}>
            <img src={selectedProgram.imageUrl} style={{
              width: '100%',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '8px'
            }}
              alt={selectedProgram.proName}></img>
            <h3 style={{ margin: '0 0 8px 0' }}>{selectedProgram.proName}</h3>
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Location:</strong> {getAddressName(selectedProgram.addressId)}
            </p>
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Start Date:</strong> {selectedProgram.startDate}
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>End Date:</strong> {selectedProgram.endDate}
            </p>
            <Button
              type="primary"
              block
              onClick={() => navigate(`/admin/programs/${selectedProgram.id}`)}
              style={{ marginTop: 8 }}
            >
              Xem chi tiết
            </Button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default ProgramMapPanel;
