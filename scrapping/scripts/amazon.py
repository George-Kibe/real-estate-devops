from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
# make the browser run in the background
# options.add_argument("--headless")
#make the browser run even when done
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.get('https://www.neuralnine.com/')

links = driver.find_elements("xpath", "//a[@href]")

for link in links:
    print(link)
links[0].click

#switch tabs on the window if there was a achange in url
driver.switch_to.window(driver.window_handles[1])

print('Done')