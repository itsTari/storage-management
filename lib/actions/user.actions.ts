// create account flow
// 1. to make sure our user enters their fullname and email
// 2. check if the user already exist using their email, which will be used to identify if we need to create a new user document or not
// 3. send otp to the users email
// 4. have a secret key for creating a session 
// 5. create a new user document if its a new user 
// 6. return user account id
// 7. verify otp to authenticate the log in
'use server'
import { ID, Query } from "node-appwrite"
import { createAdminClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config"
import { parseStringify } from "../utils"

const getUserByEmail = async (email:string)=>{
    const {databases} = await createAdminClient()
    const res = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal('email', [email])])
    return res.total > 0 ? res.documents[0] : null;
}
const handleError = (error:unknown, message:string) =>{
    console.log(error, message)
    throw error
}

const sendEmailOTP = async ({email}:{email:string}) =>{
    const {account} = await createAdminClient()
    try {
        const session = await account.createEmailToken(ID.unique(), email)
        return session.userId;
    } catch (error) {
        handleError(error, 'failed to send email OTP');
    }
}
export const createAccount = async ({fullName, email}: {fullName:string, email:string}) => {
  const existingUser = await getUserByEmail(email)
  const accoundId = await sendEmailOTP({email})
  if(!accoundId)throw new Error('Failed to send an OTP')
    if(!existingUser){
        const {databases} = await createAdminClient()
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
              fullName,
              email,
              avatar:'https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg',
              accoundId,
            },

        )
    }
    return parseStringify({accoundId})
}

