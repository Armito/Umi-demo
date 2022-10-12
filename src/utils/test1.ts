enum Gender {
  Male,
  Female,
}

const a: Gender = Gender.Female;
console.log(a);

interface Man {
  name: string;
  gender: Gender;
}

const b: Man = {
  name: 'Armito',
  gender: Gender.Male,
};
console.log(b);
