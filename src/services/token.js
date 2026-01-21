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

  // 1. If nothing exists, return null
  if (!itemStr) return null;

  try {
    // 2. Attempt to parse. If it's a raw string (JWT), this will jump to 'catch'
    const item = JSON.parse(itemStr);

    // 3. Check if the parsed object has our specific expiry structure
    if (item && typeof item === 'object' && item.expiry) {
      const now = new Date();

      if (now.getTime() > item.expiry) {
        // ⏰ Time’s up! Delete it
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    }

    // 4. If it's valid JSON but NOT our expiry object, just return the data
    return item;

  } catch (error) {
    /** * 5. If parsing fails, it means the item is a plain string (like your JWT).
     * We return the string directly instead of crashing the app.
     */
    return itemStr;
  }
}

export { setItemWithExpiry, getItemWithExpiry };