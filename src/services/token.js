function setItemWithExpiry(key, value, expiryInMinutes = 30) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + expiryInMinutes * 60 * 1000, // expiry in ms
  };
  localStorage.setItem(key, JSON.stringify(item));
}


function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    // ⏰ Time’s up! Delete it
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export { setItemWithExpiry, getItemWithExpiry };