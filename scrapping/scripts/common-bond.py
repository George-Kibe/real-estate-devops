from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Options for production and compatibility with docker environment
chrome_options = Options()
#chrome_options.add_argument("--headless")
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--disable-dev-shm-usage")
# chrome_options.add_argument("--disable-gpu")
# chrome_options.add_argument("--window-size=1920,1080")
# chrome_options.add_argument("--disable-extensions")
# chrome_options.add_argument("--disable-popup-blocking")
chrome_options.add_argument('user-agent="MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"')


driver=webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

#driver.get('https://properties.commonbond.org/searchlisting.aspx?ftst=&txtCity=Minneapolis')
driver.get('https://properties.commonbond.org/searchlisting.aspx?ftst=&txtCity=Minnesota&LocationGeoId=45')

WebDriverWait(driver, 10).until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div[itemtype="http://schema.org/ApartmentComplex"]'))
)

properties = driver.find_elements(By.CSS_SELECTOR, 'div[itemtype="http://schema.org/ApartmentComplex"]')
print("Number of properties found: ", len(properties))
#print(soup.prettify())
# Extract information from each property
for property in properties:
    html_content = property.get_attribute('outerHTML')
    # Parse the HTML content with BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract the information
    property_lat = soup.find('span', class_='propertyLat').text
    property_lng = soup.find('span', class_='propertyLng').text
    property_address = soup.find('span', class_='propertyAddress').text
    property_short_name = soup.find('span', class_='propertyShortName').text
    property_name = soup.find('span', class_='propertyName').text
    property_min_rent = soup.find('span', class_='propertyMinRent').text

    # Additional fields that might not always be present
    property_max_rent = soup.find('span', class_='propertyMaxRent')
    property_min_bed = soup.find('span', class_='propertyMinBed')
    property_max_bed = soup.find('span', class_='propertyMaxBed')
    property_min_bath = soup.find('span', class_='propertyMinBath')

    # Extract the text if the element is found, else set to None
    property_max_rent = property_max_rent.text if property_max_rent else None
    property_min_bed = property_min_bed.text if property_min_bed else None
    property_max_bed = property_max_bed.text if property_max_bed else None
    property_min_bath = property_min_bath.text if property_min_bath else None

     # Extract the property link
    property_link = soup.find('a', class_='AddClickTrackParams ListViewSearchPropName propertyName propertyUrl')
    property_link = property_link['href'] if property_link else None

    # Print or store the extracted information
    print(f"Property Name: {property_name}")
    print(f"Address: {property_address}")
    print(f"Latitude: {property_lat}, Longitude: {property_lng}")
    print(f"Short Name: {property_short_name}")
    print(f"Min Rent: ${property_min_rent}")
    if property_max_rent:
        print(f"Max Rent: ${property_max_rent}")
    if property_min_bed and property_max_bed:
        print(f"Beds: {property_min_bed} - {property_max_bed}")
    if property_min_bath:
        print(f"Baths: {property_min_bath}")
    if property_link:
        print(f"Property Link: {property_link}")
    print("\n")

time.sleep(10)
driver.quit()