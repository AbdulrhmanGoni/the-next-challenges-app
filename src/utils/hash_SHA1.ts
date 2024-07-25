export default async function hash_sha1(text: string) {
  // Encoding the text as a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Hashing the text using SHA-1 algorithm
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);

  // Converting the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
