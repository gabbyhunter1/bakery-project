'use client';

import WordsReveal from '@/components/WordsReveal';

const Demo1: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-32">
        <div>
          <h2 className="text-xl mb-4 text-gray-400">Large Headline - Fast Stagger</h2>
          <WordsReveal
            text="This is a responsive word by word text reveal animation that automatically calculates line breaks based on container width"
            className="text-6xl font-bold leading-tight"
            delay={0.2}
            duration={0.8}
            stagger={0.03}
          />
        </div>

        <div>
          <h2 className="text-xl mb-4 text-gray-400">Medium Text - Slow Stagger</h2>
          <WordsReveal
            text="Resize your browser window to see how the text dynamically reflows and the animation adapts to new line breaks while maintaining word sequence"
            className="text-3xl font-medium leading-relaxed"
            delay={0.1}
            duration={0.6}
            stagger={0.08}
          />
        </div>

        <div>
          <h2 className="text-xl mb-4 text-gray-400">Small Paragraph - Medium Stagger</h2>
          <WordsReveal
            text="Even smaller text works perfectly with this responsive system maintaining smooth word by word animations regardless of how many lines are created or how the text flows across different screen sizes"
            className="text-lg leading-relaxed max-w-2xl"
            delay={0}
            duration={0.5}
            stagger={0.05}
          />
        </div>

        <div>
          <h2 className="text-xl mb-4 text-gray-400">Very Fast Animation</h2>
          <WordsReveal
            text="Sometimes you want words to appear almost simultaneously with just a subtle stagger effect for a quick but elegant reveal"
            className="text-xl leading-relaxed"
            delay={0.1}
            duration={0.4}
            stagger={0.02}
          />
        </div>

        <div className="text-sm text-gray-500 mt-12 pb-32">
          <p>🔄 Resize the browser window to see responsive word reflow!</p>
          <p>⚡ Each word animates individually while maintaining proper line breaks</p>
        </div>
      </div>
    </div>
  );
};

export default Demo1;
