const axios = require ('axios')
const characters = require('./model')
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
                        person.films.map(film => {
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
                resolve: () => {
                    return characters
                }
            }
        }
    }
})

module.exports = new GraphQLSchema ({
    query: Query
})