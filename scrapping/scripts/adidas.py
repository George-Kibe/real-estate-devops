from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
import json

def get_product_data(driver, productId: str):
    driver.get(f'https://www.adidas.co.uk/{productId}.html')
    script_tag = driver.find_element(By.CSS_SELECTOR, 'div#consent_blackbar+script+script')
    print("Script tag: ", script_tag)
    product_info = json.loads(script_tag.get_attribute('innerHTML')).replace('window.REACT_QUERY_DATA', '')
    print("Product info: ", product_info)
    model_number = product_info['queries'][0]['state']['data']['model_number']
    print(model_number)
    return model_number

def get_review_data(driver, productId: str):
    driver.get(f'{productId}.html')
    pass

def main():
    options = Options()
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    products = ['HP7388']
    
    for product in products:
        model_number = get_product_data(driver, product)
        print(model_number)
    #driver.quit()

if __name__ == '__main__':
    main()