import requests
import json
import time
import uuid
from datetime import datetime
import unicodedata
import re

# Configuracoes do Supabase
SUPABASE_URL = "https://pwtwnypkbxcuorqtkksn.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHdueXBrYnhjdW9ycXRra3NuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTgzMzE2OCwiZXhwIjoyMDgxNDA5MTY4fQ.54WyTK6SmdTdcO5z2P1vIEJdHuJ84ijWdxZQJlgb3pg"

# CJ Dropshipping
CJ_TOKEN = "API@CJ5013914@CJ:eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzMTMwMiIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJzdWIiOiJicUxvYnFRMGxtTm55UXB4UFdMWnlraGVDbDJhVlliZHR1d0xmUlBqMDNvYVlDcFp5cXRBcCt3RSt4SXVPSmZzMFVNTVJEMjNrY1JUeWJsWDlvekorcGpRQ1plWUcya1AwWlRTeGhKZlp5NWl2ZWVOYk1Xd1hFTlB5bWFVejhWcW4vLzdNQ3krU004bFlrWDdkNlhwdXJBY0UxaE5EMnZGQkU2MGhOY29uV1RBSGtUS0FlUWVNLzYwanR4N2UwY0EwOVpFWml4WmJ2WENtQ3ZFVWsreWJlZHZxWjdlQTlCRDRFM1hTMDRKSitrS05FYXNVRkg0aUpuODdKYWM2ZWZwL2FXcTM4amtUREJOSlA5VVdyK2d6QlhLSXhyUkVEVkx1VFY1aTc5ODBlMzFKUG1nV2d6MDdvYjhFbGtlUGhsUzF0ZXIwQ2phUTJJVlBOK3pkNlcyWHc9PSIsImlhdCI6MTc2NjQxMzQ4Mn0.wsywvEct0PGnH6yIK3rbTmdecp6FPqvPZd2Uy6oSuZU"
CJ_BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1"

USD_TO_BRL = 5.0
PROFIT_MARGIN = 2.5

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def slugify(text):
    text = unicodedata.normalize('NFD', text.lower())
    text = re.sub(r'[\u0300-\u036f]', '', text)
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]', '', text)
    text = re.sub(r'\-+', '-', text)
    return text.strip('-')

