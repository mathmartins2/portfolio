"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { calculateAge, calculateExperienceYears } from "@/lib/utils";

export function About() {
  const t = useTranslations("about");
  const age = calculateAge();
  const exp = calculateExperienceYears();
  
  return (
    <section
      id="about"
      className="py-24 md:py-32 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-amber text-sm">{t("sectionNumber")}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground leading-relaxed">
                {t("paragraph1", { age, exp })}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("paragraph2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("paragraph3")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-4">{t("skillsTitle")}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.raw("skills").map((skill: string, index: number) => (
                    <li key={index}>• {skill.replace("{exp}", String(exp))}</li>
                  ))}
                </ul>
              </Card>
              
              <Card className="p-6 bg-card border-border">
                <h3 className="font-semibold mb-4">{t("certificationsTitle")}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.raw("certifications").map((cert: string, index: number) => (
                    <li key={index}>• {cert}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
