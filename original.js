const express = require('express');
const app = express();

app.use(express.json());

const employee = [
    {id: 1, employee_id: 10, fname: "Clarice", mname: "Desocatan", lname: "Domingo"},
    {id: 1, employee_id: 20, fname: "Charmaine", mname: "Desocatan", lname: "Domingo"},
];

//get all
app.get(('/api/employee'), (req, res) => {
    res.send(employee);
});

//get specific
app.get(('/api/employee/:id'), (req, res) => {
    const employ = employee.find(t => t.id === parseInt(req.params.id));
    if(!employ) res.status(404).send("The employee with id " + employee.id + " does not exist.");
    res.send(employ);
});

//post information
app.post('/api/employee', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.status(404).send('Name should not be empty or minimum of 3 characters.');
        return;
    }
        const employee = {
            id: employee/length + 1,
            name: req.body.name
        };
        employee.push(employee);
        res.status(200).send('New Information Added');
});

//put information
app.put('/api/employee/:id', (req, res) => {
    const employ = employee.find(c => c.id === parseInt(req.params.id));
    if(!employ) res.status(404).send('Employee not found');

    employ.name = req.body.name;
    res.status(200).send('Update Successfully');
});

//delete information
app.delete("/api/employee/:id", (req, res) =>{
    const employ = employee.find(c => c.id === parseInt(req.params.id));
    if(!employ) res.status(404).send('Not Found');

    const index = employee.indexOf(employ);
    employee.splice(index, 1);

    res.status(200).send('Deleted Successfully');
});


app.listen(3000, () => console.log("Listening on http://localhost:3000"));