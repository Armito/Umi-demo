/*
 * @Author: Armito
 * @Date: 2022-02-06 17:09:08
 * @LastEditTime: 2022-02-12 13:20:56
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\RenderProps\index.tsx
 */
import Mouse from '@/components/Mouse';
import { useMouse } from '@/components/Mouse/_hooks';

const RenderProps = () => {
  const {
    position: { x: hx, y: hy },
  } = useMouse();

  return (
    <>
      <Mouse
        slot={({ x, y }) => (
          <>
            Fu:
            <div>x: {x}</div>
            <div>y: {y}</div>
          </>
        )}
      />
      h:
      <div>x: {hx}</div>
      <div>y: {hy}</div>
    </>
  );
};

export default RenderProps;
