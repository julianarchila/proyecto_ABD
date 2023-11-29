// create a correct type for user
export type User = {
  email: string;
  password: string;
  home_location: string;
  median_purchase_price: number;
  transactions_count: number;
  id: number;
};

export function logout() {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.removeItem("user");
}

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export function saveUser(user: User) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("user", JSON.stringify(user));
}
