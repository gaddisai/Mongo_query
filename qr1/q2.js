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