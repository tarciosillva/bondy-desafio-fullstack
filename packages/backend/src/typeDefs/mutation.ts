import gql from 'graphql-tag'
import User from './types/user'

export default gql`
  type Mutation {
    mutationTest(test: Boolean): Boolean
    login(email: String!, password:String!): User
  }

  ${User}
`

