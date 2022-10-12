var Gender;
(function (Gender) {
  Gender[(Gender['Male'] = 0)] = 'Male';
  Gender[(Gender['Female'] = 1)] = 'Female';
})(Gender || (Gender = {}));

var a = Gender.Female;
console.log(a);

var b = {
  name: 'Armito',
  gender: Gender.Male,
};
console.log(b);
