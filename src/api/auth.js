import { API_HOST } from "../utils/constants";

export async function postLogin(email, password) {
    
  const data = {
    email: email,
    password: password,
  };
  console.log(data);
  try {
    const url = `${API_HOST}/login/monitoreo`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    const result = await response.json();
    return result;
  } catch (error) {}
}
export const user = {
  username: "sebastian",
  password: "1234"
};

export const userDetails = {
  username: "sebastian",
  firstName: "sebastian",
  lastName: "Alarez",
  email:"xAgustin93@gmail.com"
}
