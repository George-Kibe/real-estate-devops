from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

service = Service(executable_path="/usr/local/bin/chromedriver")
driver=webdriver.Chrome(service=service)

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

search_button = driver.find_element(By.CSS_SELECTOR, '.go.btn.btn-lg.btn-primary')
search_button.click()
soup = BeautifulSoup(driver.page_source, 'lxml')
print(soup.prettify())

time.sleep(10)
driver.quit()