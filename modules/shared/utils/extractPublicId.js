function extractPublicId(folderName, cloudinaryUrl) {
  const folderPath = `${folderName.trim()}`;
  const publicId = cloudinaryUrl.split("/").pop().split(".")[0];
  return `${folderPath}/${publicId}`;
}

module.exports = extractPublicId;
