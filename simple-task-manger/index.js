let Person ={
    name:"amin",
    age: 25,
    greet: function(){
        console.log(`hello my name is${this.name} and my age is ${this.age}`)
    }
}

let person1 = new person("hany", 20)
let person2 = new person("youssef", 21)
person1.great()
person2.great()