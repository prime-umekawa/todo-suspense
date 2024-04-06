import { NextPage } from 'next';
import { Suspense } from 'react';

import Question from '@/components/todo/Question';
import SkeltonTodoAndDone from '@/components/todo/SkeltonTodoAndDone';
import TodoAdd from '@/components/todo/TodoAdd';
import TodoAndDone from '@/components/todo/TodoAndDone';

const Page: NextPage = () => {
  return (
    <div className="mx-auto mt-20 max-w-4xl">
      <div className="mt-8">
        <Question />

        {/* To Do・Done を表示 */}
        <Suspense fallback={<SkeltonTodoAndDone />}>
          <TodoAndDone />
        </Suspense>
        <TodoAdd />
      </div>
    </div>
  );
};

export default Page;
