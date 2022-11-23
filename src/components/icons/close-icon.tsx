import { IconProps } from './types';

export const CloseIcon: React.FC<IconProps> = ({
  width = '1em',
  height = '1em',
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${size} ${size}`}
    >
      <path
        fill="currentColor"
        d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z"
      />
    </svg>
  );
};
