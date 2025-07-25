'use client';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { urlForIcon } from '@/lib/image';

export default function CoreTechnologiesSection({ coreTechnologies }) {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl md:px-6 px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-4">Core Technologies</h2>
          <p className="text-muted-foreground">
            Explore the powerful technologies that make modern web development
            efficient, scalable, and enjoyable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1  gap-6"
        >
          {coreTechnologies && coreTechnologies.length > 0 ? (
            coreTechnologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow duration-200"
              >
                {tech?.icon && (
                  <Avatar className="bg-transparent rounded">
                    <div className="bg-white dark:bg-white p-[2px]">
                      <AvatarImage
                        src={urlForIcon(tech.icon)?.src || ''}
                        alt={tech.icon.alt || `icon of ${tech.name}`}
                        title={tech.icon.alt || `icon of ${tech.name}`}
                        className="object-contain"
                      />
                    </div>
                    <AvatarFallback>
                      {tech.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <span className="block text-sm font-medium">{tech.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {tech.description}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No core technologies added.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
