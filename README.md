# 🧾 Cadastro de Pessoas

Aplicação desenvolvida em **Angular 18** para gerenciamento de pessoas, com recursos de **cadastro, edição, listagem com filtros, paginação e exclusão**.  
Conta com uma interface moderna, responsiva e acessível, construída com **Angular Material**, **Angular Signals** e boas práticas de arquitetura e reatividade.

![image](https://github.com/user-attachments/assets/4e5007f0-7903-4070-91da-da8b761bb619)

![image](https://github.com/user-attachments/assets/e312cbd4-9486-4379-8a7e-5fc864c4323b)

![image](https://github.com/user-attachments/assets/e888894f-6e7b-4bb9-b5de-f55f612803d2)

![image](https://github.com/user-attachments/assets/a76f4d5c-d809-4d32-b9f8-2d77dbfffb39)

![image](https://github.com/user-attachments/assets/221235e6-0b15-4bc0-9507-ab2afd1a1d4c)

## 🚀 Tecnologias Utilizadas

- **Angular 18.2.18.**
- **Angular Material**
- **Angular Signals**
- **RxJS (Observables)** para consumo da API
- **ngMask** para máscaras em campos de formulário
- **TypeScript, SCSS e HTML5**
- **Tokens do Angular Material** para configuração global de UI

## ✨ Funcionalidades

- ✅ **Cadastro** de novas pessoas
- ✅ **Edição** de dados
- ✅ **Listagem paginada** com filtros dinâmicos
- ✅ **Exclusão** de registros com confirmação
- ✅ Máscaras para telefone e data de nascimento
- ✅ Diálogos reutilizáveis com feedbacks amigáveis
- ✅ Uso de **tokens do Angular Material** para customização de temas e comportamentos globais

## 🔍 Filtros e Paginação

A tela de listagem permite:

- 🔎 **Filtrar por nome e ordenar**
- 📄 **Paginar os resultados** por página, com controle de quantidade de itens
- ♻️ Atualização automática da lista a partir de observables

## 🌐 Integração com API

A aplicação consome uma API pública REST:

- **Base URL:** `https://dev-api-plt.4asset.net.br/exam/v1/persons`  

Formato do retorno da API:
```json
{
  "results": [ ... ],
  "page": 1,
  "limit": 10,
  "count": 25
}
