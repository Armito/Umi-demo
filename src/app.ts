import { sleep } from './utils/tools';

console.log('app.ts');

// 整个应用最开始执行，会阻碍后续代码运行
export async function getInitialState() {
  console.log('getInitialState');

  sleep(3000);

  return new Promise((resolve) => {
    resolve({
      noticeFlag: 'NO',
    });
  });
}
