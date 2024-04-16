exports.formatSalonInfo = (salonInfo) => {
  return {
    id: salonInfo._id,
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
    isFav: salonInfo.isFavourite,
    offer: "",
    distance: "",
  };
};
