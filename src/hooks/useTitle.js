import { useLocation } from 'react-router-dom';

function useTitle() {
  const location = useLocation().pathname;
  const logoStyle = {
    size: null,
    gap: null,
    pt: null,
    pr: null,
    position: null,
  };
  const headingStyle = { visible: null };

  switch (location) {
    case '/signin':
      logoStyle.size = 58;
      logoStyle.gap = 'gap-y-2';
      logoStyle.pt = 'pt-[50px]';
      break;

    case '/signup':
      logoStyle.size = 58;
      logoStyle.gap = 'gap-y-2';
      logoStyle.pt = 'pt-[20px]';
      logoStyle.pr = 'pr-[32px]';
      logoStyle.position = 'float-right';

      headingStyle.visible = 'hidden';
      break;

    case '/feed':
      logoStyle.size = 58;
      logoStyle.gap = 'gap-y-2';
      logoStyle.pt = 'pt-[50px]';
      break;

    default:
      logoStyle.size = 100;
      logoStyle.gap = 'gap-y-7';
      logoStyle.pt = 'pt-[150px]';
      break;
  }

  return { logoStyle, headingStyle };
}

export default useTitle;
