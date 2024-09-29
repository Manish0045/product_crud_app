### live link for api
<link>https://product-crud-app-3f7k.onrender.com/</link>


### Create category first to add new products as the category id is required to add new product to identify and filter products

## Products Request routes
# /product 
- /products 
- /add
- /update
- /delete

# to get all products
example -
```sh
  https://product-crud-app-3f7k.onrender.com/product/products
```

#### The body to request 
{
  cateoryId: < Your category id >,
  name: < Your Product name >,
  price: < Your Product Price >,
  description: < Your Products Description >
}
