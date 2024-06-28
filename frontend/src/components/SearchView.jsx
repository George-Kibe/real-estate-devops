'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AnimatedText from './AnimatedText';
import { useMainProvider } from '@/providers/MainProvider';
import { Menu, Dropdown, Button } from "antd";
import {  DownOutlined} from "@ant-design/icons";
import axios from 'axios';

const SearchView = () => {
  const [searchtext, setSearchtext] = useState('')
  const {location, setCustomProperties, setLocation} = useMainProvider()

  const handleClick = async(e) => {
    e.preventDefault();
    if(!searchtext){
      toast.error('Please enter Location to search');
      return
    };
    // call the backend API to search for houses based on the location
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/search-properties/?search=${searchtext}`)
      if (response.data.count > 0){
        setCustomProperties(response.data.results)
        setLocation(searchtext)
      }else{
        toast.error('No properties found for the given location. Try Another Location or Advanced Search');
      } 
      setSearchtext('')
    } catch (error) {
      toast.error("Error searching. Please try again");
      console.log(error)
    }
  };

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    console.log("Advanced Searching", searchtext);
    toast.error('Please enter Location to search');
  };

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
              <p className="self-center mr-2">Basic Search</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
          <button type='submit' onClick={handleAdvancedSearch} className="flex flex-row ml-4 bg-blue-600 px-2 p-1 rounded-lg">
            <p className="self-center mr-2">Advanced Search</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
      </div>
      <AnimatedText text={`Properties Around ${location}`} />
      <SearchFilters />
    </div>
  )
}

export default SearchView


const SearchFilters = () => {

  const onSearchCTAClick = () => {
    console.log("Search CTA Clicked");
  };
  return (
    <div className="self-stretch flex flex-row flex-wrap items-start justify-center">
      <div className="flex-1 rounded-lg justify-around bg-gray-white flex flex-col py-8 px-[62px] box-border items-center max-w-[1400px] md:flex-row">
        <div className="w-[137px] flex flex-col items-start justify-start gap-[16px] text-center">
          <div className="relative leading-[24px] capitalize font-semibold">
            Location
          </div>
          <Dropdown
            overlay={
              <Menu>
                {[
                  { value: "Minnesota" },
                  { value: "Minneapolis" },
                  { value: "Arizona" },
                  { value: "New York" },
                  { value: "California" },
                ].map((option, index) => (
                  <Menu.Item key={index}>
                    <a onClick={(e) => e.preventDefault()}>
                      {option.value || ""}
                    </a>
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomLeft"
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()} className="flex flex-row items-center">
              {`Select City`}
              <DownOutlined className="ml-1"/>
            </a>
          </Dropdown>
        </div>
        <div className="w-[177px] flex flex-col items-start justify-start gap-[16px]">
          <div className="relative leading-[24px] capitalize font-semibold flex items-end w-[150px]">
            Property Type
          </div>
          <Dropdown
            className="self-stretch"
            overlay={
              <Menu>
                {[
                  { value: "Apartments" },
                  { value: "Condos" },
                  { value: "Houses" },
                  { value: "TownHouses" },
                  { value: "Duplexes" },
                  { value: "Newly Constructed" },
                ].map((option, index) => (
                  <Menu.Item key={index}>
                    <a onClick={(e) => e.preventDefault()}>
                      {option.value || ""}
                    </a>
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomLeft"
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              {`Select property type `}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
        <div className="w-[155px] flex flex-col items-start justify-start gap-[16px]">
          <div className="relative leading-[24px] capitalize font-semibold flex items-end w-[150px]">
            Rent Range
          </div>
          <Dropdown
            className="self-stretch"
            overlay={
              <Menu>
                {[
                  { value: "US$ 500-US$ 1000" },
                  { value: "US$ 1000-US$ 1500" },
                  { value: "US$ 1500-US$ 2000" },
                  { value: "US$ 2000-US$ 3000" },
                  { value: "US$ 3001-US$ 4000" },
                  { value: "US$ 4000-US$ 5000" },
                  { value: "US$ 5000-US$ 6000" },
                  { value: "US$ 6000-US$ 9000" },
                  { value: "Above US$ 100000" },
                ].map((option, index) => (
                  <Menu.Item key={index}>
                    <a onClick={(e) => e.preventDefault()}>
                      {option.value || ""}
                    </a>
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement="bottomLeft"
            trigger={["hover"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              {`Select rent range `}
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
