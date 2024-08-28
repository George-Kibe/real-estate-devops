'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AnimatedText from './AnimatedText';
import { useMainProvider } from '@/providers/MainProvider';
import axios from 'axios';
import { Button } from './ui/button';

const SearchView = () => {
  const [searchtext, setSearchtext] = useState('');
  const {location, setCustomProperties, setLocation} = useMainProvider();
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [property, setProperty] = useState('');

  const searchForProperties = async (text) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search-properties/?search=${text}`)
      if (response.data.count > 0){
        setCustomProperties(response.data.results)
      }else{
        toast.error('No properties found for the given location. Try Another Location');
      } 
      setSearchtext('')
    } catch (error) {
      toast.error("Error searching. Please try again");
      console.log(error)
    }
  }
  useEffect(() => {
    if (!type){
      return;
    }
    if (type === 'All') {
      searchForProperties('a');
    } else if (type === 'Subsidized') {
      searchForProperties(type);
    }
  }, [type])
  

  const handleClick = async(e) => {
    e.preventDefault();
    if(!searchtext){
      toast.error('Please enter Location to search');
      return
    };
    await searchForProperties(searchtext);
    setLocation(searchtext);
  };
  // console.log("Type: ", type)

  return (
    <div className="flex w-full pt-4 pb-8 flex-col items-center justify-center bg-cover bg-center">
      <div className="flex w-full pt-4 pb-8 flex-col items-center justify-center bg-cover bg-center"  style={{ backgroundImage: 'url("https://i.ibb.co/Bt7bhVy/realestate25.jpg")' }}>
        <h1 className="text-xl md:text-4xl text-black font-bold mb-4">Discover Your New Home</h1>
        <p className="md:text-xl text-black mb-8">Helping millions find their perfect houses</p>
        <div className="flex flex-col md:flex-row gap-4">
          <form className="flex relative flex-col gap-4 md:flex-row items-center justify-center" >
            <input
              type="text"
              value={searchtext}
              onChange={(e) => setSearchtext(e.target.value)}
              placeholder="Search by Location..."
              className=" py-2 pl-4 pr-10 rounded-md border border-gray-300"
            />
            <button type='submit' onClick={handleClick} className="flex flex-row ml-4 bg-green-600 px-2 p-1 rounded-lg">
              <p className="self-center mr-2">Search</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
          {/* <button type='submit' onClick={handleAdvancedSearch} className="flex flex-row ml-4 bg-blue-600 px-2 p-1 rounded-lg">
            <p className="self-center mr-2">Advanced Search</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button> */}
        </div>
      </div>
      {
        location && 
        <AnimatedText text={`Properties Around ${location}`} />
      }
      <SearchFilters setType={setType} />
    </div>
  )
}

export default SearchView


const SearchFilters = ({setType}) => {
  const handleFilters = () => {
    console.log("Apply Filters");
  }
  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col md:flex-row space-between items-center justify-center">
        <div className="gap-2">
          <label className='mr-4'>Type:</label>
          <select name="type" id="type" onChange={(event) => setType(event.target.value)}>
            <option value="All">All</option>
            <option value="Subsidized">Subsidized</option>
          </select>
        </div>
        <div className="item">
          <label className='mr-4'>Property:</label>
          <select name="property" id="property">
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        <div className="item">
          <label className='mr-4'>Min Price:</label>
          <input
            className='w-24 px-2'
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
          />
        </div>
        <div className="item">
          <label className='mr-4'>Max Price:</label>
          <input
            className='w-24 px-2'
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
          />
        </div>
        <div className="item">
          <label>Bedrooms:</label>
          <input
            className='w-20 border-none px-2'
            type="number"
            name="bedroom"
            placeholder="Any"
          />
        </div>
        <Button className='ml-4' onClick={handleFilters}>
          Apply
        </Button>
      </div>
    </div>
  )
}
