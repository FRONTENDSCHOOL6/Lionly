import { LogoutButton, WritingButton } from '@/components/button';
import { useStorageData } from '@/hooks';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '..';
import { ReactComponent as LionHeadLogoSVG } from '/src/assets/lionHeadLogo_common.svg';
import { ReactComponent as ProfileEditSVG } from '/src/assets/profileEdit_Feed.svg';

function FeedHeader() {
  const navigate = useNavigate();
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
          <span className="text-lionly-xl text-white">Lionly</span>
        </motion.div>
        <ProfileEditSVG
          aria-label="마이 페이지"
          role="button"
          tabIndex="0"
          width={24}
          height={24}
          onKeyDown={(e) => (e.key === 'Enter' ? navigate('/mypage') : null)}
          onClick={() => {
            navigate('/mypage');
            scrollTo({
              top: 0,
            });
          }}
          className="cursor-pointer bg-lionly-primary-color fill-lionly-white transition-all hover:scale-125"
        />
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
