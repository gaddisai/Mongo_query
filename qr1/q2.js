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

db.Users.insertOne([
    { name: "test1", age: 21},
    { name: "test2", age: 22,location: "HYderabad" },
])

