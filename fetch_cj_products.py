import json
import os
import requests

API_KEY = os.getenv("CJ_API_KEY", "").strip()
BASE_URL = "https://developers.cjdropshipping.com/api2.0/v1"


def get_access_token():
    if not API_KEY:
        raise RuntimeError("CJ_API_KEY nao definido no ambiente.")

    url = f"{BASE_URL}/authentication/getAccessToken"
    response = requests.post(url, json={"apiKey": API_KEY}, timeout=30)
    response.raise_for_status()
    data = response.json()

    if data.get("result"):
        return data["data"]["accessToken"]

    raise RuntimeError(f"Falha ao obter token: {data.get('message', 'erro desconhecido')}")


def get_products(token, keyword, page=1, size=10):
    url = f"{BASE_URL}/product/listV2"
    headers = {"CJ-Access-Token": token}
    params = {
        "page": page,
        "size": size,
        "keyWord": keyword,
    }
    response = requests.get(url, headers=headers, params=params, timeout=30)
    response.raise_for_status()
    return response.json()


def main():
    print("Obtendo access token...")
    try:
        token = get_access_token()
    except Exception as exc:
        print(f"Erro ao obter token: {exc}")
        return

    print("Token obtido com sucesso.")

    categories = ["hoodie", "cargo pants", "sneakers", "t-shirt streetwear", "jogger pants"]
    all_products = []

    for keyword in categories:
        print(f"\nBuscando: {keyword}")
        result = get_products(token, keyword, page=1, size=5)

        if result.get("result") and result.get("data"):
            products = result["data"].get("content", [])
            for item in products:
                for product in item.get("productList", []):
                    all_products.append(
                        {
                            "id": product.get("id"),
                            "name": product.get("nameEn"),
                            "sku": product.get("sku"),
                            "price": product.get("sellPrice"),
                            "image": product.get("bigImage"),
                            "inventory": product.get("warehouseInventoryNum"),
                            "category": keyword,
                        }
                    )
                    print(f"  - {product.get('nameEn')}: ${product.get('sellPrice')}")

    with open("cj_products_sample.json", "w", encoding="utf-8") as file:
        json.dump(all_products, file, indent=2, ensure_ascii=False)

    print(f"\nTotal de produtos encontrados: {len(all_products)}")
    print("Produtos salvos em cj_products_sample.json")


if __name__ == "__main__":
    main()
