import React, { EventHandler, useEffect, useState } from 'react';
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
