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
  let [leftIndex, rightIndex] = [0, 17];

  const getItemClasses = (index: number) => {
    if (index === leftIndex) {
      leftIndex += nthElement;
      return 'col-span-2 row-span-2';
    } else if (index === rightIndex - 2) {
      return 'col-start-1';
    } else if (index === rightIndex - 1) {
      return 'col-start-2';
    } else if (index === rightIndex) {
      rightIndex += nthElement;
      return 'col-start-3 col-span-2 row-span-2';
    }
    return '';
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {newsArray.map((news, index) => {
        return (
          <div
            key={index}
            style={
              index === rightIndex
                ? { gridRowStart: (leftIndex / nthElement) * 5 + (leftIndex / nthElement - 1) * 3 }
                : {}
            }
            className={getItemClasses(index)}
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
