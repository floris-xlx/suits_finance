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

const DrawerHero = forwardRef(({ children = null, title = 'View user' }, ref) => {
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



    return (
        <div className="flex transition-all duration-500">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className={`sm:max-w-lg transition-transform duration-500 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <DrawerHeader>
                        <DrawerTitle className="select-none">
                            {title}
                        </DrawerTitle>
                        <DrawerDescription className="mt-2 text-sm w-full ">
                            {children}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="mt-6">
                        <DrawerClose asChild>
                            <Button className="w-full sm:w-fit bg-brand-primary text-white" onClick={handleCloseDrawer}>Close</Button>
                        </DrawerClose>
                    </DrawerFooter>s
                </DrawerContent>
            </Drawer>

            {isDrawerOpen && (
                <div className="z-50 backdrop-blur-md backdrop-saturate-150 bg-overlay/30 w-screen h-screen fixed inset-0" style={{ opacity: 1 }} aria-hidden="true"></div>
            )}
        </div>
    );
});

DrawerHero.displayName = 'DrawerHero';

export { DrawerHero, useDrawer };
