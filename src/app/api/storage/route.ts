import { postUploadFile } from '@/services/storage';
import { NextRequest, NextResponse } from 'next/server';
import {
  STORAGE_RESPONSE_POST_FAILED,
  STORAGE_RESPONSE_POST_FILE_SIZE_EXCEEDED,
  STORAGE_RESPONSE_POST_INVALID_REQUEST,
  STORAGE_RESPONSE_POST_SUCCESS
} from './constants';
import { mbToBytes } from '@/utils/file';
import { isEmpty } from '@/utils/isEmpty';

/**
 * Storage POST 요청 핸들러
 * [POST] /api/storage
 * @description 파일을 업로드합니다.
 * @throws {Error} - file이 배열이거나 file, storagePath, maxFileSize를 필수로 전달하지 않은 경우
 */
export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const storagePath = searchParams.get('storagePath');
  const maxFileSize = searchParams.get('maxFileSize');

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const isSingleFile = !(file instanceof Array);

  const MAX_FILE_SIZE = mbToBytes(Number(maxFileSize));

  if (!file.size || !isSingleFile || !storagePath || !maxFileSize) {
    return NextResponse.json(STORAGE_RESPONSE_POST_INVALID_REQUEST, { status: 400 });
  }

  if (file.size >= MAX_FILE_SIZE) {
    return NextResponse.json(
      {
        ...STORAGE_RESPONSE_POST_FILE_SIZE_EXCEEDED,
        message: `${maxFileSize}MB 이내의 파일만 업로드 가능합니다.`
      },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await postUploadFile({ file, storagePath });

    if (error) {
      return NextResponse.json(Object.assign(STORAGE_RESPONSE_POST_FAILED, { error }), { status: 500 });
    }

    return NextResponse.json(Object.assign(STORAGE_RESPONSE_POST_SUCCESS, { data }));
  } catch (error) {
    return NextResponse.json(STORAGE_RESPONSE_POST_FAILED, { status: 400 });
  }
};
