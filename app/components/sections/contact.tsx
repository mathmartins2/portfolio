"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github } from "lucide-react";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");
  
  const socialLinks = [
    { icon: Mail, label: t("email"), href: "mailto:matheusgleiciel@gmail.com", key: "email" },
    { icon: Linkedin, label: t("linkedin"), href: "https://www.linkedin.com/in/math-martins/", key: "linkedin" },
    { icon: Github, label: t("github"), href: "https://github.com/mathmartins2", key: "github" },
  ];
  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="font-mono text-amber text-sm">{t("sectionNumber")}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-muted-foreground mb-12"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="p-8 bg-card border-border">
              <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.key}
                      variant="outline"
                      size="lg"
                      asChild
                      className="flex-1 min-w-[140px]"
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {social.label}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
