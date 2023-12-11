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

  return (
    <div className="grid grid-cols-4 gap-6">
      {newsArray.map((news, index) => {
        if (index === leftIndex) {
          leftIndex += nthElement;
          return (
            <div className="col-span-2 row-span-2" key={index}>
              <NewsBox large title={news.title} description={news.description} img={news.img} tags={news.tags} />
            </div>
          );
        } else if (index === rightIndex - 2) {
          return (
            <div className="col-start-1" key={index}>
              <NewsBox title={news.title} description={news.description} img={news.img} tags={news.tags} />
            </div>
          );
        } else if (index === rightIndex - 1) {
          return (
            <div className="col-start-2" key={index}>
              <NewsBox title={news.title} description={news.description} img={news.img} tags={news.tags} />
            </div>
          );
        } else if (index === rightIndex) {
          const rowIndex = leftIndex / nthElement;
          rightIndex += nthElement;
          return (
            <div
              className="col-start-3 col-span-2 row-span-2"
              style={{ gridRowStart: rowIndex * 5 + (rowIndex - 1) * 3 }}
              key={index}
            >
              <NewsBox large title={news.title} description={news.description} img={news.img} tags={news.tags} />
            </div>
          );
        }
        return (
          <NewsBox key={index} title={news.title} description={news.description} img={news.img} tags={news.tags} />
        );
      })}
    </div>
  );
};

export default NewsFeed;
