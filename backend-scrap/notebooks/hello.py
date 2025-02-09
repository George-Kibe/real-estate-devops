from selenium import webdriver
from selenium.webdriver import ChromeOptions
import time

options = ChromeOptions()
options.add_argument('--headless=new')

url = "https://www.amazon.com/PlayStation%C2%AE5-Digital-slim-PlayStation-5/dp/B0CL5KNB9M/ref=sr_1_3?crid=B7GWFZXZ2OED&dib=eyJ2IjoiMSJ9.kgp6If9Ie8zGHwBo-0htBLyQbbKjs5VuqpcJV5opH4mRqQT9y1GDUhgEGC4Ze5c7iOpklu5U3l_vF3hGTmGfZf8jvVY7cSGvtmhRbSth2-wUchP4cPB4bCopxZnBPpqLbX4wU-JZkepl_i4fGdXQJXUMLc256FqdCdlbjr6ZMyFHhWIJq2G38fcfQx3z9RS1e48jNXaYXv1rWtJ3Y30-OZP-ckGz15zF5vR6k6z6G6c.HDrf64xu0Nz7DYLZvUdGglWizRZpAXBxsxbsgsW26Tc&dib_tag=se&keywords=ps5&qid=1709675943&sprefix=ps5%2Caps%2C190&sr=8-3"

with webdriver.Chrome(options=options) as driver:
    driver.get(url) # HTTP GET Request -> requests.get(url)
    time.sleep(10)
    html = driver.page_source
    print(html)