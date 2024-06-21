import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = 'https://www.neuralnine.com/books/'
driver.get(url)

soup = BeautifulSoup(driver.page_source, 'lxml')
headings = soup.find_all('h2', {'class': 'elementor-heading-title'})
for heading in headings:
    print(heading.text)
time.sleep(10)
driver.quit()