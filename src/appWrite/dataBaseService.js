import {Client,Databases, Storage, ID, Query} from "appwrite"
import conf from "../conf/conf"
class Service {
    client = new Client();
    databases;
    bucked;
    constructor() {
        console.log(conf.appwriteUrl);

        this.client
        
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.projectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucked = new Storage(this.client)
    };

    async cartItems( newCartItems) {
        try {
            return await this.databases.createDocument(
                conf.dataBaseId,
                conf.collectionId,
                ID.unique(),
                newCartItems
            );
        } catch (error) {
            throw error;
        }
    }

    async  deleteItems(id) {
        try {
            await this.databases.deleteDocument(
            conf.dataBaseId,
            conf.collectionId,
            id,
           )
           return true
        } catch (error) {
            throw error
        }
    }

    async updateQuantity (id,quantity){
        try {
            return await this.databases.updateDocument(
                conf.dataBaseId,
                conf.collectionId,
                id,
                {quantity}
            )
        } catch (error) {
            throw error
        }
    }
    

    async getAllcartItems (userId) {
        try {
            return await this.databases.listDocuments(
                conf.dataBaseId,
                conf.collectionId,
                [Query.equal("userId", userId)]
            )
        } catch (error) {
            console.log(error.message);
            
        }
    }

    // Storage service
    async uploadFile (id,file){
        // console.log(file);
        
        try {
         return await  this.bucked.createFile(
                conf.buckedId,
                id,
                file
            )
        } catch (error) {
            throw error
        }
    }
    async getFile (fileId){
        try {
            return await this.bucked.getFile(
                conf.buckedId,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
async getFilePreview(fileId) {
    try {
        return this.bucked.getFileView(
            conf.buckedId,
            fileId
        );
    } catch (error) {
        throw error;
    }
}


async deleteProfile (fileId){
    try {
        return await this.bucked.deleteFile(
            conf.buckedId,
            fileId
        )
    } catch (error) {
        throw error
    }
}


}

let dataBaseService = new  Service();
export default dataBaseService;