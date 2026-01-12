"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function extractYears(yearsStr: string): number {
  const match = yearsStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function TechStack() {
  const t = useTranslations("tech");
  const rawTechnologies = t.raw("technologies") as Array<{ name: string; category: string; years: string }>;
  const technologies = [...rawTechnologies].sort((a, b) => {
    const yearsDiff = extractYears(b.years) - extractYears(a.years);
    if (yearsDiff !== 0) return yearsDiff;
    return a.name.localeCompare(b.name);
  });
  return (
    <section
      id="tech"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-amber text-sm">{t("sectionNumber")}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card
                  className={cn(
                    "p-6 bg-card border-border cursor-pointer",
                    "transition-all duration-300",
                    "hover:border-amber/50 hover:shadow-lg hover:shadow-amber/10",
                    "hover:-translate-y-1"
                  )}
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{tech.name}</h3>
                    <p className="text-xs text-muted-foreground">{t(`categories.${tech.category}`)}</p>
                    {tech.years && (
                      <p className="text-xs text-amber/80 font-mono">{tech.years}</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
