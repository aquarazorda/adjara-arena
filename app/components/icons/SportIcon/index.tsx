import { useEffect, useState } from 'react';

type SportName = 'sport' | 'football' | 'basketball' | 'tennis' | 'ufc' | 'rugby' | 'other';

const SportIcon = ({ name, size = 22 }: { name: string | SportName; size?: number }) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    import(`./${name}.png`).then((module) => setImgSrc(module.default)).catch(() => setImgSrc('./sport.png'));
  }, [name]);

  return <img src={imgSrc} alt={name} width={size} height={size} />;
};

export default SportIcon;
