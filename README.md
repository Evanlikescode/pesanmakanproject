
# PesanmakanProject API

The main idea of this project is to provide a marketplace API system that focuses on food commerce. The project was designed for both users and sellers, allowing for interactive engagement in commerce.

## API Reference
Below are some examples of the API routes that can be used from the project
#### Users

```http
  POST /signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullname` | `string` | **Required**. User fullname |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |


```http
  PUT /profile
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fullname` | `string` | **Required**. User fullname |


```http
  PUT /password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `old_password` | `string` | **Required**. User current password |
| `new_password` | `string` | **Required**. User new password |
| `confirm_password` | `string` | **Required**. User new password |


#### Sellers

```http
  POST /seller/signup 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `seller_name` | `string` | **Required**. Seller fullname |
| `email` | `string` | **Required**. Seller email |
| `password` | `string` | **Required**. Seller password |


```http
  PUT /seller/profile
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `seller_name` | `string` | **Required**. Seller username |


```http
  PUT /seller/password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `old_password` | `string` | **Required**. Seller current password |
| `new_password` | `string` | **Required**. Seller new password |
| `confirm_password` | `string` | **Required**. Seller new password |




#### Product

```http
  POST /product (sellers only)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_name` | `string` | **Required**. Product name |
| `product_desc` | `string` | **Optional**. Product description |
| `product_image` | `string` | **Optional**. Product image |
| `product_price` | `integer` | **Required**. Product price |
| `product_available` | `integer` | **Required**. Availability of the product |


```http
  GET /product/<id_seller> 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_seller` | `string` | **Required**. Seller id |



```http
  PUT /product/<id_product> (sellers only)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_product` | `integer` | **Required**. Product id that has been provided from the seller id |
| `product_name` | `string` | **Required**. Product name |
| `product_desc` | `string` | **Optional**. Product description |
| `product_image` | `string` | **Optional**. Product image |
| `product_price` | `integer` | **Required**. Product price |
| `product_available` | `integer` | **Required**. Availability of the product |


```http
  DELETE /product/<id_product> (sellers only)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_product` | `string` | **Required**. Product id |




#### Payment

```http
  POST /payment 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_id` | `integer` | **Required**. Product id |
| `total_items` | `integer` | **Required**. Total items of products |
| `total_payments` | `integer` | **Required**. Total prices |
| `seller_id` | `string` | **Required**. Seller id from the product that was chosed by the users |


```http
  PUT /payment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `payment_id` | `integer` | **Required**. Payment id |
| `seller_id` | `string` | **Required**.  Seller id from the product that was chosed by the users|
| `product_id` | `string` | **Required**.  Product id|

```http
  DELETE /payment
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `payment_id` | `integer` | **Required**. Payment id |
| `seller_id` | `string` | **Required**.  Seller id from the product that was chosed by the users|
| `product_id` | `string` | **Required**.  Product id|


## Authors

- [@Evanlikescode](https://www.github.com/Evanlikescode)

