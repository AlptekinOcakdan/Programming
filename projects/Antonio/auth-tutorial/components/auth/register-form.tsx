"use client";

import React, {useState, useTransition} from 'react';
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {register} from "@/actions/register";
import {RegisterSchema} from "@/schemas";
import {CardWrapper} from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return (
        <CardWrapper headerLabel="Create an Account" backButtonLabel="Already have an account?" backButtonHref="/auth/login" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="Alptekin Ocakdan"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}>
                        </FormField>
                        <FormField control={form.control} name="email" render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="alptekin.ocakdan@gmail.com" type="email"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}>
                        </FormField>
                        <FormField control={form.control} name="password" render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="******" type="password"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}>
                        </FormField>
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};