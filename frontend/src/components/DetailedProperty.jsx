import { Card, Image } from "@nextui-org/react";
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { IoMdCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { Star } from "lucide-react";
import { useMainProvider } from "@/providers/MainProvider";

const PropertyCard = ({ property }) => {
  const {favoriteProperties, setFavoriteProperties} = useMainProvider();
  const isFavorite = favoriteProperties.find(p => p.id === property.id);
  const addToFavorite = () => {
    if (isFavorite) {
      setFavoriteProperties(favoriteProperties.filter(p => p.id !== property.id));
    } else {
      setFavoriteProperties([...favoriteProperties, property]);
    }
  }

  return (
    <Card className="flex flex-col md:flex-row gap-4 container items-center self-center hover:scale-105 rounded-md" shadow="md">
      <div className="flex flex-col">
        <img
          radius="none"
          src={
            property?.images?.length > 0 ? property.images[0]
              : `/images/${Math.floor(Math.random() * 9 + 1)}.jpg`
          }
          className="object-contain w-full h-64"
        />
        <button className="" onClick={addToFavorite}>
          <Star className={`w-6 h-6 ${isFavorite? "text-red-500": ""}`} />
        </button>
      </div>
      <div className="flex flex-col justify-around w-4/5">
        <div className="p-4">
          <p className="text-xl font-bold">{property.title}</p>
          <p className="flex flex-wrap"><p className="font-semibold">Description:</p>{property.description}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Type:</p>{property.advert_type}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">City:</p>{property.city}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Status:</p>{property.status?.pending? "Pending": "Active"}</p>
          <p className="flex gap-2 flex-row"><p className="font-semibold">Property type:</p>{property.property_type}</p>
          <p className="">
            {property.postal_code}, {property.street_address}
          </p>
          <p className="flex gap-1 items-center flex-row"><IoMdCall className="w-8 h-8" /> {property.phone_number}</p>
          <p className="flex gap-1 items-center flex-row"><MdOutlineEmail className="w-8 h-8" /> {property.email_listing}</p>
          
        </div>
        <div className="font-normal flex flex-row flex-wrap">
          <p className="font-bold mr-2">Amenities:</p> {property.amenities?.map((a, index) => <p className="ml-1" key={index}>{a +", "}</p>)}
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