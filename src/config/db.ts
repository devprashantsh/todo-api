import { PrismaClient } from "@prisma/client";

class Database{
    public prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient()
    }
   
    async disconnect (){
        await this.prisma.$disconnect()
    }
}

export default new Database();