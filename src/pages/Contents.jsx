import Spinner from '@/components/Spinner';
import {
  Comments,
  Content,
  Header,
  InsertComment,
} from '@/components/layout/contents';
import useIsLogin from '@/contexts/AuthProvider';
import { useContentData } from '@/hooks';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Contents() {
  useIsLogin();
  const { isLoading, data } = useContentData();

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
        <p
          role="status"
          className="text-center text-lionly-lg text-lionly-black"
        >
          페이지 이동 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <>
        <Helmet>
          <title>{`${data.expand.author.nickname}`}의 게시글</title>
        </Helmet>

        <motion.div
          className="flex min-h-[calc(100vh)] flex-col justify-between bg-lionly-white"
          initial={{
            opacity: 0,
            y: -50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <div>
            {
              <>
                <Header data={data} />
                <div className="px-4">
                  <Content data={data} />
                </div>
                <Comments data={data} />
              </>
            }
          </div>
          <InsertComment />
        </motion.div>
      </>
    )
  );
}

export default Contents;
