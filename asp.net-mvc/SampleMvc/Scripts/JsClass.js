var Person = function (firstName, lastName) {
    this.FirstName = firstName;
    this.LastName = lastName;
}

Person.prototype.ExampleMethod = function () {
    return this.FirstName + " " + this.LastName;
}
var p = new Person("Alim", "Karim");
p.ExampleMethod();

class Person  {  
    constructor(fname, lname) {  
        this.FirstName = fname;
        this.LastName = fname;
    }  
  
}  