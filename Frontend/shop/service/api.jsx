import axios from "axios";

const client = axios.create({
  baseURL: "https://my-shop-041r.onrender.com/api/"
})

export async function getProducts() {
  const { data } = await client('products/')
  return data;
}

export async function getProduct(id) {
  const { data } = await client(`/products/${id}`)
  return data;
}

export async function HasAccount(email) {
  const { data: res } = await client.post(`/authenticate/`, email, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res;
}

export async function password(data) {
  const { data: res } = await client.post(`/password/`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res;
}

export async function getInfo(token) {
  const { data: res } = await client.get('/user/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return res;
}

export async function editInfo(dataa, token) {
  const { data: res } = await client.post('/user/', dataa, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return res;
}

export async function getCartItem(token) {
  const { data: res } = await client.get('/cart/', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return res;
}

export async function AddCartItem(token, id, qty) {
  const { data: res } = await client.post('/cart/', {
    'product': id,
    'qty': qty
  } , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return res;
}

export async function DeleteCartItem(token, id) {
  const { data: res } = await client.delete(`/cart/delete/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return res;
}
