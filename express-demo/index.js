const express = require('express');
const app = express();

app.use(express.json());

const candy = [
    {id: 1, flavor: "blueberry", color: "blue", price: 5},
    {id: 2, flavor: "melon", color: "orange", price: 5},
    {id: 3, flavor: "lemon", color: "yellow", price: 5},
    {id: 4, flavor: "watermelon", color: "green", price: 5},
    {id: 5, flavor: "strawberry", color: "pink", price: 5},
];

//get all
app.get(('/api/candy'), (req, res) => {
    res.send(candy);
});

//get specific
app.get(('/api/candy/:id'), (req, res) => {
    const candy_data = candy.find(t => t.id === parseInt(req.params.id));
    if(!candy_data) res.status(404).send("The candy with that id does not exist.");
    res.send(candy_data);
});

//post information
app.post('/api/candy', (req, res) => {
    const { flavor, color, price } = req.body;
    if(!flavor || !color || !price) {
        res.status(404).send('Flavor, color, and price are required.');
        return;
    }
    const newCandy = {
        id: candy.length + 1,
        flavor: flavor,
        color: color,
        price: price
    };
    candy.push(newCandy);
    res.status(200).send('New Candy Added');
});

//put information
app.put('/api/candy/:id', (req, res) => {
    const candy_data = candy.find(c => c.id === parseInt(req.params.id));
    if(!candy_data) res.status(404).send('Candy not found');

    candy_data.flavor = req.body.flavor;
    candy_data.color = req.body.color;
    candy_data.price = req.body.price;

    res.status(200).send('Updated Successfully');
});

//delete information
app.delete("/api/candy/:id", (req, res) =>{
    const candy_data = candy.find(c => c.id === parseInt(req.params.id));
    if(!candy_data) res.status(404).send('Not Found');

    const index = candy.indexOf(candy_data);
    candy.splice(index, 1);

    res.status(200).send('Deleted Successfully');
});


app.listen(3000, () => console.log("Listening on port 3000...."));