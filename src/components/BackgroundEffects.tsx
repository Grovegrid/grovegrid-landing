import { AnimatedGridPattern } from "./AnimatedGridPattern";

export const BackgroundEffects = () => {
  return (
    <>
      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Full-page animated grid pattern — fixed so it persists on scroll */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatedGridPattern
          width={40}
          height={40}
          numSquares={60}
          maxOpacity={0.06}
          duration={3}
          repeatDelay={1}
          className="text-cyan-default [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
        />
      </div>

      {/* Ambient orbs on top of the grid */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-dim rounded-full mix-blend-screen filter blur-[180px] opacity-[0.06] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-cyan-dim rounded-full mix-blend-screen filter blur-[180px] opacity-[0.06] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[60%] w-[400px] h-[400px] bg-purple-accent rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none z-0" />
    </>
  );
};
