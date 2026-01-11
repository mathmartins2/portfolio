"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import Link from "next/link";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-menu-container')) {
        setIsLanguageMenuOpen(false);
      }
    };
    
    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLanguageMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const getLocalePath = (newLocale: Locale) => {
    const matchedLocale = locales.find((loc) => pathname.startsWith(`/${loc}`));
    const pathWithoutLocale = matchedLocale 
      ? pathname.replace(`/${matchedLocale}`, '') || '/'
      : pathname;
    
    const basePath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    return `/${newLocale}${basePath}`;
  };

  const navItems = [
    { label: t("home"), href: "#hero" },
    { label: t("about"), href: "#about" },
    { label: t("tech"), href: "#tech" },
    { label: t("projects"), href: "#projects" },
    { label: t("experience"), href: "#experience" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-card/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => scrollToSection("#hero")}
            className="font-mono text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-amber">math</span>
            <span className="text-muted-foreground">.dev</span>
            <span className="text-amber animate-pulse">_</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber transition-all group-hover:w-full" />
              </button>
            ))}
            
            <div className="relative language-menu-container">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="h-9 w-9"
              >
                <Globe className="h-4 w-4" />
              </Button>
              
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50"
                >
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalePath(loc)}
                      onClick={() => setIsLanguageMenuOpen(false)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm transition-colors",
                        locale === loc
                          ? "bg-amber/10 text-amber"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {loc === "pt-BR" ? "PT" : "EN"}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <div className="relative language-menu-container">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="h-9 w-9"
              >
                <Globe className="h-4 w-4" />
              </Button>
              
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50"
                >
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalePath(loc)}
                      onClick={() => setIsLanguageMenuOpen(false)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm transition-colors",
                        locale === loc
                          ? "bg-amber/10 text-amber"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {loc === "pt-BR" ? "PT" : "EN"}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-2 bg-card rounded-lg p-2"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
