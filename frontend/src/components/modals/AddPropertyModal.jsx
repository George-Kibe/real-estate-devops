"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { CloudUpload, Copy, PlusCircle, Trash2, CloudDownload, Delete } from 'lucide-react';
import { toast } from 'react-toastify';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { handleFileUpload } from '@/utils/google-cloud';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const AddPropertyModal = ({ 
  isOpen,
  onClose,
  setUserProperties,
  currentProperty,
  userProperties,
  editMode,
  setEditMode,
  isNew,
  currentIndex,
  currentProperties,
  setCurrentProperties,
}) => {
  const [title, setTitle] = useState('');
  const [street_address, setStreet_address] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [website, setWebsite] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [comments, setComments] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [resourceUrl, setResourceUrl] = useState(null);
  const [housingType, setHousingType] = useState('');
  const [contactMade, setContactMade] = useState('');
  const [clientHousingPriority, setClientHousingPriority] = useState('');
  const [addressClientConcerns, setAddressClientConcerns] = useState('');
  const [clientQualification, setClientQualification] = useState("")

  const [agentSelected, setAgentSelected] = useState('');
  const [resourcesSelected, setResourcesSelected] = useState('');
  const [agentName, setAgentName] = useState('');
  const [additionalResources, setAdditionalResources] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  // console.log("Additional Resources: ", additionalResources)

  const uploadImage = async(e) => {
    e.preventDefault();
    setUploadLoading(true);
    try {
      const fileUrl = await handleFileUpload(e.target.files[0]);
      if (images?.length > 0){
        setImages((prevImages) => [...prevImages, fileUrl]);
      } else {
        setImages([fileUrl]);
      }
    } catch (error){
      console.log("Uploading error: ", error)
      toast.error("Error uploading file")
    } finally {
      setUploadLoading(false);
    }
  }
  const uploadFile = async(e) => {
    e.preventDefault();
    setFileUploading(true);
    try {
      const fileUrl = await handleFileUpload(e.target.files[0]);
      setResourceUrl(fileUrl)
    } catch (error){
      console.log("Uploading error: ", error)
      toast.error("Error uploading file")
    } finally {
      setFileUploading(false);
    }
  }
  const handleAddResource = () => {
    if (!resourceName || !resourceUrl) {
      toast.error("Missing resource name or resource");
      return
    };
    if (additionalResources?.length > 0){
      setAdditionalResources((prev) => [...prev, {name: resourceName, url: resourceUrl}]);
    } else {
      setAdditionalResources([{name: resourceName, url: resourceUrl}]);
    }
    setResourceName(""); setResourceUrl('');
  }
  const removeResource = (resource) => {
    const updatedResources = additionalResources.filter((r) => r.name !== resource.name);
    setAdditionalResources(updatedResources);
  }

  const handleAddProperty = () => {
    if (!title || !comments){
      toast.error("Please fill in all required fields");
      return
    }
    if (agentSelected === "Yes" && !agentName){
      console.log(agentSelected)
      toast.error("Please add agent name before adding property!")
      return;
    }
    if (resourcesSelected === "Yes" && !additionalResources.length ){
      toast.error("Please add additional resources before adding property!")
      return;
    }
    // const amenitiesList = amenities.split(',').map(item => item.trim());
    
    const newProperty = {
      title : title.trim().replace(/\s+/g, ' '),
      comments : comments.trim().replace(/\s+/g, ' '),
      street_address: street_address.trim().replace(/\s+/g, ' '),
      phone_number,
      price,
      images: images, 
      description: description.trim().replace(/\s+/g, ' '),
      website: website.trim().replace(/\s+/g, ' '),
      isCustom: true,
      isFavorite: false,
      agentSelected: agentSelected,
      resourcesSelected: resourcesSelected,
      agentName: agentName.trim().replace(/\s+/g, ' '),
      additionalResources,
      housingType,
      contactMade,
      clientHousingPriority,
      addressClientConcerns,
      clientQualification
    };

    if (editMode && !isNew) {
      const updatedProperties = userProperties.map((p, i) => {
        if (i === currentIndex) {
          return newProperty;
        }
        return p;
      });
      setUserProperties(updatedProperties);
      onClose()
      toast.success("Property Edited Successfully");
      setEditMode(false);
    } else{
      if (isNew){
        const tempProperties = currentProperties.filter((p, i) => i !== currentIndex);
        setCurrentProperties(tempProperties);
      }
      setUserProperties((prev) => [...prev, newProperty]);
      onClose()
      toast.success("Property Added Successfully");
    }
    //reset everything to null
    setImages([]), setTitle(''); setStreet_address(''); setPhone_number('');
    setDescription(''); setPrice(''); setComments('');
    setWebsite(''); setAgentName(''); setAdditionalResources([]);
    setAgentSelected('');  setResourcesSelected('');
    setResourceName(''); setHousingType(); setContactMade('');
    setAddressClientConcerns(''); setClientHousingPriority(''); setClientQualification('')
  }
  useEffect(() => {
    if (!currentProperty) return;
    // console.log("Current Property: ", currentProperty)
    setTitle(currentProperty.title || '');
    setStreet_address(currentProperty.address || '');
    setPhone_number(currentProperty.phone_number || '');
    setWebsite(currentProperty.website || '');
    setImages(currentProperty?.images);
    setDescription(currentProperty.description || '');
    setPrice(currentProperty.price || '');
    setComments(currentProperty.comments || '');
    setAgentSelected(currentProperty.agentSelected || '');
    setResourcesSelected(currentProperty.resourcesSelected || '');
    setAgentName(currentProperty.agentName || '');
    setHousingType(currentProperty.housingType || '');
    setContactMade(currentProperty.contactMade || '');
    setAddressClientConcerns(currentProperty.addressClientConcerns || '');
    setClientHousingPriority(currentProperty.clientHousingPriority || '');
    setClientQualification(currentProperty.clientQualification || '');
    
    // check if currentproperty.additonal resources is a list
    if (Array.isArray(currentProperty.additionalResources)) {
      setAdditionalResources(currentProperty.additionalResources);
    } else {
      setAdditionalResources([]);
    }
  }, [currentProperty]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2000); // Reset copied status after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const removePropertyImage = (index) => {
    console.log(`Deleting image at index ${index}`)
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
 
  }

  return (
    <div 
      //onClick={onClose}
      className={`z-10 fixed w-full inset-0 flex justify-center items-center transition-colors
        ${isOpen? "visible bg-black/80 dark:bg-white/50" : "invisible"}
      `}
    > 
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`h-[90vh] w-full overflow-auto bg-white p-4 rounded-md
          md:w-1/2 dark:bg-black md:p-8 shadow transition-all 
          ${isOpen ? "scale-100 opacity-100": "sclae-125 opacity-0"}
          `}
      >
        <button onClick={onClose}
          className='absolute top-0 right-0 rounded-lg text-red-700 bg-white hover:bg-gray-50
          hover:text-gray-600'
        >
          <p className="font-bold text-2xl p-2">X</p>
        </button>
        <p className="font-bold text-2xl text-[#45A71E]">
          {editMode? "Edit ": "Add Custom "}
          Property Details
        </p>
        <div className="flex flex-col md:flex-wrap">
          <div className="">
            <p className="flex">Name And Address: <p className="text-red-600">*</p></p>
            <input type="text" placeholder='Property name and Address' 
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="flex">Location: {street_address} </p>
            <GooglePlacesAutocomplete
              key={title} 
              apiKey={GOOGLE_MAPS_API_KEY}
              selectProps={{
                street_address, 
                placeholder: "Search Location...",
                isClearable: true,  
                isDisabled: false,  
                isLoading: false,  
                onChange: (val) => setStreet_address(val ? val.label : null)
              }}
            />
          </div>
          <div className="">
            <p className="flex">Phone Number: </p>
            <input type="text" placeholder='Phone Number' 
              value={phone_number}
              onChange={ev => setPhone_number(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
          <div className="">
            <p className="flex">Price: </p>
            <input type="text" placeholder='Price' 
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        </div>
        <p className="font-semibold pr-2 flex ">Description</p>
        <textarea type="text" placeholder='Enter Your Description here...' 
          value={description} 
          onChange={ev => setDescription(ev.target.value)}
          className="border-2 h-16 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 

        <div className="">
          <p className="">Website:</p>
          <input type="text" placeholder='https://example.com' 
            value={website}
            onChange={ev => setWebsite(ev.target.value)}
            className="border-2 border-gray-300 rounded-md p-1 w-full 
            mb-2 focus:border-blue-900" 
          /> 
        </div>
       
        <p className="font-semibold pr-2 flex">
          Add Comments 
          <p className="text-red-600">*</p>
        </p>
        <textarea type="text" placeholder='Enter Your comments here...' 
          value={comments} 
          onChange={ev => setComments(ev.target.value)}
          className="border-2 h-16 border-gray-300 rounded-md p-1 w-full 
          mb-2 focus:border-blue-900" 
        /> 
        
        <p className="font-semibold pr-2">Property Images</p>
        <div className='border border-gray-800 rounded-md border-dotted gap-2 p-2'>
          <div className="flex flex-row">
            {/* Hidden file input */}
            <input
              type="file"
              id="file"
              accept="image/*"
              className="sr-only"
              onChange={uploadImage}
            />
      
            {/* Image previews */}
            <span className="flex flex-row flex-wrap gap-2 dark:border-dark-3 bg-white dark:bg-dark-2">
              {images?.length > 0 &&
                images.map((image, index) => (
                  <div key={index} className="rounded-sm border-2 border-stroke p-0.5 h-36 w-40">
                    <button onClick={() => removePropertyImage(index)} className='absolute'>
                    <Trash2 className='absolute bg-red-500 rounded-md p-1 text-white' />
                    </button>
                    
                    <img
                      src={image}
                      alt={`${index}-image`}
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                ))}
            </span>
      
            {/* Trigger for file input */}
            <label
              htmlFor="file"
              className="flex h-36 w-48 items-center justify-center cursor-pointer"
            >
              <CloudUpload className="h-12 w-12" />
              <span className="text-center underline">
                {uploadLoading ? "Uploading..." : "Browse"}
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-start p-2">
          <h2 className="text-xl font-bold mb-4">Housing Type</h2>
          <div className="">
            <RadioGroup value={housingType} defaultValue="Market Rate" onValueChange={setHousingType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Affordable LIHT" id="r1" />
                <Label htmlFor="r1">Affordable LIHT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Subsidized Housing" id="r2" />
                <Label htmlFor="r2">Subsidized Housing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Section 8/Voucher Friendly" id="r3" />
                <Label htmlFor="r3">Section 8/Voucher Friendly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Market Rate" id="r4" />
                <Label htmlFor="r4">Market Rate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Supportive Housing" id="r5" />
                <Label htmlFor="r5">Supportive Housing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Senior/ Disability Housing" id="r6" />
                <Label htmlFor="r6">Supportive Housing</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

         <div className="flex flex-col items-start p-2 my-4">
          <h2 className="text-xl font-bold mb-4">Additional Inquiries</h2>
          
          <h2 className="text-xl font-bold mb-4">1. How was the Contact Made?</h2>
          <div className="">
            <RadioGroup value={contactMade} defaultValue="Phone" onValueChange={setContactMade}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Phone" id="r1" />
                <Label htmlFor="r1">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Email" id="r2" />
                <Label htmlFor="r2">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Not Applicable" id="r3" />
                <Label htmlFor="r3">Not Applicable</Label>
              </div>
            </RadioGroup>
          </div>

          <h2 className="text-xl font-bold mb-4 mt-4">2. Does this meet client's housing priorities?</h2>
          <div className="">
            <RadioGroup value={clientHousingPriority} defaultValue="Partially meets the client's priorities" 
              onValueChange={setClientHousingPriority}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fully meets the client's priorities" id="r1" />
                <Label htmlFor="r1">Fully meets the client's priorities</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Partially meets the client's priorities" id="r2" />
                <Label htmlFor="r2">Partially meets the client's priorities</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Doesn't meet the client's priorities" id="r3" />
                <Label htmlFor="r3">Doesn't meet the client's priorities</Label>
              </div>
            </RadioGroup>
          </div>

          <h2 className="text-xl font-bold mb-4 mt-4">3. Does this address the client's concerns?</h2>
          <div className="">
            <RadioGroup value={addressClientConcerns} defaultValue="Partially addresses the client's concerns" 
              onValueChange={setAddressClientConcerns}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fully addresses the client's concerns" id="r1" />
                <Label htmlFor="r1">Fully addresses the client's concerns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Partially addresses the client's concerns" id="r2" />
                <Label htmlFor="r2">Partially addresses the client's concerns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Doesn't address the client's concerns" id="r3" />
                <Label htmlFor="r3">Doesn't address the client's concerns</Label>
              </div>
            </RadioGroup>
          </div>

          <h2 className="text-xl font-bold mb-4 mt-4">4. Does this option align with the client's qualification?</h2>
          <div className="">
            <RadioGroup value={clientQualification} defaultValue="Partially aligns with the client's qualification" 
              onValueChange={setClientQualification}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fully aligns with the client's qualification" id="r1" />
                <Label htmlFor="r1">Fully aligns with the client's qualification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Partially aligns with the client's qualification" id="r2" />
                <Label htmlFor="r2">Partially aligns with the client's qualification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Doesn't align with the client's qualification" id="r3" />
                <Label htmlFor="r3">Doesn't align with the client's qualification</Label>
              </div>
            </RadioGroup>
          </div>

        </div>

        <div className="flex flex-col items-start p-2">
          <h2 className="text-xl font-bold mb-4">Did you talk with someone?</h2>
          <div className="">
            <RadioGroup value={agentSelected} defaultValue="Yes" onValueChange={setAgentSelected}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        {agentSelected === "Yes" && (
          <div className="">
            <p className="">Name of Staff/Agent Called :</p>
            <input type="text" placeholder='Agent Name' 
              value={agentName || ''} 
              onChange={ev => setAgentName(ev.target.value)}
              className="border-2 border-gray-300 rounded-md p-1 w-full 
              mb-2 focus:border-blue-900" 
            /> 
          </div>
        )}

        <div className="flex flex-col items-start p-2">
          <h2 className="text-xl font-bold mb-4">Did you request for additional Resources?</h2>
          <div className="">
            <RadioGroup value={resourcesSelected} defaultValue="Yes" onValueChange={setResourcesSelected}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="r2" />
                <Label htmlFor="r2">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {resourcesSelected === "Yes" && (
          <div className="">
            <p className="">Additional Resources:</p>
            {additionalResources?.length > 0 &&
              additionalResources?.map((resource, index) => (
                <div key={index} className="flex flex-row items-center gap-2 mb-2">
                  <p className="">{index+ 1}.{resource.name}:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{resource.url.substring(0,30)}...</p>
                    {copiedText === resource.url ? "Copied!" : 
                    <Copy 
                      onClick={() => handleCopy(resource.url)}  className="h-6 w-6" 
                    />  }
                    <Trash2 onClick={() => removeResource(resource)} className="h-6 w-6" />
                    <a key={index} href={resource.url} target="_blank" rel="noopener noreferrer">
                      <CloudDownload className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              ))}
            <div className="flex flex-row gap-2 items-center py-2">
              <input type="text" placeholder='Resource Name'
                value={resourceName}
                onChange={ev => setResourceName(ev.target.value)}
                className="border-2 border-gray-300 rounded-md p-1
                mb-2 focus:border-blue-900 h-10"
              />
              <input type="file" className='max-w-60 h-10' onChange={uploadFile} />
              <Button 
                disabled={fileUploading || !resourceUrl} 
                onClick={handleAddResource}
              >
                <PlusCircle />
                {fileUploading? "Uploading...": "Add"}
              </Button>
            </div>
          </div>
        )}
        <Button onClick={handleAddProperty} className="mt-8">
          {editMode? "Update": "Add Custom"}  Property
        </Button>
      </div>
    </div>
  );
};

export default AddPropertyModal;