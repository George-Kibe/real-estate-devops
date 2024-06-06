from requests_html import HTMLSession
from bs4 import BeautifulSoup

urls = [
    'https://properties.commonbond.org/searchlisting.aspx?ftst=&txtCity=Minneapolis',
    'https://www.apartments.com/miami-beach-fl/2/'
]

session = HTMLSession()

def getdata(url):
    r = session.get(url)
    r.html.render(timeout=20)  
    soup = BeautifulSoup(r.html.html, 'html.parser')
    print(soup.prettify())
    return soup

for url in urls:
    print("Fetching data for: ", url)
    r = session.get(url)
    print(r.html.find('title', first=True).text)
    #getdata(url)