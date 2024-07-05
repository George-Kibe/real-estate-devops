"use client"

import AnimatedText from "@/components/AnimatedText";
import Property from "@/components/Property";
import { useMainProvider } from "@/providers/MainProvider";
import { Flex } from "@chakra-ui/react";


export default function FavoritesPage() {
  const {favoriteProperties, setFavoriteProperties} = useMainProvider();
  // console.log("Favorite Properties: ", favoriteProperties);
  return (
    <div className='flex flex-col justify-between gap-5 mb-5'>
      <AnimatedText text={"Favorite Properties"} />
      {!favoriteProperties.length &&
        <div className="text-center">
          <h1 className="text-2xl font-bold">You haven't added any favorite properties</h1>
        </div>}
      {favoriteProperties.length &&
        <div className="container items-center justify-around">
          <Flex flexWrap='wrap' className='flex flex-wrap justify-center gap-6'>
          {favoriteProperties.map((property) => <Property property={property} key={property.id} />)}
          </Flex>
        </div>
      }
    </div>
  );
}