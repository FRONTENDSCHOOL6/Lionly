import getContent from '@/api/getContent';
import Spinner from '@/components/Spinner';
import {
  Comments,
  Content,
  Header,
  InsertComment,
} from '@/components/layout/contents';
import { useContent } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function Contents() {
  const { contentId } = useParams();
  const { setContentData } = useContent();
  const { isLoading, data } = useQuery({
    queryKey: ['content', contentId],
    queryFn: () => getContent(contentId),

    onSuccess: (data) => setContentData(data),
  });

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner size={'50%'} />
        <p
          role="status"
          className="text-center text-lionly-lg text-lionly-white"
        >
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    data && (
      <>
        <Helmet>
          <title>{`${data?.expand.author.nickname}`}의 게시글</title>
        </Helmet>

        <h1 className="sr-only">Lionly</h1>

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
            <Header data={data} />
            <Content data={data} />
            <Comments data={data} />
          </div>
          <InsertComment data={data} />
        </motion.div>
      </>
    )
  );
}

export default Contents;
