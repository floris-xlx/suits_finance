// Tremor Raw Drawer [v0.0.0]

import * as React from "react"
import * as DrawerPrimitives from "@radix-ui/react-dialog"
import { RiCloseLine } from "@remixicon/react"

import { cx, focusRing } from "lib/utils"

import { Button } from "@nextui-org/react"

const Drawer = (
    props: React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Root>,
) => {
    return <DrawerPrimitives.Root {...props} />
}


const DrawerTrigger = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Trigger>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Trigger>
>(({ className, ...props }, ref) => {
    return (
        <DrawerPrimitives.Trigger ref={ref} className={cx(className)} {...props} />
    )
})

const DrawerClose = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Close>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Close>
>(({ className, ...props }, ref) => {
    return (
        <DrawerPrimitives.Close ref={ref} className={cx(className)} {...props} />
    )
})


const DrawerPortal = DrawerPrimitives.Portal


const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Overlay>
>(({ className, ...props }, forwardedRef) => {
    return (
        <DrawerPrimitives.Overlay
            ref={forwardedRef}
            className={cx(
                // base
                "fixed inset-0 z-50 overflow-y-auto",
                // background color
                "bg-black/30",
                // transition
                "data-[state=closed]:animate-hide data-[state=open]:animate-dialogOverlayShow",
                className,
            )}
            {...props}
            style={{
                animationDuration: "200ms",
                animationFillMode: "backwards",
            }}
        />
    )
})



const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Content>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Content>
>(({ className, ...props }, forwardedRef) => {
    return (
        <DrawerPortal>
            <DrawerOverlay>
                <DrawerPrimitives.Content
                    ref={forwardedRef}
                    className={cx(
                        // base
                        "fixed inset-y-2 mx-auto flex w-[95vw] flex-1 flex-col overflow-y-auto rounded-md border p-4 shadow-lg focus:outline-none max-sm:inset-x-2 sm:inset-y-2 sm:right-2 sm:max-w-lg sm:p-6",
                        // border color
                        "border-primary",
                        // background color
                        "bg-primary",
                        // transition
                        "data-[state=closed]:animate-drawerSlideRightAndFade data-[state=open]:animate-drawerSlideLeftAndFade",
                        focusRing,
                        className,
                    )}
                    {...props}
                />
            </DrawerOverlay>
        </DrawerPortal>
    )
})



const DrawerHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="flex items-start justify-between gap-x-4 "
            {...props}
        >
            <div className={cx("mt-1 flex flex-col gap-y-1", className)}>
                {children}
            </div>
            <DrawerPrimitives.Close asChild>
                <Button
                    variant="ghost"
                    className="aspect-square p-1 bg-primary"
                >
                    <RiCloseLine className="size-6" aria-hidden="true" />
                </Button>
            </DrawerPrimitives.Close>
        </div>
    )
})


const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Title>
>(({ className, ...props }, forwardedRef) => (
    <DrawerPrimitives.Title
        ref={forwardedRef}
        className={cx(
            // base
            "text-base font-semibold",
            // text color
            "text-primary",
            className,
        )}
        {...props}
    />
))



const DrawerBody = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
    return <div ref={ref} className={cx("flex-1 py-4", className)} {...props} />
})



const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitives.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitives.Description>
>(({ className, ...props }, forwardedRef) => {
    return (
        <DrawerPrimitives.Description
            ref={forwardedRef}
            className={cx("text-secondary", className)}
            {...props}
        />
    )
})



const DrawerFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cx(
                "flex flex-col-reverse  pt-4 sm:flex-row sm:justify-end sm:space-x-2 ",
                className,
            )}
            {...props}
        />
    )
}


Drawer.displayName = "Drawer"
DrawerTrigger.displayName = "Drawer.Trigger"
DrawerClose.displayName = "Drawer.Close"
DrawerPortal.displayName = "DrawerPortal"
DrawerOverlay.displayName = "DrawerOverlay"
DrawerContent.displayName = "DrawerContent"
DrawerHeader.displayName = "Drawer.Header"
DrawerTitle.displayName = "DrawerTitle"
DrawerBody.displayName = "Drawer.Body"
DrawerDescription.displayName = "DrawerDescription"
DrawerFooter.displayName = "DrawerFooter"

export {
    Drawer,
    DrawerBody,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
}