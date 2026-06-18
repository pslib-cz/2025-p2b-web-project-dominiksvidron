import requests
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def get_wiki_image(query):
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={query}&prop=pageimages&format=json&pithumbsize=800"
    try:
        res = requests.get(url, headers=headers).json()
        pages = res['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                return pages[page_id]['thumbnail']['source']
    except Exception as e:
        pass
    return "No image found"

print("Air_Jordan_1:", get_wiki_image("Air_Jordan"))
print("Adidas_Yeezy:", get_wiki_image("Adidas_Yeezy"))
print("Nike_Dunk:", get_wiki_image("Nike_Dunk"))
print("Nike_Air_Max:", get_wiki_image("Nike_Air_Max"))
print("Vans:", get_wiki_image("Vans"))
