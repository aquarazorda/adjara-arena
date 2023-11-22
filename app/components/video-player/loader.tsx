export const Loader = () => (
  <div className="loader-container">
    <div className="loader-dice">
      <svg width="100px" height="100px">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#fdce09"></stop>
            <stop offset="100%" stopColor="transparent"></stop>
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="41" strokeWidth="3" stroke="url(#gradient)"></circle>
      </svg>
    </div>
  </div>
);
