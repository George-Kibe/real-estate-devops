import httpx
from selectolax.parser import HTMLParser
import json
from rich import print

def get_html(client: httpx.Client, url: str) -> str:
    response = client.get(url)
    response.raise_for_status()
    html = HTMLParser(response.text)
    return html

def parse_search_page(html: HTMLParser):
    product_links = []
    for link in html.css("li a.product-link"):
        product_links.append(link.attributes["href"])
    return product_links

def main():
    client= httpx.Client(
        proxy='http://4803c1bn1w23ogz-country-gb:pi1i619o9af2b4z@rp.proxyscrape.com:6060'
    )
    client.headers.update({"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"})
    link = 'https://www.alpinetrek.co.uk/outdoor-clothing/for--men/1/'
    html = get_html(client, link)
    product_links = parse_search_page(html)
    print(product_links)
    print(len(product_links))

if __name__ == "__main__":
    main()
