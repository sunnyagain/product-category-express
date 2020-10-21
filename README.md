# Example REST service with Product and Category Backed by Express & mongo
---
The Task is Building a RESTful APIs from scratch using Express - Node.js.

- [X] The Entities are a “Categories” and “Products”.
- [X] Category can have multiple child categories.
- [X] Child category can have further child categories.
- [X] Category can have multiple products and product can have a multiple categories.
- [X] The Entities must get saved in MongoDb and be retrieved via POST and GET Methods respectively.


[![deepcode](https://www.deepcode.ai/api/gh/badge?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybTEiOiJnaCIsIm93bmVyMSI6InN1bm55YWdhaW4iLCJyZXBvMSI6InByb2R1Y3QtY2F0ZWdvcnktZXhwcmVzcyIsImluY2x1ZGVMaW50IjpmYWxzZSwiYXV0aG9ySWQiOjIzOTk0LCJpYXQiOjE2MDMyNTU4MzR9.hQ-_Ihpvv1jaQLY1VBGKV_1X7d1pdIwlHQmxjwVene0)](https://www.deepcode.ai/app/gh/sunnyagain/product-category-express/_/dashboard?utm_content=gh%2Fsunnyagain%2Fproduct-category-express)


## Required 

- You need to design a proper Mongodb data model and create APIs to
- [X] Add a category 
  
  Request
  
  ```https
  POST http://localhost:3000/categories/
  Content-Type: application/json

  {
      "Name": "Category {{$randomInt 0 1000}}",
      "Description": "test category description",
      "ParentCategory": {
          "_id": "5f8881e0a0a9797f277597f8"
      }
  }
  ```

- [X]  Add Product mapped to a category or categories.

  Request

  ```https
  POST http://localhost:3000/products/
  Content-type: application/json

  {
      "Name": "X Product {{$randomInt 0 1000}}",
      "Brand": "xyz",
      "Sku": "123",
      "Price": 1200,
      "Categories": [
          {
              "Name": "test category {{$randomInt 0 1000}}",
              "Description": "this is test category"
          },
          {
              "Name": "test category 11 {{$randomInt 0 1000}}",
              "Description": "this is test category"
          }
      ]
  }
  ```
- [X]  Get all categories with all its child categories mapped to it. Note : Each category object should look something like this {Id : 1 , child_categories: [], ...}

  Request
  
  ```https
  GET http://localhost:3000/categories/
  ```

- [x] Get all products by a category.

  Request

  ```https
  GET http://localhost:3000/products/?category[_id]=5f89299c4e29a3c1970bb9cf
  ```

- [X] Update product details (name,price,etc)

  Request

  ```https
  PUT http://localhost:3000/products/5f892b6bfedb75cf01460ca3
  Content-Type: application/json

  {
      "Name": "X Product v {{$randomInt 0 1000}}",
      "Brand": "xyz",
      "Sku": "123",
      "Price": 1200,
      "Categories": [
          {
              "Name": "test category x {{$randomInt 0 1000}}",
              "Description": "this is test category"
          },
          {
              "Name": "test category x update {{$randomInt 0 1000}}",
              "Description": "this is test category"
          }
      ]
  }
  ```

---

## Requests emulation

Use "REST Client" extension for VS Code to emulate request for development 

"Request.rest" File has implemented requests for quick start

https://github.com/Huachao/vscode-restclient


## Docker 

- docker-compose
  - docker-compose.yml file at root has development mongo instance listening on 27017
  - If using docker-compose you might need to stop local mongodb instance or change port 

## Development

- Clone this repo 
- Install dependencies by

  ```bash
  npm install
  ```

- Run service in development mode using nodemon watching for file changes

  ```bash
  npm run dev
  ```
