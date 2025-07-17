import { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../../redux/features/citySlice";
import { fetchSlots } from "../../../redux/features/slotSlice";
import { fetchProgramById } from "../../../redux/features/programSlice";
import { fetchAddresses } from "../../../redux/features/addressSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";

// Import custom components and hooks
import ProgramFormFields from "./ProgramCreation/ProgramFormFields";
import ImageUpload from "./ProgramCreation/ImageUpload";
import ConfirmationModal from "./ProgramCreation/ConfirmationModal";
import useCityManagement from "./ProgramCreation/useCityManagement";
import useProgramSubmission from "./ProgramCreation/useProgramSubmission";

const { Title } = Typography;

const ProgramForm = () => {
  const { id } = useParams(); // If id exists, it's edit mode
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditMode = Boolean(id);

  // Basic form states
  const [firebaseImageUrl, setFirebaseImageUrl] = useState(null); // Firebase storage URL, used in submitProgram and ConfirmationModal
  const [hasImageSelected, setHasImageSelected] = useState(false); // Track if user has selected an image file
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPlaceData, setSelectedPlaceData] = useState(null);
  
  // Modal states
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Get data from Redux store
  const { data: cities, loading: citiesLoading } = useSelector(state => state.city);
  const { data: slots, loading: slotsLoading } = useSelector(state => state.slot);
  const { selectedProgram } = useSelector(state => state.program);
  const { data: addresses } = useSelector(state => state.address);

  // Custom hooks
  const cityManagement = useCityManagement(cities);
  const { submitProgram } = useProgramSubmission();

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchSlots());

    // Fetch program data and address if in edit mode
    if (isEditMode && id) {
      dispatch(fetchProgramById(id));
      dispatch(fetchAddresses());
    
    }
  }, [dispatch, isEditMode, id]);

  
  
  // Populate form when editing and program data is loaded
  useEffect(() => {
    if (isEditMode && selectedProgram && addresses) {
      // Find the address for this program
      const programAddress = addresses.find(addr => addr.id === selectedProgram.addressId);
      
      // Set form values from existing program
      form.setFieldsValue({
        proName: selectedProgram.proName,
        description: selectedProgram.description,
        startDate: selectedProgram.startDate ? dayjs(selectedProgram.startDate) : undefined,
        endDate: selectedProgram.endDate ? dayjs(selectedProgram.endDate) : undefined,
        dateCreated: selectedProgram.dateCreated ? dayjs(selectedProgram.dateCreated) : dayjs(),
        cityId: selectedProgram.cityId,
        contact: selectedProgram.contact,
        slotIds: selectedProgram.slotIds || [],
        addressInput: programAddress ? programAddress.name : ""
      });

      // Set image URL if exists
      if (selectedProgram.imageUrl) {
        setFirebaseImageUrl(selectedProgram.imageUrl);
        setHasImageSelected(true);
      }

      // Set address related states
      if (programAddress) {
        setSelectedAddress(programAddress.name);
        
        // Set selected place data for validation
        setSelectedPlaceData({
          formattedAddress: programAddress.name,
          name: programAddress.name,
          coordinates: {
            lat: programAddress.latitude,
            lng: programAddress.longitude
          }
        });
      }
    }
  }, [isEditMode, selectedProgram, addresses, form]);

  // Handle Firebase image upload
  const handleFirebaseUpload = (url) => {
    setFirebaseImageUrl(url);
  };

  // Handle image file selection state
  const handleFileListChange = (hasFiles) => {
    setHasImageSelected(hasFiles);
  };

  // Handle place selection from Google Places API
  const handlePlaceSelect = (placeData) => {
    setSelectedPlaceData(placeData);
    
    // Update form field with the formatted address
    form.setFieldValue('addressInput', placeData.formattedAddress);
    
    // Auto-fill program name if it's empty and we have a place name
    const currentProgramName = form.getFieldValue('proName');
    if (!currentProgramName && placeData.name) {
      form.setFieldValue('proName', `Chương trình hiến máu tại ${placeData.name}`);
    }
    
    // Auto-select city after filling address info if we can find a match
    if (placeData.city) {
      const matchingCity = cityManagement.displayCities.find(city => 
        city.name.toLowerCase().includes(placeData.city.toLowerCase()) ||
        placeData.city.toLowerCase().includes(city.name.toLowerCase())
      );
      
      // If city name is found in actual data, set the field to use that
      // otherwise continue to look for city name in the staging list
      if (matchingCity) {
        form.setFieldValue('cityId', matchingCity.id);
      } else {
        // Check if the city exist in staging list (meaning it already in process of being created)
        const cityExists = cityManagement.stagingCities.some(city => 
          city.name.toLowerCase() === placeData.city.toLowerCase()
        );
        
        // If no matching city found, add it as a new staging city
        if (!cityExists) {
          const tempId = Date.now(); // generate a temporary ID to handle form choice & submit
          const newCity = { id: tempId, name: placeData.city, isStaging: true };
          cityManagement.setStagingCities(prev => [...prev, newCity]);
          form.setFieldValue('cityId', tempId);
        }
      }
    }
  };

  // Handle address input change
  const handleAddressChange = (value) => {
    setSelectedAddress(value);
    form.setFieldValue('addressInput', value);
    
    // Clear place data if user manually types instead of selecting
    if (!value) {
      setSelectedPlaceData(null);
    }
  };

  // Handle form submission - show confirmation modal first
  const handleFormSubmit = (values) => {
    // Validate that address has been selected from Google Places (skip for edit mode if no change)
    if (!isEditMode && !selectedPlaceData) {
      toast.error('Vui lòng chọn địa điểm từ danh sách gợi ý của Google Maps!');
      return;
    }
    
    // For edit mode, allow submission even without place data if address wasn't changed
    if (isEditMode && !selectedPlaceData && !selectedAddress) {
      toast.error('Vui lòng nhập địa chỉ!');
      return;
    }
    
    // Check if image was uploaded to Firebase (optional warning)
    if (hasImageSelected && !firebaseImageUrl) {
      toast.warning('Bạn có ảnh nhưng chưa tải lên Firebase. Ảnh mặc định sẽ được sử dụng thay thế.');
    } else if (!hasImageSelected && !isEditMode) {
      toast.info('Chương trình sẽ sử dụng ảnh mặc định.');
    }
    
    setPendingFormData(values);
    setConfirmModalVisible(true);
  };

  // Handle final submission
  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      await submitProgram({
        values: pendingFormData,
        stagingCities: cityManagement.stagingCities,
        deletedCityIds: cityManagement.deletedCityIds,
        selectedPlaceData,
        imageUrl: firebaseImageUrl,
        isEditMode,
        programId: id,
        currentProgram: selectedProgram
      });
    } catch {
      // Error handling is done in the hook
    } finally {
      setSubmitLoading(false);
      setConfirmModalVisible(false);
      setPendingFormData(null);
    }
  };

  // Enhanced revert functions that also clear form selection
  const revertNewCity = (cityId) => {
    cityManagement.revertNewCity(cityId);
    const currentCityId = form.getFieldValue('cityId');
    if (currentCityId === cityId) {
      form.setFieldValue('cityId', undefined);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/admin/programs')}
            style={{ marginBottom: 16 }}
          >
            Quay lại
          </Button>
          <Title level={2}>
            {isEditMode ? 'Chỉnh sửa chương trình' : 'Tạo chương trình mới'}
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            dateCreated: dayjs()
          }}
        >
          <ProgramFormFields
            selectedAddress={selectedAddress}
            handleAddressChange={handleAddressChange}
            handlePlaceSelect={handlePlaceSelect}
            citiesLoading={citiesLoading}
            stagingCities={cityManagement.stagingCities}
            setStagingCities={cityManagement.setStagingCities}
            setDeletedCityIds={cityManagement.setDeletedCityIds}
            displayCities={cityManagement.displayCities}
            form={form}
            getPendingChanges={cityManagement.getPendingChanges}
            revertNewCity={revertNewCity}
            revertDeletedCity={cityManagement.revertDeletedCity}
            slots={slots}
            slotsLoading={slotsLoading}
          />

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Hình ảnh chương trình">
                <ImageUpload
                  onFirebaseUpload={handleFirebaseUpload}
                  onFileListChange={handleFileListChange}
                  initialImageUrl={isEditMode ? firebaseImageUrl : null}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate('/admin/programs')}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {isEditMode ? 'Cập nhật chương trình' : 'Tạo chương trình'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>

      <ConfirmationModal
        visible={confirmModalVisible}
        onConfirm={handleSubmit}
        onCancel={() => {
          setConfirmModalVisible(false);
          setPendingFormData(null);
        }}
        loading={submitLoading}
        pendingFormData={pendingFormData}
        selectedPlaceData={selectedPlaceData}
        selectedAddress={selectedAddress}
        displayCities={cityManagement.displayCities}
        slots={slots}
        imageUrl={firebaseImageUrl} // Show Firebase URL if available
        getPendingChanges={cityManagement.getPendingChanges}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ProgramForm;
