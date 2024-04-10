// Function to generate a random alphanumeric string of a given length

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

function generateCoupenWithTimeStamp(length) {
  const timeStamp = Date.now().toString();
  let uniqueNumber = timeStamp.slice(-length);
  uniqueNumber = shuffleString(uniqueNumber); // Shuffle the unique number
  return uniqueNumber;
}

// Function to shuffle a string (Fisher-Yates algorithm)
function shuffleString(str) {
  const array = str.split(""); // Convert string to array of characters
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap characters
  }
  return array.join(""); // Convert array back to string
}

// generate a final coupen code

function generateCoupenCode() {
  const characters = generateRandomString(4);
  const numbers = generateCoupenWithTimeStamp(3);
  return `OpenStyle${numbers}${characters}`.toUpperCase();
}

module.exports = generateCoupenCode;
