import { useEffect, useState } from 'react';
import NewsBox from './NewsBox';

const NewsFeedGrid = ({
  newsArray,
}: {
  newsArray: {
    title: string;
    description: string;
    img: string;
    tags: string[];
  }[];
}) => {
  const [nthElement, setNthElement] = useState(26);
  const [difference, setDifference] = useState(17);

  const [isAboveMd, setIsAboveMd] = useState(false);

  const calculateGridRowStart = (index: number) => {
    if (index % nthElement === difference && isAboveMd) {
      return ((index - difference) / nthElement + 1) * 5 + ((index - difference) / nthElement) * 3;
    }
    return 0;
  };

  const getItemClasses = (index: number) => {
    if (index % nthElement === 0) {
      return 'md:col-span-2 row-span-2';
    } else if (index % nthElement === difference) {
      return 'md:col-start-3 md:col-span-2 row-span-2';
    }
    return '';
  };

  const updateValuesForScreenSize = () => {
    const screenWidth = window.innerWidth;

    setIsAboveMd(screenWidth >= 768);

    if (screenWidth < 768) {
      setNthElement(9);
      setDifference(9);
    } else {
      setNthElement(26);
      setDifference(17);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateValuesForScreenSize);
    updateValuesForScreenSize();

    return () => {
      window.removeEventListener('resize', updateValuesForScreenSize);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 lg:gap-6">
      {newsArray.map((news, index) => {
        return (
          <div
            key={index}
            className={getItemClasses(index)}
            style={{
              gridRowStart: calculateGridRowStart(index),
            }}
          >
            <NewsBox
              large={index % nthElement === 0 || index % nthElement === difference}
              title={news.title}
              description={news.description}
              img={news.img}
              tags={news.tags}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeedGrid;
