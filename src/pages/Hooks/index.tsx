/*
 * @Author: Armito
 * @Date: 2022-01-16 12:49:06
 * @LastEditTime: 2022-01-16 16:52:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Hooks\index.tsx
 */
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Button, Input, message } from 'antd';
import {
  useMount,
  useUnmount,
  useLatest,
  usePrevious,
  useBoolean,
  useUpdateEffect,
  useAsyncEffect,
  useDebounce,
  useDebounceEffect,
  useUpdate,
} from 'ahooks';

const Hooks = () => {
  console.log('Render!');

  const [count, setCount] = useState<number>(0);
  const countCur = useLatest(count);
  const countPrev = usePrevious(count);

  const increment = () => {
    setCount((countCur.current as number) + 1);
  };

  // useEffect(() => {
  //   const timer = setInterval(increment, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  // useUpdateEffect(() => {
  //   console.log('hooks', count)
  //   console.log('hooks', countPrev)
  //   console.log('hooks', countCur.current)
  // })

  useMount(() => {
    console.log('mount');
  });

  useUnmount(() => {
    console.log('unmount');
  });

  const [
    flag,
    { toggle: toggleFLag, setTrue: setFlagTrue, setFalse: setFlagFalse },
  ] = useBoolean(false);

  const [nickName, setNickName] = useState('');

  const onNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const nickNameDebounce = useDebounce(nickName, {
    wait: 500,
    leading: false,
    trailing: true,
  });

  const checkNickName = (_nickName: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (_nickName.includes('a')) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 0);
    });
  };

  useAsyncEffect(async () => {
    const result = await checkNickName(nickName);
    if (result) {
      message.success('check pass!');
    } else {
      message.error('check fail!');
    }
  }, [nickNameDebounce]);

  const checkNickName2 = async (_nickName: string) => {
    const result = await checkNickName(_nickName);
    if (result) {
      message.success('check pass!');
    } else {
      message.error('check fail!');
    }
  };

  useEffect(() => {
    checkNickName2(nickName);
  }, [nickNameDebounce]);

  useDebounceEffect(
    () => {
      checkNickName2(nickName);
    },
    [nickName],
    {
      wait: 1000,
    },
  );

  const forceUpdate = useUpdate();

  return (
    <div>
      hooks: {count}
      <Button onClick={increment}>+++++++</Button>
      <div>
        <p>Effects：{JSON.stringify(flag)}</p>
        <p>
          <button type="button" onClick={toggleFLag}>
            Toggle
          </button>
          <button
            type="button"
            onClick={setFlagTrue}
            style={{ margin: '0 16px' }}
          >
            Set false
          </button>
          <button type="button" onClick={setFlagFalse}>
            Set true
          </button>
        </p>
      </div>
      <div>
        <Input value={nickName} onChange={onNickNameChange}></Input>
      </div>
      <div>
        <Button onClick={forceUpdate}>useUpdate</Button>
      </div>
    </div>
  );
};

export default Hooks;
