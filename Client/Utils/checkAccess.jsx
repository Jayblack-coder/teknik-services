export const canViewContact = (user) => {
  return user?.plan === "premium";
};