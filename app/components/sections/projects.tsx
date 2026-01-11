"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import Image from "next/image";

const projectImages = [
  "/projects/superbid.png",
  "/projects/interfy.png",
  "/projects/teceo.png",
  "/projects/empreende-aqui.png",
  "/projects/suporte-gerencial.png",
  "/projects/sicap.png",
];

export function Projects() {
  const t = useTranslations("projects");
  const projects = t.raw("items") as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;
  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-amber text-sm">
              {t("sectionNumber")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="group relative overflow-hidden bg-card border-border h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={projectImages[index]}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
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
