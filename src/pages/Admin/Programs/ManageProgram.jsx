import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import ProgramMapPanel from "./ProgramMapPanel"
import ProgramTablePanel from './ProgramTablePanel';
import { BsGripHorizontal } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrograms } from "../../../redux/features/programSlice";
import { fetchAddresses } from "../../../redux/features/addressSlice";

export default function ManageProgram() {
  // fetching datas (and their loading state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchAddresses());
  }, [dispatch]);

  const { data: programs, loading: programsLoading } = useSelector(state => state.program);
  const { data: addresses, loading: addressesLoading } = useSelector(state => state.address);

  // set initial states
  const [selectedProgram, setSelectedProgram] = useState(null); // selected program through table row/marker
  const [mapCenter, setMapCenter] = useState({ // initial map centered at our facility
    lat: 10.773477807259052,
    lng: 106.6598671630604,
  });

  

  // when the list of programs changes, check if the selected program still exists.
  // If not, it means it was deleted, so we clear the selection. Used by map to remove the info window
  useEffect(() => {
    if (selectedProgram && !programs.find(p => p.id === selectedProgram.id)) {
      setSelectedProgram(null);
    }
  }, [programs, selectedProgram]); // "run when these var change" part

  // When a program is selected, update map center to its address
  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    // Using program.addressId to search for address in the address list that match the id of the one in program
    const address = addresses.find(addr => addr.id === program.addressId);
    if (address && address.latitude && address.longitude) {
      setMapCenter({ lat: address.latitude, lng: address.longitude });
    }
  };

  // render view, passing all the states two the child component so they can use it
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <PanelGroup direction="vertical">
        <Panel defaultSize={70} minSize={10}>
          <div style={{ height: "100%", overflow: "auto" }}>
            <ProgramMapPanel
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
              mapCenter={mapCenter}
              programs={programs}
              programsLoading={programsLoading}
              addresses={addresses}
              addressesLoading={addressesLoading}
            />
          </div>
        </Panel>

        <PanelResizeHandle
          style={{
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <BsGripHorizontal style={{ fontSize: 22, color: '#888' }} />
        </PanelResizeHandle>

        <Panel defaultSize={30} minSize={10} maxSize={50}>
          <div style={{ height: "100%", overflow: "auto", padding: "10" }}>
            <ProgramTablePanel
              selectedProgram={selectedProgram}
              onSelectProgram={handleSelectProgram}
              programs={programs}
              programsLoading={programsLoading}
              addresses={addresses}
              addressesLoading={addressesLoading}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}