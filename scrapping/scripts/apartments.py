from bs4 import BeautifulSoup
import requests

url='https://www.apartments.com'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html')

print(soup)