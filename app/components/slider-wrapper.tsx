import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';
import { cn } from '~/lib/utils';

const SliderWrapper = ({
  children,
  slidesInView = 4,
  slidesIdealSize = 300,
  overflowHidden = false,
}: {
  children: React.ReactNode;
  slidesInView?: number;
  slidesIdealSize?: number;
  overflowHidden?: boolean;
}) => {
  const [emblaRef] = useEmblaCarousel();

  const [slidesInViewCount, setSlidesInViewCount] = React.useState(slidesInView);

  React.useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      if (width) {
        const count = Math.floor(width / slidesIdealSize);
        setSlidesInViewCount(count < 1 ? 1 : count > slidesInView ? slidesInView : count);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [emblaRef]);

  return (
    <div className={cn('embla', overflowHidden ? 'overflow-hidden' : '')} ref={emblaRef}>
      <div
        className="embla__container flex"
        style={
          {
            '--slide-size': `${100 / Math.floor(slidesInViewCount)}%`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
};

export const Slide = ({ children }: { children: React.ReactNode }) => {
  return <div className="embla__slide">{children}</div>;
};

export default SliderWrapper;