def convert_price(usd_price):
    price = float(str(usd_price).split(' -- ')[0])
    brl_price = price * USD_TO_BRL * PROFIT_MARGIN
    return round((brl_price // 10 + 1) * 10 - 0.10, 2)

def get_categories():
    response = requests.get(f"{SUPABASE_URL}/rest/v1/categories", headers=headers)
    return {cat['slug']: cat['id'] for cat in response.json()}

def get_cj_products(keyword, size=4):
    response = requests.get(
        f"{CJ_BASE_URL}/product/listV2",
        headers={"CJ-Access-Token": CJ_TOKEN},
        params={"keyWord": keyword, "page": 1, "size": size}
    )
    data = response.json()
    if data.get("result") and data.get("data"):
        products = []
        for item in data["data"].get("content", []):
            products.extend(item.get("productList", []))
        return products
    return []

def create_supplier():
    response = requests.get(
        f"{SUPABASE_URL}/rest/v1/suppliers?name=eq.CJ%20Dropshipping",
        headers=headers
    )
    existing = response.json()
    if existing:
        return existing[0]['id']
    
    supplier_id = str(uuid.uuid4())
    requests.post(
        f"{SUPABASE_URL}/rest/v1/suppliers",
        headers=headers,
        json={"id": supplier_id, "name": "CJ Dropshipping", "website": "https://cjdropshipping.com", "isActive": True}
    )
    return supplier_id

def product_exists(slug):
    response = requests.get(f"{SUPABASE_URL}/rest/v1/products?slug=eq.{slug}", headers=headers)
    return len(response.json()) > 0

def create_product(product_data, category_id, supplier_id, cj_sku):
    product_id = str(uuid.uuid4())
    
    response = requests.post(
        f"{SUPABASE_URL}/rest/v1/products",
        headers=headers,
        json={
            "id": product_id,
            "name": product_data["name"],
            "slug": product_data["slug"],
            "description": product_data["description"],
            "story": product_data["story"],
            "price": product_data["price"],
            "originalPrice": product_data["originalPrice"],
            "categoryId": category_id,
            "supplierId": supplier_id,
            "rating": product_data["rating"],
            "reviewCount": product_data["reviewCount"],
            "isNew": product_data["isNew"],
            "isBestSeller": product_data["isBestSeller"],
            "isActive": True,
            "updatedAt": datetime.utcnow().isoformat()
        }
    )
    
    if response.status_code not in [200, 201]:
        print(f"Erro ao criar produto: {response.text}")
        return None
    
    requests.post(f"{SUPABASE_URL}/rest/v1/product_images", headers=headers,
        json={"id": str(uuid.uuid4()), "productId": product_id, "url": product_data["image"], "alt": product_data["name"], "order": 0})
    
    for size in ['P', 'M', 'G']:
        requests.post(f"{SUPABASE_URL}/rest/v1/product_variants", headers=headers,
            json={"id": str(uuid.uuid4()), "productId": product_id, "size": size, "colorName": "Preto", "colorHex": "#000000", "sku": f"{cj_sku}-{size}-PR", "stock": 25})
    
    for tag in ['Streetwear', 'Urbano', 'Exclusivo']:
        requests.post(f"{SUPABASE_URL}/rest/v1/product_tags", headers=headers,
            json={"id": str(uuid.uuid4()), "productId": product_id, "name": tag})
    
    return product_id

def translate_name(name):
    translations = {'hoodie': 'Moletom', 'sweatshirt': 'Moletom', 't-shirt': 'Camiseta', 'cargo': 'Cargo', 'jogger': 'Jogger', 'pants': 'Calca', 'oversized': 'Oversized', 'streetwear': 'Streetwear'}
    result = name
    for en, pt in translations.items():
        result = result.replace(en.lower(), pt).replace(en.upper(), pt).replace(en.capitalize(), pt)
    return result

print("Iniciando importacao de produtos da CJ Dropshipping...")

categories = get_categories()
print(f"Categorias: {list(categories.keys())}")

supplier_id = create_supplier()
print(f"Fornecedor ID: {supplier_id}")

keywords = [("hoodie streetwear", "blusas"), ("oversized t-shirt men", "blusas"), ("cargo pants streetwear", "calcas"), ("jogger pants men", "calcas")]

imported = 0

for keyword, cat_slug in keywords:
    print(f"\nBuscando: {keyword}")
    
    if cat_slug not in categories:
        print(f"Categoria {cat_slug} nao encontrada")
        continue
    
    category_id = categories[cat_slug]
    
    try:
        products = get_cj_products(keyword, 3)
        print(f"Encontrados: {len(products)} produtos")
        
        for cj_product in products:
            slug = slugify(cj_product['nameEn'])
            
            if product_exists(slug):
                for i in range(1, 10):
                    new_slug = f"{slug}-{i}"
                    if not product_exists(new_slug):
                        slug = new_slug
                        break
                else:
                    print(f"  Pulando: {cj_product['nameEn'][:30]}... (ja existe)")
                    continue
            
            price = convert_price(cj_product['sellPrice'])
            original_price = round((price * 1.3 // 10 + 1) * 10 - 0.10, 2)
            
            product_data = {
                "name": translate_name(cj_product['nameEn']),
                "slug": slug,
                "description": "Peca exclusiva da colecao Vertice. Design moderno e materiais de alta qualidade.",
                "story": "Uma peca que representa a essencia da Vertice: autenticidade, qualidade e estilo urbano.",
                "price": price,
                "originalPrice": original_price,
                "image": cj_product['bigImage'],
                "rating": round(4.5 + (hash(slug) % 5) / 10, 1),
                "reviewCount": 50 + (hash(slug) % 150),
                "isNew": hash(slug) % 2 == 0,
                "isBestSeller": hash(slug) % 3 == 0,
            }
            
            result = create_product(product_data, category_id, supplier_id, cj_product['sku'])
            
            if result:
                imported += 1
                print(f"  OK: {product_data['name'][:40]}... - R$ {price}")
            
            time.sleep(1.2)
            
    except Exception as e:
        print(f"  Erro: {e}")

print(f"\nImportacao concluida! {imported} produtos importados.")
