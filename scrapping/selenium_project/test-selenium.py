from selenium import webdriver
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

options = ChromeOptions()
#options.add_argument("--headless=new")
url='https://www.apartments.com/'

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get(url)
search_boxid='quickSearchLookup'

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.ID, search_boxid))
)

search_box = driver.find_element(By.ID, search_boxid)

search_box.clear()
search_box.send_keys("djbdhjd")    

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary'))
)

previous_url = driver.current_url
search_button = driver.find_element(By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary')
search_button.click()