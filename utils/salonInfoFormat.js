exports.formatSalonInfo = (salonInfo) => {
  return {
    shopId: salonInfo._id,
    shopName: salonInfo.shopName,
    emailAddress: salonInfo.emailAddress,
    phoneNumber: salonInfo.phoneNumber,
    shopType: salonInfo.shopType,
    shopAddress: salonInfo.shopAddress,
    shopImages: salonInfo.images,
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
