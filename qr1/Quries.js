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
    name:"saikrishna",
    email: 'sai@gmail.com',
    address: {city:'medchal',state:'hyderabad'},
    department: 'IT',
    salary: 5500,
    score:[3,4,1],
    skills: ["Java","Python","React Js","Bootstrap"],
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

//Insert data into posts collection
db.posts.insertOne({title:"Ths is a title",desc:"Sample desc",author:{name:"Cathy",email:"cathy@gmail.com"},})

//to display the title desc and author name of the cathy@gmail.com
db.posts.find({"author.email":"cathy@gmail.com"},{_id:0,"author.name":1,title:1,desc:1})


//schema validation
//db.createCollection("customers",{validator:{}})
db.createCollection("customers",{
    validator:{ 
        $jsonSchema:{
        bsonType:"object",
        required:["name","email"],
        properties:{
            name:{
                bsonType:"string",
                description:"must be a string and is required"
            },
            email:{
                bsonType:"string",
                pattern:"@gmail.com",
                description:"must be a string and is required"
            }
        }
    }
}})
//fields or insert statmemts are restricted means name and email should be only strings not any other data type....
//in the above validator we are creating a collection called customers and we are validating the name and email fields in the collection and we are also giving the pattern to the email field that it should be @gmail.com
//and we are also giving the description to the name and email fields that it should be a string and is required... so if we give name as 22 it wil show an error so only the string types only can be written in the name and email fields


//This is the query to find the employees whose email is sai@gmail.com and gives the detailed performance metrics analyze how mongodb executes it
db.employees.find({email:"sai@gmail.com"}).explain("executionStats");


//for creating of index for email 
db.employees.createIndex({email:1})
db.employees.createIndex({name:1})


// so after indexing we get the documents searched and keys searched only once by using keys and gives one as:"docsexamined:1"... before it checks all the documents 


//it shows like below after clicking the command getIndexes
mydb> db.employees.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { email: 1 }, name: 'email_1' },
  { v: 2, key: { name: 1 }, name: 'name_1' }
]


//for deleting of indexes we use dropIndex
db.employees.dropIndex("name_1")
//or we can use anything i have got the answer for both the commands 
db.employees.dropIndex({name:1})


//Aggregation framework..............................................................................................

//here $match works like where condition it finds the employee whose department is "IT"
db.employees.aggregate([
    {$match:{department:"IT"}}

])

//so here $project works like where it shows only the name and salary of the whose employee department is "IT" and it does not shows id
db.employees.aggregate([{$match:{department:"IT"}},{$project:{_id:0,name:1,salary:1}}])


//we get the all the employee details with name and salary only by using $project....
db.employees.aggregate([{$project:{_id:0,name:1,salary:1}}])


//here we are using $addFields to add bonus field and we are using $multiply to multiply salary with 2 and add it to bonus
db.employees.aggregate([{$addFields:{Bonus:{$multiply:["$salary",2]}}}])



//here it first match where the department is "IT" and add the field bonus and displyas the name,salary,bonus..... 
db.employees.aggregate([{$match:{department:"IT"}},{$addFields:{Bonus:{$multiply:["$salary",2]}}},{$project:{_id:0,name:1,salary:1,Bonus:1}}])



//display the employeee name,salary,bonus,grade and condition is if salary is greater than or equal to 5000 than grade a or else grade b... and we have written this
//using ternary operator we can write using if else also....
db.employees.aggregate([{$project:{_id:0,name:1,salary:1,Bonus:1,Grade:{$cond:[{$gte:["$salary",5000]},"Grade A","Grade B"]},}}])

//in this we are using $switch and branches and than cases so that we can write many conditions at at time and should write default as unknown or something if it does
//not matches any cases......
db.employees.aggregate([{$project:{_id:0,name:1,salary:1,Bonus:1,Grade:{$switch:{branches:[{case:{$gte:['$salary',5500]},then: "Grade A"},{case:{$lt:['$salary',5500]},then:"Grade B"}],default:"Unknown"},},}}])


// to display the employye name,salary,bonus and department full form if department is IT then Information Technology, if department is CSE then Computer Science and Engineering and if department is ECE then Electricals and communication engineering
// and if it does not matches any of these then it should show unknown....
db.employees.aggregate([{$project:{_id:0,name:1,salary:1,Bonus:1,dept:{$switch:{branches:[{case:{$eq:['$department','IT']},then:'Information Technologgy'},{case:{$eq:['$department','CSE']},then:'Computer Science and Engineering'},{case:{$eq:['$department','ECE']},then:'Electricals and communication engineering'}],default:'Unknown'},},}}])



//It shows the name,salary by sorting accordingto the name and skips the first name and prints the second name because limit is 1
db.employees.aggregate([{$project:{_id:0,name:1,salary:1}},{$sort:{name:1}},{$skip:1},{$limit:1}])




//here we use $unwind to get the sills items in the array and it shows the name and skills of the employee and it shows the skills in different rows
db.employees.aggregate([{$project:{_id:0,name:1,skills:1}},{$unwind:"$skills"}])




//here we are creating a new field salaryStr and we are converting salary to int here we are using $convert and $input....
db.employees.aggregate([{$project:{_id:0,name:1,salaryStr:{$convert:{$input:"$salary",to:"int"}}}}])


db.employees.aggregate([{$project:{_id:0,name:1,salaryStr:{$convert:{$input:"$salary",to:"int"}}}},{$group:{_id:"$department",total:{$sum:"$salary"}}}])