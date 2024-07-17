"use client"
import React from 'react'
import { Button } from './shadcn-ui/button';
import { LucideIcon } from 'lucide-react';

type PageMessage = {
    message: string;
    descreption: string;
    Icon: LucideIcon;
    action: () => void
    actionMessage: string;
}

export default function PageMessage({ message, descreption, Icon, action, actionMessage }: PageMessage) {
    return (
        <div className='flex flex-col gap-5 text-center items-center w-full h-full justify-center'>
            <Icon size={70} />
            <h2 className='text-3xl'>{message}</h2>
            <p className='text-muted-foreground max-w-96'>{descreption}</p>
            <Button onClick={action}>
                {actionMessage}
            </Button>
        </div>
    )
}
