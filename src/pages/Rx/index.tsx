/*
 * @Author: Armito
 * @Date: 2022-02-26 12:17:25
 * @LastEditTime: 2022-02-27 10:13:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi-demo\src\pages\Rx\index.tsx
 */
import { useEffect, useState } from 'react';

import {
  interval,
  Subject,
  Observable,
  of,
  from,
  bindCallback,
  combineLatest,
  asapScheduler,
  asyncScheduler,
} from 'rxjs';

import { map, filter, take } from 'rxjs/operators';

const Rx = () => {
  const [count, setCount] = useState<number>(0);
  const [nickName, setNickName] = useState<string>('Armito');

  // 一个可观察对象，多个观察者分别订阅该对象
  // 比如：一个报社，客户订阅报社，但收报时间在订阅的时候自己指定
  // useEffect(() => {
  //     const ob1 = interval(1000)
  //     const sub1 = ob1.pipe(map(s => s * 2)).subscribe((s) => {
  //         setCount(s)
  //     })
  //     setTimeout(() => {
  //         const sub2 = ob1.pipe(map(s => s * 2)).subscribe(console.warn)
  //     }, 2000)

  //     return () => {
  //         sub1.unsubscribe()
  //     }
  // }, [])

  // 一个可观察的对象，一个中间观察者去观察该对象，其他观察者订阅该中间观察者（广播）
  // 比如：一个电台，节目时间点固定，收听的听众在同一时间点听到相同内容
  // useEffect(() => {
  //     const sub = new Subject()
  //     const ob = interval(1000).pipe(filter(s => s % 2 > 0)).subscribe(sub)
  //     const sub1 = sub.subscribe(console.log)
  //     setTimeout(() => {
  //         const sub2 = sub.subscribe(console.warn)
  //     }, 2000)
  // }, [])

  // observer
  // useEffect(() => {
  //     const ob1 = interval(1000)
  //     ob1.pipe(take(4)).subscribe({
  //         next: x => console.log('Observer got a next value: ' + x),
  //         error: err => console.error('Observer got an error: ' + err),
  //         complete: () => console.log('Observer got a complete notification'),
  //       })
  // }, [])

  // observable
  // useEffect(() => {
  //     const ob = new Observable<number>(subscriber => {
  //         subscriber.next(1)
  //         subscriber.next(3)
  //         subscriber.next(5)
  //         subscriber.complete()
  //     }).pipe(filter(x => x > 2))

  //     const sub = ob.subscribe({
  //         next: x => { console.log(x * 2) },
  //         complete: () => { console.log('conpleted!') }
  //     })
  // }, [])

  // observable转换
  // useEffect(() => {
  //   const ob1 = of<string>('Armito');
  //   ob1.pipe(map((d) => d.toUpperCase())).subscribe((d) => setNickName(d));

  //   const ob2 = from([1, 2, 3]);
  //   ob2.pipe(filter((d) => d >= 2)).subscribe({
  //     next: (x) => setCount(x),
  //   });
  // }, []);

  // combineLatest
  // useEffect(() => {
  //   // // const ob1 = from([1, 2, 3])
  //   // const ob1 = of(1, 2, 3)
  //   // const ob2 = of('A', 'r')
  //   // // const ob = combineLatest([ob1, ob2], (a, b) => `${a}${b}`)
  //   // const ob = combineLatest([ob1, ob2]).pipe(
  //   //   map(([a, b]) => `${a}${b}`)
  //   // )
  //   // ob.subscribe({
  //   //   next: x => console.log(x)
  //   // })

  //   const weight = of(70, 72, 76, 79, 75);
  //   const height = of(1.76, 1.77, 1.78);
  //   const bmi = combineLatest([weight, height]).pipe(
  //     map(([w, h]) => w / (h * h)),
  //   );
  //   bmi.subscribe(x => console.log('BMI is ' + x));
  // }, [])

  // scheduler
  useEffect(() => {
    asapScheduler.schedule(() => console.log(1));
    asyncScheduler.schedule(() => console.log(2));
    asapScheduler.schedule(() => console.log(3));
    asyncScheduler.schedule(() => console.log(4));
  }, []);

  return (
    <>
      Rx: {count}
      Name: {nickName}
    </>
  );
};

export default Rx;
