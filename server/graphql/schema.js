const axios = require ('axios')
let characters = require('./model')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = require('graphql')

const Movie = new GraphQLObjectType({
    name: 'Movie',
    fields: () => {
        return {
            title: { type: GraphQLString},
            releaseDate: { 
                type: GraphQLString,
                resolve: movie => movie.release_date,
                }
            }
        }
    }
)

const Person = new GraphQLObjectType({
    //name of the type
    name:'Person',
    fields: () => {
        return {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            height: { type: GraphQLString },
            films: {
                type: GraphQLList(Movie),
                resolve: (person) => {
                        return person.films.map(film => {
                        return axios.get(film).then(res => res.data)
                    })
                }  
            }
        }
    }
})


const Query = new GraphQLObjectType({
    name: 'Query',
    fields:() => {
        return {
            people:{
                type: new GraphQLList(Person),
                resolve: () => characters
            },
            person: {
                type: Person,
                args: {
                    id: { type: GraphQLNonNull(GraphQLInt) },
                },
                resolve:(parentVal, args) => {
                    // console.log('--------------parentVal', parentVal)
                    // console.log('--------------args', args)
                    return characters.find(character => character.id === args.id)
                } 
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: () => {
        return {
            deletePerson: {
                type: Person,
                args:{ id: { type: GraphQLNonNull(GraphQLInt) } },
                resolve: (parentVal, args) => {
                    let character = characters.find(e => e.id === args.id)
                    characters = characters.filter(person => person.id !== args.id)
                    return {
                        id: character.id,
                        name: character.name
                    }
                }
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: Query,
    mutation: Mutation
})