/*
 * @Author: Armito
 * @Date: 2022-05-04 10:38:09
 * @LastEditTime: 2022-05-04 11:09:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\G6\index.tsx
 */
import { useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import G6 from '@antv/g6';

const data = {
  // 点集
  nodes: [
    {
      id: 'node1', // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: 'node2', // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: 'node1', // String，必须，起始点 id
      target: 'node2', // String，必须，目标点 id
    },
  ],
};

const G6Pgae = () => {
  const mountNodeRef = useRef(null);

  useEffect(() => {
    const graph = new G6.Graph({
      container: findDOMNode(mountNodeRef.current) as HTMLElement, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
      width: 800, // Number，必须，图的宽度
      height: 500, // Number，必须，图的高度
      // renderer: 'svg'
    });

    graph.data(data); // 读取 Step 2 中的数据源到图上
    graph.render(); // 渲染图
  }, [mountNodeRef.current]);

  return <div ref={mountNodeRef}></div>;
};

export default G6Pgae;
