type SportName = 'sport' | 'football' | 'basketball' | 'tennis' | 'ufc' | 'rugby' | 'other';

const SportIcon = ({ name, size = 22 }: { name: string | SportName; size?: number }) => {
  return <img src={`/icons/${name}.png`} alt={name} width={size} height={size} />;
};

export default SportIcon;
