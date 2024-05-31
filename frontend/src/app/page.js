import Navbar from "@/components/NavBar";
import Property from "@/components/Property";
import { baseUrl, fetchApi } from "@/utils/fetchAPI";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

export default async function Home() {
  // const response = await fetchProperties();
  //const {propertiesForSale, propertiesForRent} = response;
  // console.log(propertiesForSale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <Box>
        <Flex flexWrap='wrap'>
          {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
        <Flex flexWrap='wrap'>
          {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
        </Flex>
      </Box>       */}
    </main>
  );
}

export async function fetchProperties() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
  };
}