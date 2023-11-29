export async function login(user: { email: string; password: string }) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  console.log("api_url", api_url);

  return fetch(`${api_url}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  //   const data = await response.json();
  //   return data;
}

export async function register(user: {
  email: string;
  password: string;
  home_location: [Number, Number];
}) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${api_url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export type TransactionPost = {
  price: number;
  location: [number, number];
  retailer: string;
  used_chip: boolean;
  used_pin_number: boolean;
  online_order: boolean;
  user_id: number;
};

//
// {
//   "price": 0,
//   "location": "string",
//   "retailer": "string",
//   "used_chip": true,
//   "used_pin_number": true,
//   "online_order": true,
//   "user_id": 0,
//   "id": 0,
//   "distance_from_home": 0,
//   "repeat_retailer": true,
//   "distance_from_last_transaction": 0,
//   "ratio_to_median_purchase_price": 0,
//   "fraud": true
// }

export type TransactionGet = {
  price: number;
  location: "string";
  retailer: string;
  used_chip: boolean;
  used_pin_number: boolean;
  online_order: boolean;
  user_id: number;
  id: number;
  distance_from_home: number;
  repeat_retailer: boolean;
  distance_from_last_transaction: number;
  ratio_to_median_purchase_price: number;
  fraud: boolean;
};

export async function newTransaction(t: TransactionPost) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${api_url}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(t),
  });
}

export async function getUserTransactions(user_id: number) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${api_url}/transactions/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
