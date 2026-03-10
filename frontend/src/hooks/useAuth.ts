export const useAuth = () => ({
  isLoggedIn: Boolean(localStorage.getItem('token')),
  logout: () => localStorage.removeItem('token')
});
