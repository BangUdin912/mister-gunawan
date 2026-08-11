"use client";

import * as React from "react";

import {
    Controller,
    FormProvider,
    useFormContext,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import {
    Slot,
} from "@radix-ui/react-slot";

import {
    cn,
} from "@/lib/utils";

import {
    Label,
} from "@/components/ui/label";


const Form = FormProvider;



const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
    props: ControllerProps<TFieldValues, TName>
) => {

    return (
        <Controller
            {...props}
        />
    );

};



const FormItem = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {

        return (
            <div
                ref={ref}
                className={cn(
                    "space-y-2",
                    className
                )}
                {...props}
            />
        );

    }
);


FormItem.displayName = "FormItem";





const FormLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {

        return (
            <Label
                ref={ref}
                className={cn(
                    className
                )}
                {...props}
            />
        );

    }
);


FormLabel.displayName = "FormLabel";





const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(
    (
        {
            ...props
        },
        ref
    ) => {

        return (
            <Slot
                ref={ref}
                {...props}
            />
        );

    }
);


FormControl.displayName = "FormControl";





const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(
    (
        {
            className,
            ...props
        },
        ref
    ) => {

        return (
            <p
                ref={ref}
                className={cn(
                    "text-sm text-muted-foreground",
                    className
                )}
                {...props}
            />
        );

    }
);


FormDescription.displayName = "FormDescription";





function FormMessage({
    className,
    children,
    ...props
}: React.ComponentProps<"p">) {

    return (

        <p
            className={cn(
                "text-sm font-medium text-red-500",
                className
            )}
            {...props}
        >

            {children}

        </p>

    );

}





export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
};