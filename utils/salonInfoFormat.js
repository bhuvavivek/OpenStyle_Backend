exports.formatSalonInfo = (salonInfo) => {
  return {
    shopId: salonInfo._id,
    shopName: salonInfo.shopName,
    emailAddress: salonInfo.emailAddress,
    phoneNumber: salonInfo.phoneNumber,
    shopType: salonInfo.shopType,
    shopAddress: salonInfo.shopAddress,
    // salonInfo.images, replace with dummy images
    shopImages: [
      "https://media.istockphoto.com/id/1481299284/photo/asian-backpacker-on-mountain-peak-and-using-binoculars-looking-forward.jpg?s=1024x1024&w=is&k=20&c=JqwRK2QEaY9w8SBO0z3xrsZExJFLmzbU0wQbEJOg_PA=",
      "https://media.istockphoto.com/id/873289826/photo/successful-young-woman-backpacker-jumping-on-cliffs-edge.jpg?s=1024x1024&w=is&k=20&c=jBA8mG0guXeU-nzyhT_XoLmnbcsT-CIzo9hDkT1rSyk=",
      "https://media.istockphoto.com/id/487076033/photo/4k-television-display.jpg?s=2048x2048&w=is&k=20&c=l3K0tAFMjxWx7T5dReY2RSS8dX8ZvREMjTrJDQsgTyc=",
    ],
    lattitude: salonInfo.lattitude,
    longitude: salonInfo.longitude,
    openTime: salonInfo.openTime,
    closeTime: salonInfo.closeTime,
    shopIsOpen: salonInfo.shopIsOpen,
    averageRating: salonInfo.averageRating,
    isFav: salonInfo.isFavourite,
    offer: "",
    offerList: "",
    distance: "",
    profileImage: "",
  };
};
