import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import {User} from "../models/user.model.js";


export const inngest=new Inngest({id:"slack-clone"});

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/userCreated"},
    async({event})=>{
        await connectDB();

        const{id,email_addresses, first_name, last_name, image_url, id:clerkId}=event.data;
        const newUser={
            clerkId:id,
            email:email_addresses[0].email_address,
            name:`${first_name||""} ${last_name||""}`,
            image:image_url,
            
        }

        await User.create(newUser);
    }
);


const deleteUserFromDB=inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        await connectDB();
        const {id} =event.data;
        await User.deleteOne({clerkId:id});
        
    }
);



//create a empty array where we will export future inngest functions

export const functions=[syncUser,deleteUserFromDB];