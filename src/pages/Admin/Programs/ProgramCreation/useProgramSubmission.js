// Custom hook for handling program submission logic
/*
  Used in:
  + CreateProgramRefactored.jsx: For final submission of program data to backend
  
  Purpose:
  - Handles city management operations (add new cities, delete marked cities)
  - Creates new address records from Google Places data
  - Maps temporary city IDs to backend-generated IDs
  - Submits complete program data to backend
  - Manages error handling and user feedback
*/

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProgram, updateProgram } from "../../../../redux/features/programSlice";
import { addCity, deleteCityById } from "../../../../redux/features/citySlice";
import { createAddress } from "../../../../redux/features/addressSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";


const useProgramSubmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // parameters:
  /*
    values: information collected from ant design form
    stagingCities: Array of city objects, including both existing and newly added (staging) cities
    deletedCityIds: Array of city IDs marked for deletion during this program creation session
    selectedPlaceData: Object containing Google Places data, get from EnhancedPlacesAutocomplete component
    imageUrl: String, URL of the program image from firebase
    isEditMode: Boolean, whether this is an edit operation
    programId: String, ID of the program being edited (only for edit mode)
  */
  const submitProgram = async ({
    values,
    stagingCities,
    deletedCityIds,
    selectedPlaceData,
    imageUrl,
    isEditMode = false,
    programId = null
  }) => {
    try {
      // Process: First, commit city changes
      const cityPromises = [];

      // Process: Add new cities, for each city in the staging list, use the thunk
      // to add it to backend and unwrap the response to add the actual object to the final result list
      const newCities = stagingCities.filter(city => city.isStaging);
      for (const city of newCities) {
        cityPromises.push(dispatch(addCity({ name: city.name })).unwrap());
      }

      // Process: Delete marked cities, same process as creation
      for (const cityId of deletedCityIds) {
        cityPromises.push(dispatch(deleteCityById(cityId)).unwrap());
      }

      // Process: Wait for all city operations to complete
      // This var contain the final list of cities after add/delete process happened
      // including the backend-generated ids of new city (important later)
      // Note: this include both the response of the city object after creation and the messages after deletion
      // but the order will be the same after promises are resolved (add, add,... , delete, delete,..)
      const cityResults = await Promise.all(cityPromises);

      // Process: Find the actual cityId if a new city was selected
      // set the final id to be the selected city in the form initially, so if there is no new city
      // or the new city isn't selected, the below block can be skipped safely
      let finalCityId = values.cityId;
      // looks for the cityId in stagingCities that match the selected id and checks if it has isStaging: true
      // if it is true, that means the selected id is a new city that has been added to database
      // proceed to do some logic to replace the tempId with actual id
      if (values.cityId && stagingCities.find(city => city.id === values.cityId)?.isStaging) {
        // get the index of the staging city. This index is important because when we create new cities, 
        // we dispatch them in order and get their results in the same order in cityResults.
        const newCityIndex = newCities.findIndex(city => city.id === values.cityId);

        // additional check to see if the index exist and the city object in the result list exist
        if (newCityIndex !== -1 && cityResults[newCityIndex]) {
          finalCityId = cityResults[newCityIndex].id; // replace the tempId of the selected staging city with actual database id
        }
      }

      // Process: Handle address - if we have place data from Google, create new address
      let finalAddressId = null;
      if (selectedPlaceData && selectedPlaceData.coordinates) {
        const addressData = {
          name: selectedPlaceData.formattedAddress,
          latitude: selectedPlaceData.coordinates.lat,
          longitude: selectedPlaceData.coordinates.lng
        };
        
        const newAddress = await dispatch(createAddress(addressData)).unwrap();
        finalAddressId = newAddress.id;
      }

      // Process: Prepare final data for backend submission
      // Use placeholder image if no image was uploaded
      const placeholderImageUrl = 'https://firebasestorage.googleapis.com/v0/b/seventh-dynamo-465214-j3.firebasestorage.app/o/images%2Fdonation-programs%2FPlaceholderBloodDrive.jpg?alt=media&token=6a26d6e6-4d4c-429e-97ff-0b8b1c53913b';
      const finalImageUrl = imageUrl || placeholderImageUrl;

      const programData = {
        proName: values.proName,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        // if isEdit, don't change dateCreated
        dateCreated: isEditMode ? values.dateCreated.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        addressId: finalAddressId,
        cityId: finalCityId,
        description: values.description || null,
        contact: values.contact || null,
        imageUrl: finalImageUrl,
        slotIds: values.slotIds || []
      };

      // Submit program data based on mode
      if (isEditMode && programId) {
        await dispatch(updateProgram({ id: programId, ...programData })).unwrap();
        toast.success('Chương trình đã được cập nhật thành công!');
      } else {
        await dispatch(addProgram(programData)).unwrap();
        toast.success('Chương trình đã được tạo thành công!');
      }
      
      navigate('/admin/programs');
    } catch (error) {
      const errorMessage = isEditMode ? 'Có lỗi xảy ra khi cập nhật chương trình: ' : 'Có lỗi xảy ra khi tạo chương trình: ';
      toast.error(errorMessage + error);
      throw error;
    }
  };

  return { submitProgram };
};

export default useProgramSubmission;
