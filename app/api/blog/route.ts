import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function main(){
    try{
        await prisma.$connect();
    }
    catch(err){
        return Error("Database connection unsuccessfull")
    }
}

export const GET= async(req:Request,res:NextResponse)=>{
    try {
        await main();
        const posts=await prisma.post.findMany();
        return NextResponse.json({message:"success",posts},{status:200})
    } catch (err) {
        return NextResponse.json({message:"Error",err},{status:500})
    }
    finally{
        await prisma.$disconnect();
    }
};
export const POST= async(req:Request,res:NextResponse)=>{
    try{
        const{title,description}=await req.json();
        await main();
        const post=await prisma.post.create({data:{description,title}});
        return NextResponse.json({message:"success",post},{status:201});
    }
    catch(err){
        return NextResponse.json({message:"error",err},{status:500});
    }
    finally{
        await prisma.$disconnect();
    }
   
};