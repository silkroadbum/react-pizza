import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#e1dbdb"
    foregroundColor="#e7e4e4">
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="425" rx="10" ry="10" width="90" height="27" />
    <rect x="125" y="415" rx="20" ry="20" width="152" height="45" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
  </ContentLoader>
);

export default Skeleton;
