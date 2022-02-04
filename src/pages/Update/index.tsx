import React, { useEffect, useState } from 'react';

interface Person {
  name: string;
  age: number;
}
interface SonProps {
  count: number;
  person: Person;
}

const Son = ({ count, person }: SonProps) => {
  useEffect(() => {
    console.log('son render');
  }, [count]);

  useEffect(() => {
    console.log('render1');
  }, []);

  useEffect(() => {
    console.log('render2');
  }, [1]);

  useEffect(() => {
    console.log('render3');
  }, [person]);

  return (
    <>
      <div>Son</div>
      <div>{count}</div>
      <div>{person.name + person.age}</div>
    </>
  );
};

const Father = () => {
  useEffect(() => {
    console.log('father render');
  });

  const [count, setCount] = useState<number>(0);

  const [person, setPerson] = useState<Person>({
    name: 'Armito',
    age: 18,
  });

  const handleClick = (e: React.MouseEvent) => {
    setCount(count + 1);
    setPerson({
      ...person,
      // name: person.name + '-',
      age: person.age + 1,
    });
  };

  return (
    <>
      <div onClick={(e) => handleClick(e)}>Father</div>
      <Son count={count} person={person}></Son>
    </>
  );
};

export default Father;
