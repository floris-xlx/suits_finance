import React, { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/app/components/ui/Drawers/DrawerBase.tsx";

// Helper function to create a drawer reference and its open handler
const useDrawer = () => {
    const drawerRef = useRef();

    const handleOpenDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.handleOpenDrawer();
        }
    };

    return { drawerRef, handleOpenDrawer };
};

const DrawerHero = forwardRef(({ children = null }, ref) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    useImperativeHandle(ref, () => ({
        handleOpenDrawer,
    }));

    useEffect(() => {
        // Logic to handle side effects when drawer state changes
        // For example, starting animations or updating document title
    }, [isDrawerOpen]);


    return (
        <div className="flex">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="sm:max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle className="select-none">
                            View trade
                        </DrawerTitle>
                        <DrawerDescription className="mt-2 text-sm w-full ">
                            {children}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="mt-6">
                      
                        <DrawerClose asChild>
                            <Button className="w-full sm:w-fit bg-brand-primary text-white" onClick={handleCloseDrawer}>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
});

DrawerHero.displayName = 'DrawerHero';

export { DrawerHero, useDrawer };
