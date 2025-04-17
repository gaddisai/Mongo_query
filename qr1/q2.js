db.products.insertOne([
    { name: "Laptop", price: 1000 },
])
//to find the products in the collection
db.products.find()

//to rename the products to users
db.products.renameCollection("users")

// multiple objects inserting at one shot
db.Users.insertMany([
    { name: "Sai", email: "saikrishna.gaddii@gmail.com" },
    { name: "Varshit", email: "varshith@gmail.com" },
    { name: "Deepesh", email: "deepesh@gmail.com" }
])

//It shows the objects in the table users only two items are shown
db.Users.find().limit(2)

//It shows the objects in the table users skipping one item and showing the rest of the items
db.Users.find().skip(1)

//Its shows the number of documents in the users collection
db.Users.countDocuments()

db.Users.insertMany([
    { name: "test1", age: 21},
    { name: "test2", age: 22,location: "HYderabad" },
]);

//It shows the name which consists of "test1"
db.Users.find({name: "test1"})

//It shows the names only of all ids
db.Users.find({},{name: 1});

//It shows only names not ids
db.Users.find({},{name: 1, _id: 0});

//If we want to delete one id from the db
db.Users.deleteOne({ _id: ObjectId("Here we have to give the id ") })
db.Users.deleteOne({name:'give the name'})

//if we want to display the name of that email only
db.Users.find({email:"deepesh@gmail.com"},{_id: false,name: true})

//delete all the users from the database
db.Users.deleteMany({})

//It deletes all the names which contains the name:test1
db.Users.deleteMany({name:"test1"})

//It deletes only the startring name of the name:test1 and deletes only one 
db.Users.deleteOne({name:"test2"})

//
db.employees.insertOne({
    name:"deepesh",
    email: 'deepesh@gmail.com',
    address: {city:'Kammam',state:'Telangana'},
    department: 'ECE',
    salary: 7000,
    score:[6,4],
    skills: ["Java","Python"],
    date: Date()
})

//to sort according to the salary and display the name and salary
db.employees.find({},{_id:0,name:true,salary:true}).sort({salary:1})


//to display the employee whose city is medchal
db.employees.find({'address.city':'Medchal'})


//to display the employees whose salary is equal to 7000
db.employees.find({salary:{$eq:7000}})

//to display the employees whose salary is greater than 7000
db.employees.find({salary:{$gt:7000}})

//to display the employees whose salary is less than 7000
db.employees.find({salary:{$lt:7000}})

//
db.employees.find({salary:{$gte:3000},department:'CSE'})

//we are keeping 'or' operator to find the employees whose salary is greater than 4000 or department is CSE
db.employees.find({$or:[{salary:{$gte:4000}},{department:'CSE'}]})

//we are keeping 'and' operator to find the employees whose salary is greater than 4000 and department is CSE
db.employees.find({$and:[{salary:{$gte:4000}},{department:'CSE'}]})


//display the employees whose department is not CSE
db.employees.find({$nor:[{department:'CSE'}]})


//display the employee details who do not have the department field
db.employees.find({department:{$exists:false}})

//update the employee whose email is sai@gmail.com to update the salary to 6000
db.employees.updateOne({email:'sai@gmail.com'},{$set:{salary:6000}})


//In this $in operator is used to find the employees whose department is either CSE or ECE and displays the cse and ece employees
db.employees.find({department:{$in:['CSE','ECE']}})

//in this $push operator is used to add the score of 5 to the employee whose email is sai@gmail.com
db.employees.updateOne({email:'sai@gmail.com'},{$push:{score:5}})

//if we want to add multiple values to the score array of the employee whose email is sai@gmail.com
db.employees.updateOne({email:'sai@gmail.com'},{$push:{score:{$each:[5,6,7]}}})

//in this $pull operator is used to remove the score of 5 from the employee whose email is sai@gmail.com
db.employees.updateOne({email:'sai@gmail.com'},{$pull:{score:5}})   

//to remove the score 1 from the employee
db.employeees.find({},{$pop:{score:1}})