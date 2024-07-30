import axios from 'axios';

export const mbToBytes = (mb: number) => mb * 1024 * 1024;

export const handleDownloadFile = (fileUrl: string, fileName?: string) => {
  axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'blob'
  })
    .then((response) => {
      const contentType = response.headers['content-type'];
      const extension = contentType.split('/')[1];
      const finalFileName = fileName ? `${fileName}.${extension}` : `download.${extension}`;

      const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
      const a = document.createElement('a');
      a.href = url;
      a.download = finalFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    })
    .catch((error) => {
      console.error('파일 다운로드 오류:', error);
    });
};
