import { Link } from 'react-router-dom';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex h-screen flex-col items-center gap-y-5 bg-lionly-primary-color pt-60"
    >
      <h1 className="text-lionly-3xl text-lionly-red">ERROR PAGE</h1>
      <p className="text-lionly-xl">에러가 발생했습니다.</p>
      <p className="text-lionly-lg">에러 메세지는 다음과 같습니다.</p>
      <h2 className="text-lionly-lg text-lionly-red">
        <i>{error.statusText || error.message}</i>
      </h2>
      <Link to="/" className="rounded-full bg-lionly-red p-2 text-lionly-white">
        랜딩 페이지로 돌아가기
      </Link>
    </div>
  );
}

export default ErrorPage;
