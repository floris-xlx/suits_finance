import React, { useState, useEffect, Fragment } from "react";
import { getTheme, setTheme } from "@/app/client/hooks/darkmode/DarkModeCookie.js";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import ButtonIcon from "@/app/components/ui/Buttons/ButtonIcon";

const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState(getTheme());

    useEffect(() => {
        const currentTheme = getTheme();
        setDarkMode(currentTheme);
    }, []);

    function toggleDarkMode() {
        const newTheme = darkMode === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setDarkMode(newTheme);
    }

    return (
        <Fragment>
            <ButtonIcon onPress={toggleDarkMode} border={true} transparent={false}>
                {darkMode === "light" ? (
                    <SunIcon className="w-6 h-6 text-accent" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-accent" />
                )}
            </ButtonIcon>
        </Fragment>
    );
}

export default ThemeButton;