from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ChromeOptions, Remote
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Options for production and compatibility with docker environment
options = ChromeOptions()
options.add_argument("--headless=new")
# The Docker container running Selenium
SELENIUM_CMD_EXECUTOR = "http://selenium:4444/wd/hub"


# driver=webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver = Remote(command_executor=SELENIUM_CMD_EXECUTOR, options=options)
#driver= webdriver.Chrome(options=options)
def get_apartments(search_term):
    print("Searching for apartments in ", search_term)
    driver.get('https://www.apartments.com/')
    search_boxid='quickSearchLookup'
    # confirm driver was able to access url
    #soup = BeautifulSoup(driver.page_source, 'html.parser')
    #print(soup.prettify())
    print("Current URL: ", driver.current_url)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, search_boxid))
    )

    search_box = driver.find_element(By.ID, search_boxid)

    search_box.clear()
    search_box.send_keys(search_term)    

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary'))
    )

    previous_url = driver.current_url
    search_button = driver.find_element(By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary')
    search_button.click()
    new_properties = get_properties(previous_url)
    return new_properties

def get_properties(previous_url):
    # Wait for URL change
    WebDriverWait(driver, 10).until(EC.url_changes(previous_url))
    new_url = driver.current_url
    # Get the new page source
    new_page_source = driver.page_source
    soup = BeautifulSoup(new_page_source, 'html.parser')
    print("New URL: ", new_url)
    driver.get(new_url)
    try:
        WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'article.placard.has-header'))
    )
    except:
        print("No properties found on this page.")
        return
    # Find all properties with the specified class names
    new_properties = driver.find_elements(By.CSS_SELECTOR, 'article.placard.has-header')
    print("Adding additional properties: ", len(new_properties))
    properties = get_json_properties(new_properties)
    return properties

def get_json_properties(properties):
    json_properties = []
    # Extract the HTML content of each property
    for property in properties:
        html_content = property.get_attribute('outerHTML')
        # Parse the HTML content with BeautifulSoup
        soup = BeautifulSoup(html_content, 'html.parser')
        # Extract text attributes
        title = soup.find('div', class_='property-title').text.strip() if soup.find('div', class_='property-title') else None
        if title is None:
            break
        address = soup.find('div', class_='property-address').text.strip() if soup.find('div', class_='property-address') else None
        pricing = soup.find('p', class_='property-pricing').text.strip() if soup.find('p', class_='property-pricing') else None
        beds = soup.find('p', class_='property-beds').text.strip() if soup.find('p', class_='property-beds') else None
        
        # Extract amenities
        amenities_tags = soup.find('p', class_='property-amenities').find_all('span') if soup.find('p', class_='property-amenities') else []
        amenities = [tag.text.strip() for tag in amenities_tags]
        
        # Extract phone number
        phone = soup.find('a', class_='phone-link').text.strip() if soup.find('a', class_='phone-link') else None
        #extract image from
        image_url = soup.find('img').get('src')
        
        # json of a property
        json_property = {
            'title': title,
            'street_address': address,
            'price': pricing,
            'description': beds,
            'amenities': amenities,
            'phone_number': phone,
            'images': [image_url]
        }
        json_properties.append(json_property)
        
        # # Print the extracted information
        # print(f'Title: {title}')
        # print(f'Address: {address}')
        # print(f'Pricing: {pricing}')
        # print(f'Beds: {beds}')
        # print(f'Amenities: {", ".join(amenities)}')
        # print(f'Phone: {phone}')
        # print(f'Image URL: {image_url}')
        # print('-----------------------------')
        # # time.sleep(1)
    return json_properties

# def main():
#     new_properties = get_properties(previous_url)
#     print("Total properties found: ", len(properties))
#     show_properties(new_properties)
