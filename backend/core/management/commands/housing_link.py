import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from core.models import Property
import re

def convert_to_integer(s):
    # Use regular expressions to find the first numeric part of the string
    match = re.search(r'\d+', s)
    
    if match:
        # Convert the matched numeric string to an integer
        result = int(match.group(0))
        return result
    else:
        return 0
def convert_to_img_string(string):
    if(string.startswith('http')):
        img_string = string
    else:
        img_string = 'https://www.housinglink.org/photos/' + string
    return img_string
# class Command(BaseCommand):
#     help = 'Your custom command help message'

#     def handle(self, *args, **options):
#         # Your command logic goes here
#         self.stdout.write(self.style.SUCCESS('Successfully ran your custom command'))

class Command(BaseCommand):
    help = 'Fetch properties from the API and save them to the database'
    
    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Fetching Your API'))
        url = 'https://www.housinglink.org/hlistlogin/services/ListingSearch.asmx/GetSearchResults' 
        # Replace with your actual API endpoint
        
        for i in range(1, 32):
            payload = {
                "searchText": "Minneapolis, MN, USA",
                "selections": {
                    "Distance": 10,
                    "Bedrooms": "",
                    "UnitTypeList": "",
                    "Accessibilities": "",
                    "Amenities": "",
                    "ListingTypes": "",
                    "Bathrooms": "",
                    "Pets": "",
                    "Crises": "-1",
                    "Programs": "",
                    "ControlUseType": "1",
                    "SortBy": "Distance",
                    "SortDirection": "ASC",
                    "IPAddress": "105.29.165.227",
                    "SessionID": "wkv3enrfz3dssrxfvoa3whob",
                    "UserID": "",
                    "MapSelections": {},
                    "SearchGeocodeResults": {
                    "searchText": "Minneapolis, MN, USA",
                    "CenterLatitude": "44.97775",
                    "CenterLongitude": "-93.26501",
                    "CityNameCriteria": "Minneapolis",
                    "CountyNameCriteria": "",
                    "StateAbbrCriteria": "MN",
                    "ZipCodeCriteria": ""
                    }
                },
                "pageIndex": i, # i works as page index
                "pageSize": "25",
                "countOnly": "false",
                "searchId": "13745340"
                }

            
            response = requests.post(url, json=payload)
            data = response.json()['d']['SearchResultRows']
        
            for item in data:
                # Extract the HTML fields and transform the contents using BeautifulSoup
                notes_display_html = BeautifulSoup(item['NotesDisplay'], 'html.parser').text
                photo_image_html = BeautifulSoup(item['PhotoImageHTML'], 'html.parser').text
                property_detail_link_html = BeautifulSoup(item['PropertyDetailLinkHTML'], 'html.parser').text
                listing_phone_number_html = BeautifulSoup(item['ListingPhoneNumberHTML'], 'html.parser').text
                email_listing_html = BeautifulSoup(item['EmailListingHTML'], 'html.parser').text
                apply_online_html = BeautifulSoup(item['ApplyOnlineHTML'], 'html.parser').text
                detail_link = BeautifulSoup(item['DetailLink'], 'html.parser').text

                # Save the property data
                Property.objects.update_or_create(
                    title=item['PropertyName'],
                    link=item['DetailLink'],  # Assuming DetailLink is the link to the property
                    defaults={
                        'description': notes_display_html,
                        'city': item['CityName'],
                        'property_detail_link':property_detail_link_html,
                        'details_link': detail_link,
                        'email_listing':email_listing_html,
                        'phone_number': listing_phone_number_html,
                        'postal_code': item['AddressZipCode'],
                        'application_link': apply_online_html,
                        'street_address': item['ListingAddress'],
                        'price': convert_to_integer(item['Rent']), #.replace('$', ''),
                        'bedrooms': item['NumberBedrooms'],
                        'bathrooms': float(item['NumberBathrooms'].replace('+', '')),
                        'advert_type': "FOR RENT",  # Default value, update if actual data is available
                        'property_type': item['UnitType'],
                        'images': [convert_to_img_string(item['TopPhoto']), convert_to_img_string(photo_image_html)],  # Assuming TopPhoto is the main image
                    }
                )
            print("Done for page Number: ", i)
            self.stdout.write(self.style.SUCCESS('Successfully fetched and saved properties for page Number'))
