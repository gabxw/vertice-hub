# Guia de Dropshipping para VÉRTICE

## O que é Dropshipping?

Dropshipping é um modelo de negócio onde você vende produtos sem mantê-los em estoque. Quando um cliente faz um pedido, você compra o produto de um fornecedor terceirizado que envia diretamente ao cliente.

## Como Funciona

1. **Cliente faz pedido** na sua loja (VÉRTICE)
2. **Você repassa o pedido** ao fornecedor dropshipping
3. **Fornecedor envia** o produto diretamente ao cliente
4. **Você lucra** com a diferença entre o preço de venda e o custo do fornecedor

## Fornecedores Recomendados para Moda Alternativa/Gótica no Brasil

### Nacionais
- **Racy Modas** - Moda feminina e masculina
- **Drop Make** - Diversos produtos de moda
- **Kaisan** - Roupas e acessórios
- **Mais Que Distribuidora** - Variedade de produtos
- **Sacoleiras Atacadão** - Moda popular

### Internacionais (com foco em moda alternativa)
- **Trendsi** - Fashion dropshipping com API
- **CJ Dropshipping** - Variedade de produtos, incluindo moda
- **Spocket** - Fornecedores com envio rápido
- **BrandsGateway** - Marcas de luxo e fashion

## Como Calcular Margem de Lucro

### Fórmula Básica

```
Margem de Lucro (%) = ((Preço de Venda - Custo Total) / Preço de Venda) × 100
```

### Componentes do Custo Total

1. **Custo do Produto** (preço do fornecedor)
2. **Frete** (se não for incluído)
3. **Taxas de Pagamento** (2-5% do valor da venda)
4. **Taxas de Plataforma** (se aplicável)
5. **Marketing** (custo por aquisição - CPA)
6. **Impostos** (se aplicável)

### Exemplo Prático

**Produto:** Camiseta Gótica

- **Preço do Fornecedor:** R$ 40,00
- **Frete:** R$ 15,00
- **Taxa de Pagamento (3%):** R$ 3,00
- **Marketing (CPA):** R$ 20,00
- **Custo Total:** R$ 78,00

**Preço de Venda:** R$ 120,00

**Margem de Lucro:**
```
((120 - 78) / 120) × 100 = 35%
```

**Lucro Líquido:** R$ 42,00 por venda

## Margens Recomendadas por Tipo de Produto

| Tipo de Produto | Margem Recomendada |
|-----------------|-------------------|
| Camisetas básicas | 30-40% |
| Moletons/Hoodies | 35-50% |
| Acessórios | 40-60% |
| Calças/Jeans | 30-45% |
| Tênis | 25-35% |
| Produtos premium | 50-70% |

## Implementação no Sistema VÉRTICE

### 1. Integração com API de Fornecedor

```typescript
// Exemplo de integração
interface DropshippingProduct {
  supplierId: string;
  supplierProductId: string;
  supplierPrice: number;
  shippingCost: number;
  processingTime: string;
}

// Adicionar campos ao modelo de produto
interface Product {
  // ... campos existentes
  dropshipping?: DropshippingProduct;
  costPrice: number; // Custo do fornecedor
  suggestedPrice: number; // Preço sugerido com margem
  profitMargin: number; // Margem de lucro em %
}
```

### 2. Calculadora de Margem

```typescript
function calculateProfitMargin(
  costPrice: number,
  shippingCost: number,
  sellingPrice: number,
  paymentFee: number = 0.03, // 3%
  marketingCost: number = 0
): {
  margin: number;
  profit: number;
  totalCost: number;
} {
  const paymentFeeAmount = sellingPrice * paymentFee;
  const totalCost = costPrice + shippingCost + paymentFeeAmount + marketingCost;
  const profit = sellingPrice - totalCost;
  const margin = (profit / sellingPrice) * 100;

  return {
    margin: Math.round(margin * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
  };
}

// Exemplo de uso
const result = calculateProfitMargin(40, 15, 120, 0.03, 20);
console.log(`Margem: ${result.margin}%`);
console.log(`Lucro: R$ ${result.profit}`);
```

### 3. Sugestão de Preço Automático

```typescript
function suggestSellingPrice(
  costPrice: number,
  shippingCost: number,
  targetMargin: number = 35, // 35% de margem alvo
  marketingCost: number = 20
): number {
  const paymentFee = 0.03;
  
  // Fórmula: Preço = (Custo Total) / (1 - Margem - Taxa)
  const totalCost = costPrice + shippingCost + marketingCost;
  const sellingPrice = totalCost / (1 - (targetMargin / 100) - paymentFee);
  
  // Arredondar para .99
  return Math.ceil(sellingPrice) - 0.01;
}

// Exemplo
const suggestedPrice = suggestSellingPrice(40, 15, 35, 20);
console.log(`Preço sugerido: R$ ${suggestedPrice}`); // R$ 129.99
```

## Próximos Passos

1. **Escolher Fornecedor:** Pesquisar e testar fornecedores que tenham produtos de estilo alternativo/gótico
2. **Negociar Preços:** Contatar fornecedores para obter melhores preços em volume
3. **Integrar API:** Se o fornecedor tiver API, integrar ao sistema para automação
4. **Cadastrar Produtos:** Adicionar produtos com informações de custo e margem
5. **Testar Processo:** Fazer pedidos teste para validar fluxo
6. **Automatizar:** Criar sistema de repasse automático de pedidos ao fornecedor

## Recomendações

- **Margem mínima:** Manter pelo menos 25% de margem para cobrir custos operacionais
- **Produtos de teste:** Começar com 10-20 produtos para testar aceitação
- **Qualidade:** Sempre pedir amostras antes de vender
- **Transparência:** Informar prazos de entrega realistas (dropshipping pode demorar mais)
- **Atendimento:** Ter suporte rápido para resolver problemas de entrega

## Fornecedores para Contatar

1. **Trendsi** - https://www.trendsi.com/ (tem API)
2. **CJ Dropshipping** - https://cjdropshipping.com/
3. **Racy Modas** - Contato direto via WhatsApp
4. **Kaisan** - Fornecedor nacional

## Observações Importantes

- **Prazo de Entrega:** Dropshipping nacional: 7-15 dias / Internacional: 15-45 dias
- **Qualidade:** Sempre validar qualidade antes de vender em escala
- **Estoque:** Verificar disponibilidade com fornecedor antes de confirmar venda
- **Devolução:** Ter política clara de devolução (pode ser mais complexo com dropshipping)
