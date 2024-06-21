from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# bright data for ip rotating https://www.youtube.com/watch?v=NB8OceGZGjA 15:03
import time

# https://googlechromelabs.github.io/chrome-for-testing/#stable

service = Service(executable_path="./bin/chromedriver")
driver = webdriver.Chrome(service=service)

driver.get('https://google.com')

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'gLFyf'))
)

input_element = driver.find_element(By.CLASS_NAME, 'gLFyf')
# type into the input element
input_element.clear()
input_element.send_keys('Tech With Tim', Keys.ENTER)

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, 'Tech With Tim'))
)
# click on the first link
links = driver.find_elements(By.PARTIAL_LINK_TEXT, 'Tech With Tim') # returns a list
links[0].click()
# driver.find_element(By.PARTIAL_LINK_TEXT, 'Tech With Tim').click()

time.sleep(10)

driver.quit()