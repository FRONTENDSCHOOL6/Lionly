import useStorageData from '@/hooks/useStorageData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogoutButton, ProfileImage, WritingButton } from '../../button';
import { ReactComponent as LionHeadLogoSVG } from '/src/assets/lionHeadLogo_common.svg';
import { ReactComponent as ProfileEditSVG } from '/src/assets/profileEdit_Feed.svg';

function FeedHeader() {
  const { id, nickname, profile_image } = useStorageData();

  return (
    <header className="bg-lionly-primary-color px-4">
      <div className="flex items-center justify-between border-b border-lionly-secondary-color">
        <motion.div
          className="flex items-center gap-x-2.5"
          initial={{
            x: -100,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            opacity: { ease: 'easeOut', duration: 1.25 },
            x: { type: 'spring', stiffness: 120, damping: 30 },
          }}
        >
          <LionHeadLogoSVG aria-hidden />
          <h1 className="text-lionly-xl text-white">Lionly</h1>
        </motion.div>
        <Link
          aria-label="마이 페이지"
          role="button"
          tabIndex="0"
          to={'/mypage'}
          className="cursor-pointer bg-lionly-primary-color transition-all hover:scale-125"
        >
          <ProfileEditSVG
            width={24}
            height={24}
            className="fill-lionly-white"
          />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-x-8 gap-y-2 py-8 text-lionly-white">
        <ProfileImage size={70} imageName={[id, profile_image]} />
        <div className="flex h-[70px] flex-col justify-between">
          <span className="block text-lionly-lg">{nickname}</span>
          <div className="flex gap-x-[10px]">
            <WritingButton />
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export default FeedHeader;
