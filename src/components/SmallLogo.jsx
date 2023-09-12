import { ReactComponent as LionHeadLogoSVG } from '@/assets/lionHeadLogo_common';
import { number } from 'prop-types';

/**
 *
 * @param {*} size 설정하면 width, height가 자동으로 동일하게 설정됩니다.
 * @returns
 */
function SmallLogo({ size }) {
  return <LionHeadLogoSVG aria-hidden className={`z-10 w-${size} h-${size}`} />;
}

SmallLogo.propTypes = {
  size: number,
};

export default SmallLogo;
