import React from 'react';

import HEADER_IMAGE from '@/styles/images/backpack.png';

type LogoProps = {};

const style: React.CSSProperties = {
  height: '256px',
};

const Logo: React.FC<LogoProps> = () => {
  return (
    <div>
      <img src={HEADER_IMAGE} style={style} />
    </div>
  );
};

export default Logo;
