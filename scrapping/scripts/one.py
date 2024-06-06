from requests_html import HTMLSession
from bs4 import BeautifulSoup
import re
from datetime import date
from csv import DictWriter

urls = [
    'https://properties.commonbond.org/searchlisting.aspx?ftst=&txtCity=Minnesota&LocationGeoId=45',
    # 'https://www.idealista.com/en/alquiler-viviendas/santa-cruz-de-tenerife/tenerife/pagina-3.htm',
    # 'https://www.apartments.com/miami-beach-fl/2/'
]

today = date.today()
print("Today's date:", today.strftime("%d-%m-%Y"))

session = HTMLSession()

for url in urls:
    print("Fetching data for: ", url)
    r = session.get(url)
    print(r.html.find('title', first=True).text)
    

def get_header_title():
    r = session.get(urls[0])
    element = r.html.find('#numResultWrap', first=True)
    # element = r.html.find('span[itemProp=price]', first=True)
    print(element.text)
    return r.html.find('h1.display-text', first=True).text

def clean_price(price):
    # return as fload two decimal places
    
    return float(re.sub('[^0-9.]', '', price))

print(get_header_title())
print(clean_price('€ 5631.00 Kshshs'))

def data_to_csv():
    columns = ['title', 'price', 'link']
    properties = [
        {'title': 'Property 1', 'price': 100000, 'link': 'https://example.com/property-1'},
        {'title': 'Property 2', 'price': 200000, 'link': 'https://example.com/property-2'},
        {'title': 'Property 3', 'price': 150000, 'link': 'https://example.com/property-3'},
    ]
    with open('properties.csv', 'w', newline='') as file:
        writer = DictWriter(file, fieldnames=columns)
        writer.writeheader()
        writer.writerows(properties)
        
data_to_csv()