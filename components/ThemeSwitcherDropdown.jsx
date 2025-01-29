"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const ThemeSwitcherDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="">
        {currentTheme === "light" ? (
          <Sun className="text-yellow-500" />
        ) : (
          <Moon className="text-indigo-500" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
        <ul className="py-1 font-light text-gray-500 dark:text-gray-400">
          <li
            onClick={() => {
              setTheme("dark");
              setIsOpen(false);
            }}
            className="flex items-center cursor-pointer py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Moon className="text-indigo-500 h-4 w-4" />
            <span className="ml-1 font-medium text-sm">Dark</span>
          </li>

          <li
            onClick={() => {
              setTheme("light");
              setIsOpen(false);
            }}
            className="flex items-center cursor-pointer py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Sun className="text-yellow-500 h-4 w-4" />
            <span className="ml-1 font-medium text-sm">Light</span>
          </li>

          <li
            onClick={() => {
              setTheme("system");
              setIsOpen(false);
            }}
            className="flex items-center cursor-pointer py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
          >
            <HiOutlineSwitchVertical className="h-4 w-4" />
            <span className="ml-1 font-medium text-sm">System</span>
          </li>
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcherDropdown;
