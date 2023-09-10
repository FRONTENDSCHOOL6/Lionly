import { ReactComponent as LionHeadLogo } from '@/assets/lionHeadLogo_common';
import { number } from 'prop-types';

/**
 *
 * @param {*} size 설정하면 width, height가 자동으로 동일하게 설정됩니다.
 * @returns
 */
function SmallLogo({ size }) {
  return <LionHeadLogo width={size} height={size} className="z-10" />;
}

SmallLogo.propTypes = {
  size: number,
};

export default SmallLogo;
