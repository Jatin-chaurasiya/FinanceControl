export const useRole = () => {
  let role = localStorage.getItem("role");

  if (role) {
    role = role.toUpperCase().replace("ROLE_", "").trim();
  }


  return {
    role,
    isAdmin: role === "ADMIN",
    isAnalyst: role === "ANALYST",
  };
};