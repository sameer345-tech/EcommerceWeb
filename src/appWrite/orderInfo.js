import {Client,Databases, Storage, ID, Query} from "appwrite"
import conf from "../conf/conf"
class Service {
    client = new Client();
    databases;
    bucked;
    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.projectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucked = new Storage(this.client)
    };

    async orderDetails( newOrderDetails) {
        try {
            return await this.databases.createDocument(
                conf.dataBaseId,
                conf.collectionId2,
                ID.unique(),
                newOrderDetails
            );
        } catch (error) {
            throw error;
        }
    }

async getOrder(id) {
    try {
        return await this.databases.getDocument(
            conf.dataBaseId,
            conf.collectionId2,
            id
        );
    } catch (error) {
        throw error;
    }
}


    async  deleteOrders(id) {
        try {
            await this.databases.deleteDocument(
            conf.dataBaseId,
            conf.collectionId2,
            id,
           )
           return true
        } catch (error) {
            throw error
        }
    }

   

    async getAllOrders (userId) {

        try {
            return await this.databases.listDocuments(
                conf.dataBaseId,
                conf.collectionId2,
                [Query.equal("userId", userId)]
            )
        } catch (error) {
            throw error
        }
    }

}

let orderInfoService = new  Service();
export default orderInfoService;