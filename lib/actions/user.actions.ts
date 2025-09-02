// create account flow
// 1. to make sure our user enters their fullname and email
// 2. check if the user already exist using their email, which will be used to identify if we need to create a new user document or not
// 3. send otp to the users email
// 4. have a secret key for creating a session 
// 5. create a new user document if its a new user 
// 6. return user account id
// 7. verify otp to authenticate the log in
'use server'
import { Browser, ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config"
import { parseStringify } from "../utils"
import { cookies } from "next/headers"
import { avatarPlaceholderUrl } from "@/constants"
import { redirect } from "next/navigation"

const getUserByEmail = async (email:string)=>{
    const {databases} = await createAdminClient()
    const res = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal('email', [email])])
    return res.total > 0 ? res.documents[0] : null;
}
const handleError = (error:unknown, message:string) =>{
    console.log(error, message)
    throw error
}

export const sendEmailOTP = async ({email}:{email:string}) =>{
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
  const accountId = await sendEmailOTP({email})
  if(!accountId)throw new Error('Failed to send an OTP')
    if(!existingUser){
        const {databases} = await createAdminClient()
        await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
              fullName,
              email,
              avatar:avatarPlaceholderUrl,
              accountId,
            },

        )
    }
    return parseStringify({accountId})
}

export const verifySecret = async ({accountId, password}:{accountId:string, password:string}) => {
    try {
        const {account} = await createAdminClient()
        const session = await account.createSession(accountId, password)
        const cookieStore = await cookies()
        cookieStore.set('appwrite-session', session.secret, {path:'/', httpOnly:true, sameSite:'strict'})
        return parseStringify({sessionId: session.$id})
    } catch (error) {
        handleError(error, 'failed to verify OTP')
    }
}
export const getCurrentUser = async() =>{
    const {databases, account} = await createSessionClient()
    const res = await account.get()
    const user = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, [Query.equal('accountId', res.$id)])
    
    if(user.total <= 0) return null
    return parseStringify(user.documents[0])
}
export const logoutUser = async () =>{
   const {account} = await createSessionClient()
    try {
        const session = await account.deleteSession('current')
        const cookieStore = await cookies()
        cookieStore.delete('appwrite-session')
        if(session) redirect('/sign-in')
    } catch (error) {
        handleError(error,'Error logging out user')
    }

}
// export const userAvatars = async ()=>{
//     const {avatars} = await createSessionClient()
//     try {
//         const avatarUrl = await avatars.getInitials('current', 100, 100, 'ffffff')
//         return avatarUrl
//     } catch (error) {
//         handleError(error,'failed to load')
//     }
// }

