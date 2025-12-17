# 🎉 Integração com PayPal - Guia Completo

Este documento detalha a implementação da integração com PayPal no e-commerce VÉRTICE, cobrindo back-end, front-end e fluxo de pagamento.

---

## ✅ Funcionalidades Implementadas

### **Back-end**

1.  **Configuração do PayPal SDK**
    -   SDK do PayPal (`@paypal/checkout-server-sdk`) instalado e configurado.
    -   Ambiente dinâmico (sandbox/produção) com base nas variáveis de ambiente.

2.  **Endpoints da API**
    -   `POST /api/v1/payments/paypal/create-order`
        -   Cria um pedido no PayPal e retorna um `approvalUrl`.
        -   Salva o `paypalOrderId` no banco de dados.
    -   `POST /api/v1/payments/paypal/capture-order`
        -   Captura o pagamento após aprovação do usuário.
        -   Atualiza o status do pedido para "PAID".
    -   `GET /api/v1/payments/paypal/order/:paypalOrderId`
        -   Busca o status de um pedido no PayPal.
    -   `POST /api/v1/payments/paypal/webhook`
        -   Recebe notificações do PayPal (pagamento confirmado, negado, reembolsado).

3.  **Serviço PayPal** (`paypal.service.ts`)
    -   `createOrder()`: Cria o pedido no PayPal.
    -   `captureOrder()`: Captura o pagamento.
    -   `getOrder()`: Busca detalhes do pedido.
    -   `refundCapture()`: Reembolsa um pagamento.

### **Front-end**

1.  **Botão de Pagamento PayPal**
    -   SDK do React (`@paypal/react-paypal-js`) instalado.
    -   Botão do PayPal integrado na página de checkout.
    -   Carrega dinamicamente com o `clientId` do PayPal.

2.  **Fluxo de Pagamento**
    -   **Passo 1:** Usuário preenche o endereço e clica em "Continuar para Pagamento".
    -   **Passo 2:** Um pedido é criado no banco de dados (status "PENDING").
    -   **Passo 3:** O botão do PayPal aparece.
    -   **Passo 4:** Ao clicar, o front-end chama a API para criar o pedido no PayPal.
    -   **Passo 5:** O usuário é redirecionado para o PayPal para aprovar o pagamento.
    -   **Passo 6:** Após aprovação, o front-end chama a API para capturar o pagamento.
    -   **Passo 7:** O carrinho é limpo e o usuário é redirecionado para a página de sucesso.

3.  **Páginas de Feedback**
    -   `/pagamento/sucesso`: Página de sucesso com detalhes do pedido.
    -   `/pagamento/cancelado`: Página de cancelamento caso o usuário desista.

---

## 🚀 Como Testar a Integração

### **Requisitos**

1.  **Conta de Sandbox do PayPal**
    -   Crie uma conta em: [https://developer.paypal.com/](https://developer.paypal.com/)
    -   Crie uma conta de teste (Business e Personal).

2.  **Credenciais de Teste**
    -   Suas credenciais de sandbox já estão configuradas.

### **Fluxo de Teste**

1.  **Inicie o projeto**
    ```bash
    # Terminal 1 - Backend
    cd apps/backend
    pnpm dev

    # Terminal 2 - Frontend
    cd apps/frontend
    pnpm dev
    ```

2.  **Adicione produtos ao carrinho**
    -   Acesse `http://localhost:5173`
    -   Adicione um ou mais produtos ao carrinho.

3.  **Vá para o Checkout**
    -   Abra o carrinho e clique em "Finalizar Compra".

4.  **Preencha o Endereço**
    -   Preencha todos os campos do formulário.

5.  **Continue para o Pagamento**
    -   Clique em "Continuar para Pagamento".
    -   O botão do PayPal deve aparecer.

6.  **Pague com PayPal**
    -   Clique no botão do PayPal.
    -   Uma janela pop-up do PayPal irá abrir.
    -   Faça login com sua **conta de teste pessoal** do PayPal.
    -   Aprove o pagamento.

7.  **Confirmação**
    -   Você será redirecionado para a página de sucesso (`/pagamento/sucesso`).
    -   O carrinho deve estar vazio.
    -   O pedido deve aparecer em "Meus Pedidos" com status "PAID".

### **Testar Cancelamento**

1.  Siga os passos 1-6.
2.  Na janela do PayPal, em vez de aprovar, feche a janela ou clique em "Cancelar e voltar para VÉRTICE".
3.  Você será redirecionado para a página de cancelamento (`/pagamento/cancelado`).
4.  O pedido no banco de dados continuará como "PENDING".

---

## 🔧 Configuração de Webhooks

Para que o sistema receba atualizações automáticas do PayPal (ex: reembolso), você precisa configurar um webhook.

1.  **Obtenha a URL do Webhook**
    -   Para testar localmente, use uma ferramenta como **ngrok** para expor seu servidor local:
        ```bash
        ngrok http 3000
        ```
    -   Copie a URL HTTPS fornecida (ex: `https://xxxx-xxxx.ngrok.io`).
    -   Sua URL de webhook será: `https://xxxx-xxxx.ngrok.io/api/v1/payments/paypal/webhook`

2.  **Crie o Webhook no PayPal**
    -   Vá para: [https://developer.paypal.com/developer/applications/](https://developer.paypal.com/developer/applications/)
    -   Selecione seu app.
    -   Role até "Webhooks" e clique em "Add Webhook".
    -   Cole a URL do ngrok.
    -   Selecione "All events".
    -   Salve.

3.  **Configure o Webhook ID**
    -   Copie o `Webhook ID` gerado pelo PayPal.
    -   Cole no arquivo `apps/backend/.env`:
        ```env
        PAYPAL_WEBHOOK_ID=WH-XXXXXXXXXXXXXXXXXXXXX
        ```

---

## 📊 Status Final

| Funcionalidade | Status |
|----------------|--------|
| ✅ Back-end SDK | 100% |
| ✅ Endpoints API | 100% |
| ✅ Front-end SDK | 100% |
| ✅ Botão PayPal | 100% |
| ✅ Fluxo de Pagamento | 100% |
| ✅ Páginas de Sucesso/Erro | 100% |
| ⏳ Webhooks | Requer configuração manual |

**A integração com PayPal está completa e pronta para testes!** 🚀
