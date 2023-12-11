import NewsBox from './NewsBox';

const NewsFeed = ({
  newsArray,
}: {
  newsArray: {
    title: string;
    description: string;
    img: string;
    tags: string[];
  }[];
}) => {
  const nthElement = 26;

  const getItemClasses = (index: number) => {
    if (index % nthElement === 0) {
      return 'md:col-span-2 row-span-2';
    } else if (index % nthElement === 17) {
      return 'md:col-start-3 md:col-span-2 row-span-2';
    }
    return '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 lg:gap-6">
      {newsArray.map((news, index) => {
        return (
          <div
            key={index}
            className={getItemClasses(index)}
            style={
              index % nthElement === 17
                ? {
                    gridRowStart: ((index - 17) / nthElement + 1) * 5 + ((index - 17) / nthElement) * 3,
                  }
                : {}
            }
          >
            <NewsBox
              large={index % nthElement === 0 || index % nthElement === 17}
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

export default NewsFeed;
