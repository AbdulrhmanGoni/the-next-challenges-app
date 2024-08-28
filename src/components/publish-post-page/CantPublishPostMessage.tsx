"use client"
import { LogInIcon } from 'lucide-react'
import PageMessage from '../PageMessage'
import { useRouter } from 'next/navigation'

export default function CantPublishPostMessage() {

    const router = useRouter();

    return (
        <PageMessage
            message='انشئ حساباً او سجل دخولك لتستطيع النشر'
            descreption='سجل دخولك ان كان لديك حساب او قم بإنشاء حساب جديد لتستطيع نشر افكارك وتفيد الآخرين'
            Icon={LogInIcon}
            action={() => { router.push("/log-in") }}
            actionMessage='تسجيل الدخول'
        />
    )
}
