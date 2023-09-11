import { ReactComponent as LionLogo } from '@/assets/lionLogo_common.svg';
import { number } from 'prop-types';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param {*} size 설정하면 width, height가 자동으로 동일하게 설정됩니다.
 * @returns
 */
function MainLogo({ size }) {
  const navigate = useNavigate();

  return (
    <LionLogo
      onClick={() => navigate('/')}
      width={size}
      height={size}
      className="z-10 cursor-pointer transition-all"
    />
  );
}

MainLogo.propTypes = {
  size: number,
};

export default MainLogo;
