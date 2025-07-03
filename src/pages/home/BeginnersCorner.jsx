import { Card } from '@/components/ui/card';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import beginnerSteps from '@/utils/data';

export default function BeginnersCorner() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-950 to-green-800 text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          🌿 Beginners Corner
        </h2>

        {/* Timeline Container */}
        <div className="relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-full before:bg-green-400">
          {beginnerSteps.map((step, idx) => (
            <StepItem key={step.id} step={step} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Step Item Component with animation and zig-zag position
function StepItem({ step, index }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.7 } },
  };

  // Alternate left/right
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`relative w-full md:w-1/2 p-4 ${
        isLeft
          ? 'md:pr-12 md:ml-0 md:text-right'
          : 'md:pl-12 md:ml-auto md:text-left'
      }`}
      style={{ clear: 'both' }}
    >
      {/* Dot on timeline center line */}
      <span
        className={`hidden md:block absolute top-8 w-6 h-6 rounded-full bg-green-500 border-4 border-green-900 left-1/2 -translate-x-1/2`}
      />
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-4 space-y-2 shadow-sm hover:border-green-400 transition-all">
        <h3 className="text-xl font-semibold flex items-center justify-center md:justify-start gap-2">
          <span className="text-2xl">{step.icon}</span> Step {step.id}:{' '}
          {step.title}
        </h3>
        <p className="text-sm opacity-90">{step.description}</p>
      </Card>
    </motion.div>
  );
}
