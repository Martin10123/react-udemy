export const initialState = {
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  status: "checking", // "checking, "authenticated"
  uid: null,
};

export const authenticatedState = {
  displayName: "Martin Demo",
  email: "martin@gmail.com",
  errorMessage: null,
  photoURL: "https://demo.jpg",
  status: "authenticated", // "checking, "authenticated"
  uid: "12345",
};

export const notAuthenticatedState = {
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  status: "not-authenticated", // "checking, "authenticated"
  uid: null,
};

export const demoUser = {
  displayName: "Martin DemoDemo",
  email: "Martin@gmail.es",
  photoURL: "https://demo1.jpg",
  uid: "123456",
};
