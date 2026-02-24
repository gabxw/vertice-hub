import requests
import json

API_KEY = "CJ5013914@api@086dfe67b50f4a1ca1ce0255e2557fe1"
BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1"

def get_access_token():
    url = f"{BASE_URL}/authentication/getAccessToken"
    response = requests.post(url, json={"apiKey": API_KEY})
    data = response.json()
    if data.get("result"):
        return data["data"]["accessToken"]
    return None

def get_products(token, keyword, page=1, size=10):
    url = f"{BASE_URL}/product/listV2"
    headers = {"CJ-Access-Token": token}
    params = {
        "page": page,
        "size": size,
        "keyWord": keyword
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

def main():
    print("Obtendo Access Token...")
    token = get_access_token()
    if not token:
        print("Erro ao obter token")
        return
    
    print(f"Token obtido com sucesso!")
    
    # Buscar diferentes categorias de produtos streetwear
    categories = ["hoodie", "cargo pants", "sneakers", "t-shirt streetwear", "jogger pants"]
    
    all_products = []
    
    for keyword in categories:
        print(f"\nBuscando: {keyword}")
        result = get_products(token, keyword, page=1, size=5)
        
        if result.get("result") and result.get("data"):
            products = result["data"].get("content", [])
            for item in products:
                product_list = item.get("productList", [])
                for product in product_list:
                    all_products.append({
                        "id": product.get("id"),
                        "name": product.get("nameEn"),
                        "sku": product.get("sku"),
                        "price": product.get("sellPrice"),
                        "image": product.get("bigImage"),
                        "inventory": product.get("warehouseInventoryNum"),
                        "category": keyword
                    })
                    print(f"  - {product.get('nameEn')}: ${product.get('sellPrice')}")
    
    # Salvar produtos em arquivo JSON
    with open("cj_products_sample.json", "w") as f:
        json.dump(all_products, f, indent=2)
    
    print(f"\n\nTotal de produtos encontrados: {len(all_products)}")
    print("Produtos salvos em cj_products_sample.json")

if __name__ == "__main__":
    main()
