import Spinner from '@/components/Spinner';
import { Comments, Content, Header, WriteComment } from '@/components/content';
import { useContent } from '@/hooks';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

function Contents() {
  const { feedId } = useParams();
  const { isLoading, data } = useContent(feedId);

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
          <title>{data.expand.author.nickname}의 게시글</title>
        </Helmet>

        <h1 className="sr-only">Lionly</h1>

        <div className="flex min-h-screen flex-col justify-between bg-lionly-white">
          <div>
            <Header data={data} />
            <Content data={data} />
            <Comments data={data} />
          </div>
          <WriteComment data={data} />
        </div>
      </>
    )
  );
}

export default Contents;
