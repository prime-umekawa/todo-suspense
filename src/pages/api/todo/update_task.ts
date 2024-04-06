import { NextApiRequest, NextApiResponse } from 'next';

import { ErrorBody, ServerCommonError } from '@/lib/api/server/error.server';
import { UtilErrorCodes, updateTask } from '@/lib/api/server/todoUtil.server';
import { sleep } from '@/lib/common/timeSleep';
import { ServerErrorMessage } from '@/lib/data/serverErrorMessage';

type ReqBody = {
  id: string;
  fields: { title?: string; completed?: boolean };
};

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await sleep(1000);
  try {
    // リクエストの種類を検証;
    if (req.method !== 'POST') {
      throw new ServerCommonError(ErrorBody.BAD_REQUEST, ServerErrorMessage.BAD_REQUEST_METHOD);
    }
    const { id, fields } = req.body as ReqBody;

    // リクエストボディの検証
    if (!fields || !id) {
      throw new ServerCommonError(ErrorBody.BAD_REQUEST, ServerErrorMessage.BAD_REQUEST_BODY);
    }

    const updateTaskResponse = await updateTask(id, fields);

    if (!updateTaskResponse.isSuccess) {
      switch (updateTaskResponse.errorCode) {
        case UtilErrorCodes.FAILED_TO_LOAD_TASK:
          throw new ServerCommonError(
            ErrorBody.INTERNAL_SERVER_ERROR,
            ServerErrorMessage.FAILED_TO_LOAD_TASK,
          );
        case UtilErrorCodes.NOT_FOUND_TASK:
          throw new ServerCommonError(
            ErrorBody.NOT_FOUNDED_TASK,
            ServerErrorMessage.BAD_REQUEST_BODY,
          );
        default:
          throw new ServerCommonError(
            ErrorBody.INTERNAL_SERVER_ERROR,
            ServerErrorMessage.INTERNAL_SERVER_ERROR,
          );
      }
    }
    res.status(204).json({});
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
