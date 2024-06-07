from requests_html import HTMLSession
from bs4 import BeautifulSoup
import re
from datetime import date
from csv import DictWriter

url='https://properties.commonbond.org/searchlisting.aspx?ftst=&txtCity=Minnesota&LocationGeoId=45'

today = date.today()
#print("Today's date:", today.strftime("%d-%m-%Y"))
def clean_price(price):
    # return as fload two decimal places
    return float(re.sub('[^0-9.]', '', price))
#print(clean_price('€ 5631.00 Kshshs'))
session = HTMLSession()
def getdata(url):
    r = session.get(url)
    r.html.render(timeout=20) #prevent being blocked by host
    soup = BeautifulSoup(r.html.html, 'html.parser')
    print("soup generated successfully HTTPResponse 200")
    return soup


def getCommunityBondProperties():
    soup = getdata(url)
    print(soup)
    properties = soup.find_all('div', {'class': 'parameters hidden mapPoint'})
    # Print the number of properties found
    print(f"Number of properties found: {len(properties)}\n")
    for property in properties:
        property_lat = property.find('span', {'class': 'propertyLat'}).text
        property_lng = property.find('span', {'class': 'propertyLng'}).text
        property_address = property.find('span', {'class': 'propertyAddress'}).text
        property_short_name = property.find('span', {'class': 'propertyShortName'}).text
        property_name = property.find('span', {'class': 'propertyName'}).text
        property_min_rent = property.find('span', {'class': 'propertyMinRent'}).text
        point_id = property.find('span', {'class': 'pointId'}).text
        enable_featured_prop = property.find('span', {'class': 'enableFeaturedProp'}).text
        is_featured_prop = property.find('span', {'class': 'isFeaturedProp'}).text
        prop_color = property.find('span', {'class': 'propColor'}).text
        favorite_prop_color = property.find('span', {'class': 'favoritePropColor'}).text
        featured_favorite_prop_color = property.find('span', {'class': 'featuredFavoritePropColor'}).text
        featured_prop_color = property.find('span', {'class': 'featuredPropColor'}).text
        
        print(f"Latitude: {property_lat}")
        print(f"Longitude: {property_lng}")
        print(f"Address: {property_address}")
        print(f"Short Name: {property_short_name}")
        print(f"Name: {property_name}")
        print(f"Min Rent: {property_min_rent}")
        print(f"Point ID: {point_id}")
        print(f"Enable Featured Property: {enable_featured_prop}")
        print(f"Is Featured Property: {is_featured_prop}")
        print(f"Property Color: {prop_color}")
        print(f"Favorite Property Color: {favorite_prop_color}")
        print(f"Featured Favorite Property Color: {featured_favorite_prop_color}")
        print(f"Featured Property Color: {featured_prop_color}")
        print("---------------------------------------------------------------\n")
    return

getCommunityBondProperties()

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
        
#data_to_csv()
print('Done')