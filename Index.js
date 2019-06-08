var express = require('express');
var app = express();

app.use(express.json());

const courses = [
    {id:1,name:'course1',},
    {id:2,name:'course2',},
    {id:3,name:'course3',}
];

//Begining of GET section
app.get('/', function(req, res){ 
   res.send("Hello world!123");
});

app.get('/api/courses', function(req, res){
    res.send(courses);
 });

 app.get('/api/courses/:id', function(req, res){
     var id = parseInt(req.params.id);
     var course = courses.filter(course => course.id === id);
     if(!course){
        res.status(404).send("no course is exist");
     }

    res.send(course);
 });

//POST section
app.post('/api/courses', (req,res) => {

    //Joi package can be used for input validation.
    //Joi want us to create schema wwith meet your reqiorement and then validate it
    //Formore info see video
if(req.body.name == null || req.body.name.length < 3 ){
    res.status(400).send("please enter valid name");
    return;
}

var course = {
    id : courses.length + 1,
    name: req.body.name
}

courses.push(course);
res.send(course);
});

//PUT section
app.put('/api/courses/:id', (req,res) => {

var name = req.body.name;

if(req.body.name == null || req.body.name.length < 3 ){
    res.status(400).send("please enter valid name");
    return;
}

var course = courses.find(course => course.id === parseInt(req.params.id));

if(!course){
    res.status(404).send("Course with given id is not exist");
    return;
}

course.name = name;
res.send(course);

});

//Delete section
app.delete('/api/courses/:id', (req,res) => {
   
    var course = courses.find(course => course.id === parseInt(req.params.id));

    if(!course){
         res.status(404).send("no course exist with this id");       
         return;
    }

    var index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(courses);
    
    });

//to assign port dynamically
const port = process.env.PORT || 3000;

app.listen(port,console.log("listning to port no : ${port}")); 