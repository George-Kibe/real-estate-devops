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
chrome_options.add_experimental_option("detach", True)
# chrome_options.add_argument("--headless")
# chrome_options.add_argument("--no-sandbox")
# chrome_options.add_argument("--disable-dev-shm-usage")

driver=webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

driver.get('https://www.apartments.com/')
search_boxid='quickSearchLookup'

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.ID, search_boxid))
)

search_box = driver.find_element(By.ID, search_boxid)

search_box.clear()
search_box.send_keys('Miami')

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary'))
)

previous_url = driver.current_url
search_button = driver.find_element(By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary')
search_button.click()
#soup = BeautifulSoup(driver.page_source, 'lxml')
#print(soup.prettify())
properties = []
def get_properties(previous_url):
    # Wait for URL change
    WebDriverWait(driver, 10).until(EC.url_changes(previous_url))
    new_url = driver.current_url
    # Get the new page source
    new_page_source = driver.page_source
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
    show_properties(new_properties)
    properties.extend(new_properties)
    WebDriverWait(driver, 5).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a.next'))
    )
    next_page = driver.find_element(By.CSS_SELECTOR, 'a.next')
    previous_url = driver.current_url
    
    if next_page:
        next_page.click()
        get_properties(previous_url)
    else:
        print("This is the last page: Adios!")
        return


print(f'Total properties found: {len(properties)}')

def show_properties(properties):
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
        
        
        # Print the extracted information
        print(f'Title: {title}')
        print(f'Address: {address}')
        print(f'Pricing: {pricing}')
        print(f'Beds: {beds}')
        print(f'Amenities: {", ".join(amenities)}')
        print(f'Phone: {phone}')
        print(f'Image URL: {image_url}')
        print('-----------------------------')
        
        time.sleep(10)


def main():
    get_properties(previous_url)
    print("Total properties found: ", len(properties))

if __name__ == '__main__':
    main()