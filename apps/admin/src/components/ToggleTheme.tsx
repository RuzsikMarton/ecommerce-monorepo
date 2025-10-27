"use client";

import { Moon, Sun} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);
    const isDark = theme === "dark";

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        <Button className="relative" variant={"outline"} size={"icon"} type="button" aria-label="Toggle theme" disabled>
            <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden />
        </Button>
    }

  return (
    <Button className="relative" variant={"outline"} size={"icon"} onClick={() => setTheme(isDark ? "light" : "dark")}>
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ToggleTheme