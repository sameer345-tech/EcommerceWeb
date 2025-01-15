import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";
import { redirect, useNavigate } from "react-router-dom";
class AuthService {
     client = new Client();
     account;
    constructor() {
       this.client 
       .setEndpoint(conf.appwriteUrl) // Your API Endpoint
       .setProject(conf.projectId); // Your project ID
       this.account = new Account(this.client);
    }
    
    async signUp(email, password, name) {
      console.log("Creating Account with:", name, email, password);
  
      try {
          return await this.account.create(ID.unique(), email, password, name);
      } catch (error) {
          console.error("Error in createAccount:", error.message);
          throw error; // Pass the error back to the caller
      }
  }
    async login (email,password){
      try {
        return await this.account.createEmailPasswordSession(email,password);
      } catch (error) {
        throw error
      }
    }
    async userAuthAccount (){
      try {
       return this.account
      } catch (error) {
        throw error
      }
    }
    async sendVerification(redirectUrl) {
      try {
          await this.account.createVerification(redirectUrl);
          console.log("Verification email sent!");
      } catch (error) {
          console.error("Error sending verification email:", error.message);
      }
  }
    async updateVerification(userId, email) {
      try {
        return await this.account.updateVerification(userId, email);
      } catch (error) {
        throw error;
      }
    }
    
    async getCurrentuser(){
        try {
           return await this.account.get() ;
        } catch (error) {
          // if(error.code === 401)    this.account.updateSession("current")         
             throw error
          
            
        }
    }
    async getAllUsers(){
        try {
           return await this.account.list() ;
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
           return this.account.deleteSessions() ;
        } catch (error) {
            throw error;
        }
    }
};
  let userAuth = new AuthService();
  export default userAuth;