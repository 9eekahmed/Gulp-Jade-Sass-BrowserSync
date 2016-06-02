
function Person(name, age){
  this.name = name;
  this.age = age;
}

Person.prototype.info = function(){
  var line = "Name: "+this.name + " Age: " + this.age;
  console.log(line);
}
