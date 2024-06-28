import { Card, Image } from "@nextui-org/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { IoMdCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const PropertyCard = ({ property }) => {
  return (
    <Card className="flex flex-col md:flex-row gap-4 container items-center self-center hover:scale-105 rounded-md" shadow="md">
      <img
        radius="none"
        src={
          property.images.length > 0 ? property.images[0]
            : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
        }
        className="object-contain w-full h-64"
      />
      <div className="flex flex-col justify-around w-4/5">
        <div className="p-4">
          <p className="text-xl font-bold">{property.title}</p>
          <p className="flex flex-wrap">Description: {property.description}</p>
          <p className="">Type: {property.advert_type}</p>
          <p className="">City: {property.city}</p>
          <p className="">Status: {property.status}</p>
          <p className="">Property type: {property.property_type}</p>
          <p className="">
            {property.postal_code}, {property.street_address}
          </p>
          <p className="flex gap-2 items-center flex-row"><IoMdCall /> {property.phone_number}</p>
          <p className="flex gap-2 items-center flex-row"><MdOutlineEmail /> {property.email_listing}</p>
          
        </div>
        <div className="flex flex-row items-center gap-2 ">
        {property.bedrooms}
          <FaBed /> | {property.bathrooms} <FaBath /> | {property.area} sqft <BsGridFill />
          <div className="bg-black/80 dark:bg-white/80 rounded-md p-4 text-white dark:text-black flex justify-between">
            <p>Price: ${property.price}</p>
          </div>
        </div>
        
      </div>
    </Card>
  );
};

export default PropertyCard;