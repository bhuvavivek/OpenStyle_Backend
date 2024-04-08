const BankAccount = require("../models/bankAccount/bankAccount");
const vendorservice = require("./vendorservice");

class BankAccountService {
  async createBankAccount(bankAccountData, vendorId) {
    try {
      const {
        accountHolderName,
        accountNumber,
        bankName,
        branchName,
        ifscCode,
      } = bankAccountData;

      //   check for empty fields
      for (const field in bankAccountData) {
        if (!bankAccountData[field]) {
          const error = new Error(`${field} is required`);
          error.statusCode = 400;
          throw error;
        }
      }

      await vendorservice.getVendorById(vendorId);

      const bankAccount = await BankAccount.create({
        accountHolderName,
        accountNumber,
        bankName,
        branchName,
        ifscCode,
        vendor: vendorId,
      });

      return { message: "bankAccount create SucessFully", data: bankAccount };
    } catch (error) {
      throw error;
    }
  }

  async getBankAccount(vendorId) {
    try {
      // check the id
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        error.statusCode = 400;
        throw error;
      }

      //   check the vendor id is valid or not
      await vendorservice.getVendorById(vendorId);

      //   find the bank details threw the  vendor id
      const bankAccount = await BankAccount.findOne({ vendor: vendorId });

      return bankAccount;
    } catch (error) {
      throw error;
    }
  }

  async updateBankAccount(vendorId, bankData) {
    try {
      if (!vendorId) {
        const error = new Error("Vendor Id is required");
        erorr.statusCode = 400;
        throw error;
      }

      for (const field in bankData) {
        if (!bankData[field]) {
          const error = new Error(`${field} is required and not empty`);
          error.statusCode = 400;
          throw error;
        }
      }

      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      await vendorservice.getVendorById(vendorId);

      const bankAccount = await BankAccount.findOneAndUpdate(
        { vendor: vendorId },
        bankData,
        options
      );

      await bankAccount.save();

      return { message: "Bank Account Updated SucessFully", data: bankAccount };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BankAccountService();
