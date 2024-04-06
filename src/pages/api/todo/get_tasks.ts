import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorBody, ServerCommonError } from '@/lib/api/server/error.server';
import { UtilErrorCodes, getTasks } from '@/lib/api/server/todoUtil.server';
import { sleep } from '@/lib/common/timeSleep';
import { ServerErrorMessage } from '@/lib/data/serverErrorMessage';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await sleep(1000);
  try {
    // リクエストの種類を検証;
    if (req.method !== 'GET') {
      throw new ServerCommonError(ErrorBody.BAD_REQUEST, ServerErrorMessage.BAD_REQUEST_METHOD);
    }

    const getTasksResponse = await getTasks();

    if (!getTasksResponse.isSuccess) {
      switch (getTasksResponse.errorCode) {
        case UtilErrorCodes.FAILED_TO_LOAD_TASK:
          throw new ServerCommonError(
            ErrorBody.INTERNAL_SERVER_ERROR,
            ServerErrorMessage.FAILED_TO_LOAD_TASK,
          );
        default:
          throw new ServerCommonError(
            ErrorBody.INTERNAL_SERVER_ERROR,
            ServerErrorMessage.INTERNAL_SERVER_ERROR,
          );
      }
    }

    const taskList = getTasksResponse.data;
    res.status(200).json({ records: taskList });
  } catch (error) {
    if (!(error instanceof ServerCommonError)) {
      const { status, ...errorDetails } = ErrorBody.INTERNAL_SERVER_ERROR;
      res.status(status).json(errorDetails);
    }
    const serverError = error as ServerCommonError;
    const { status, ...errorDetails } = serverError;
    res.status(status).json(errorDetails);
  }
};

export default handler;
