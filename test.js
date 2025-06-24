// const update = (i) => setTimeout(() => console.log(i), 100);
for (var i = 0; i < 3; i++) {
  (function (i) { setTimeout(() => console.log(i), 100) })(i)
}
