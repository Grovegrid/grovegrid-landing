export const TechTicker = () => {
  const techs = [
    "TYPESCRIPT", "NODE.JS", "NEXT.JS", "TAILWIND CSS", "POSTGRESQL",
    "DOCKER", "AWS / GCP", "ZAPIER", "MAKE.COM", "REST APIS",
    "GRAPHQL", "CI / CD", "PRISMA", "REDIS", "VERCEL",
  ];

  return (
    <div className="w-full overflow-hidden relative z-20 border-y border-borderCol bg-panel">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-panel to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-panel to-transparent z-10 pointer-events-none" />

      <div className="py-3 flex" style={{ whiteSpace: "nowrap" }}>
        <div
          className="flex items-center font-mono text-[10px] md:text-xs text-textMuted uppercase tracking-widest"
          style={{
            display: "inline-flex",
            animation: "ticker 40s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...techs, ...techs].map((tech, i) => (
            <span key={i} className="inline-flex items-center flex-shrink-0">
              {tech}
              <span className="mx-5 text-cyan-default/50 text-[7px] flex-shrink-0">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
