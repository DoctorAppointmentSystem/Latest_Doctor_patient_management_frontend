const calculateDOBFromAge = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  // Format as yyyy-mm-dd
  return `${birthYear}-01-01`;
};
export default calculateDOBFromAge;
