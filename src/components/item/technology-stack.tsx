const technologies = [
  {
    name: "React",
    category: "Frontend",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png",
  },
  {
    name: "Next.js",
    category: "Framework",
    logo: "https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png",
  },
  {
    name: "TypeScript",
    category: "Language",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/320px-Tailwind_CSS_Logo.svg.png",
  },
  {
    name: "Node.js",
    category: "Backend",
    logo: "https://nodejs.org/static/images/logo.svg",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png",
  },
  {
    name: "Supabase",
    category: "Backend",
    logo: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png",
  },
  {
    name: "Vercel",
    category: "Deployment",
    logo: "https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png",
  },
];

export default function TechnologyStack() {
  return (
    <section className="">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <div>
          <h3 className="mb-6 text-lg font-medium">Core Technologies</h3>
          <div className="grid grid-cols-1 gap-4 gap-y-6">
            {technologies.map((tech, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-background size-10 rounded-full border p-0.5 shadow shadow-zinc-950/5 flex-shrink-0">
                  <img
                    className="aspect-square rounded-full object-contain p-1"
                    src={tech.logo || "/placeholder.svg"}
                    alt={`${tech.name} logo`}
                    height="40"
                    width="40"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className=" block text-sm">{tech.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
