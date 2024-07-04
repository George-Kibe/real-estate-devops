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
          <p className="flex flex-wrap"><p className="font-semibold">Description:</p>{property.description}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Type:</p>{property.advert_type}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">City:</p>{property.city}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Status:</p>{property.status}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Property type:</p>{property.property_type}</p>
          <p className="">
            {property.postal_code}, {property.street_address}
          </p>
          <p className="flex gap-1 items-center flex-row"><IoMdCall className="w-8 h-8" /> {property.phone_number}</p>
          <p className="flex gap-1 items-center flex-row"><MdOutlineEmail className="w-8 h-8" /> {property.email_listing}</p>
          
        </div>
        <div className="flex flex-row items-center gap-1 ">
        {property.bedrooms}
          <FaBed /> | {property.bathrooms} <FaBath /> | {property.plot_area} sqft <BsGridFill />
          <div className="bg-black/80 dark:bg-white/80 rounded-md p-4 text-white dark:text-black flex justify-between">
            <p>Price: ${property.price}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;