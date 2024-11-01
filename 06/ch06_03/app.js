const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');
const express = require('express');

const schema = buildSchema(`
    type Query{
        hello:String
        welcome(name:String!):String
    }
`);
const root = {
    hello:() =>{
        return "Hello GrahQL";
    },
    welcome:({name}) =>{
        return `Welcome ${name}`;
    }
}

const app = express();
app.use("/graphql",
        graphqlHTTP({
            schema:schema,
            rootValue:root,
            graphiql:true,
        })
);

app.listen(4000);