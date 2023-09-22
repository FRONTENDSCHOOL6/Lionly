import { useLocation } from 'react-router-dom';

function useTitle() {
  const pathname = useLocation().pathname;
  const logoStyle = {
    size: null,
    gap: null,
    pt: null,
    pr: null,
    absolute: null,
  };
  const headingStyle = { hidden: null };

  switch (pathname) {
    case '/signin':
      logoStyle.size = 58;
      logoStyle.gap = 'gap-y-2';
      logoStyle.pt = 'pt-[50px]';
      break;

    case '/signup':
      logoStyle.size = 58;
      logoStyle.gap = 'gap-y-2';
      logoStyle.absolute = 'absolute top-5 right-8';

      headingStyle.hidden = 'hidden';
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
