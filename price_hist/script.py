import bs4
import requests as r
from datetime import datetime
import time
import schedule
from pymongo import MongoClient

# MongoDB configuration
mongo_uri = "mongodb+srv://sakshathrai2004:CB2Cyo7yB226ttLT@kavach.9r1b9g5.mongodb.net/"  
database_name = "Kavach"
collection_name = "product_prices"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

product_list = ['B0B4SK9VX6', 'B0C3R5VWP3', 'B0BQJ9HZPP', 'B0BP2M7CCS']
base_url = 'https://www.amazon.in'
url = 'https://www.amazon.in/gp/product/'

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

def price_tracker():
    print(datetime.now())
    for prod in product_list:
        base_response = r.get(url + prod, headers=headers)
        cookies = base_response.cookies
        product_response = r.get(url + prod, headers=headers, cookies=cookies)
        soup = bs4.BeautifulSoup(product_response.text, features='lxml')

        # Look for the price by selecting the appropriate elements
        price_lines = soup.select('.a-offscreen')
        if price_lines:
            price = price_lines[0].get_text(strip=True)
            print(f"For Product url: {url + prod} price: {price}")

            # Store data in MongoDB
            data = {
                "timestamp": datetime.now(),
                "product_url": url + prod,
                "price": price
            }
            collection.insert_one(data)
            print("Data stored in MongoDB.")
        else:
            print("Price not found.")

# Run the job every 1 minute
schedule.every(1).minutes.do(price_tracker)

while True:
    schedule.run_pending()
    time.sleep(1)