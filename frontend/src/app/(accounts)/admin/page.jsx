"use client"
import AnimatedText from '@/components/AnimatedText'
import { Button } from '@/components/ui/button'
import { CirclePlus, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [loadingHousing, setLoadingHousing] = useState(false);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loadingCommonBond, setLoadingCommonBond] = useState(false)

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const delayRandomlyAndReturnValue = async() => {
    // Generate a random delay between 10 to 20 minutes (in milliseconds)
    const min = 10 * 60 * 1000; // 10 minutes in milliseconds
    const max = 20 * 60 * 1000; // 20 minutes in milliseconds
    const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
    // console.log(`Delaying for ${randomDelay / 60000} minutes...`);
  
    await delay(randomDelay);
    return "Delayed value";
  }

  const handleScrapHousingLink = async () => {
    setLoadingHousing(true);
    toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    await delayRandomlyAndReturnValue();
    setLoadingHousing(false);
  }
  const handleScrapCommonBond = async () => {
    setLoadingCommonBond(true);
    toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    await delayRandomlyAndReturnValue();
    setLoadingCommonBond(false);
  }
  const handleScrapResourcesHud = async () => {
    setLoadingResources(true);
    toast.error("Scraping Resources.hud failed. Try Again!");
    //toast.info("Scraping Housing Link started. This may take some time. Please be patient");
    // await delayRandomlyAndReturnValue();
    setLoadingResources(false);
  }

  return (
    <div>
      <AnimatedText text={"Admin Actions"} />
      <div className="flex flex-col gap-4">
        <Button className="self-start">
          {
            loadingHousing? 
              <p className="flex items-center gap-1" onClick={handleScrapHousingLink}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapHousingLink}>
                <CirclePlus />Scrap HousingLink
              </p>
          }
        </Button>
        <Button className="self-start">
          {
            loadingCommonBond? 
              <p className="flex items-center gap-1" onClick={handleScrapCommonBond}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapCommonBond}>
                <CirclePlus />Scrap CommonBond Properties
              </p>
          }
          </Button>
        <Button className="self-start">
          {
            loadingResources? 
              <p className="flex items-center gap-1" onClick={handleScrapResourcesHud}>
                <Loader className="animate-spin mr-2" />Scrapping...
              </p>
            : <p className="flex items-center gap-1" onClick={handleScrapResourcesHud}>
                <CirclePlus />Scrap Resources.hud
              </p>
          }
        </Button>
      </div>
    </div>
  )
}

export default AdminPage
