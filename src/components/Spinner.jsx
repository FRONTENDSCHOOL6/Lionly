import { string, number } from 'prop-types';

function Spinner({ size = 100, message = '게시글을 불러오는 중입니다.' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="bg-[rgb(241, 242, 243)] block; m-auto"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <title>{message}</title>
      <defs>
        <clipPath
          id="progress-s6pl18tcqnr-cp"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <rect x="0" y="0" width="0" height="100">
            <animate
              attributeName="width"
              repeatCount="indefinite"
              dur="1s"
              values="0;100;100"
              keyTimes="0;0.5;1"
            ></animate>
            <animate
              attributeName="x"
              repeatCount="indefinite"
              dur="1s"
              values="0;0;100"
              keyTimes="0;0.5;1"
            ></animate>
          </rect>
        </clipPath>
      </defs>
      <path
        fill="none"
        stroke="#215d38"
        strokeWidth="2.79"
        d="M18 36.895L81.99999999999999 36.895A13.104999999999999 13.104999999999999 0 0 1 95.10499999999999 50L95.10499999999999 50A13.104999999999999 13.104999999999999 0 0 1 81.99999999999999 63.105L18 63.105A13.104999999999999 13.104999999999999 0 0 1 4.895000000000003 50L4.895000000000003 50A13.104999999999999 13.104999999999999 0 0 1 18 36.895 Z"
      ></path>
      <path
        fill="#14a651"
        clipPath="url(#progress-s6pl18tcqnr-cp)"
        d="M18 40.99L82 40.99A9.009999999999998 9.009999999999998 0 0 1 91.00999999999999 50L91.00999999999999 50A9.009999999999998 9.009999999999998 0 0 1 82 59.01L18 59.01A9.009999999999998 9.009999999999998 0 0 1 8.990000000000004 50L8.990000000000004 50A9.009999999999998 9.009999999999998 0 0 1 18 40.99 Z"
      ></path>
    </svg>
  );
}

Spinner.propTypes = {
  size: number,
  message: string,
};

export default Spinner;
