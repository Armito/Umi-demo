export const sleep = (delay: number) => {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
};
