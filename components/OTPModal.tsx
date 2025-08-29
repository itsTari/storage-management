import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation";

const OTPModal = ({email, accountId}:{email:string, accountId:string}) => {
    const [isOpen, setIsOpen] = useState(true)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setLoading(true)
        try {
            //call api to verify otp
            const sessionId = await verifySecret({accountId, password})
            if(sessionId) router.push('/')   
        } catch (error) {
            console.log('failed to verify OTP', error)
        }
        setLoading(false)
    }
    const handleResendOtp = async ()=>{
        await sendEmailOTP({email}) 
    }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">Enter your OTP<img src="/assets/icons/close-dark.svg" alt="close" width={20} height={20} onClick={() =>setIsOpen(false)} className="otp-close-button"/></AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            An OTP has been sent to <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot"/>
            <InputOTPSlot index={1} className="shad-otp-slot"/>
            <InputOTPSlot index={2} className="shad-otp-slot"/> 
            <InputOTPSlot index={3} className="shad-otp-slot"/>
            <InputOTPSlot index={4} className="shad-otp-slot"/>
            <InputOTPSlot index={5} className="shad-otp-slot"/>
          </InputOTPGroup>
        </InputOTP>
        <AlertDialogFooter>
            <div className="flex w-full flex-col gap-4">
                <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">Submit {loading && <img src="/assets/icons/loader.svg" width={24} height={24} className="ml-2 animate-spin"/>}</AlertDialogAction>
                <div className="subtitle-2 text-center text-light-100">Didn&apos;t get a code? <Button onClick={handleResendOtp} variant='link' type="submit" className="pl-1 text-brand">Click to resend OTP</Button></div>
            </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
