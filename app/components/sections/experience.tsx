"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

const INITIAL_VISIBLE_COUNT = 3;

export function Experience() {
  const t = useTranslations("experience");
  const [showAll, setShowAll] = useState(false);
  const experiences = t.raw("items") as Array<{
    period: string;
    role: string;
    company: string;
    location: string;
    description: string;
    technologies: string[];
  }>;

  const visibleExperiences = showAll ? experiences : experiences.slice(0, INITIAL_VISIBLE_COUNT);
  const hasMoreExperiences = experiences.length > INITIAL_VISIBLE_COUNT;

  return (
    <section
      id="experience"
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
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-amber text-sm">{t("sectionNumber")}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-amber via-amber to-amber/20" />
            
            <div className="space-y-8">
              <AnimatePresence mode="sync">
                {visibleExperiences.map((exp, index) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-6 top-2 h-4 w-4 rounded-full bg-amber border-4 border-background" />
                    
                    <Card className="p-6 bg-card border-border">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{exp.role}</h3>
                          <p className="text-sm text-amber">{exp.company} • {exp.location}</p>
                        </div>
                        {exp.period && (
                          <Badge variant="outline" className="w-fit">
                            {exp.period}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {hasMoreExperiences && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="gap-2"
                >
                  {showAll ? (
                    <>
                      {t("showLess")}
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t("showMore")} ({experiences.length - INITIAL_VISIBLE_COUNT})
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
