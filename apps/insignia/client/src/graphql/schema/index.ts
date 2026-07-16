import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      message
      success   
      token
    }
  }
`;

export const SIGN_MUTATION = gql`
  mutation Sign(
    $name: String!
    $email: String!
    $password: String!
  ) {
    sign(user: { name: $name, email: $email, password: $password }) {
        message
        success
    }
  }
`;

export const GET_USER = gql`
query {
  user {
    id
    name
    email
    message
    success
  }
}
`;

export const ADD_LOGO = gql`
  mutation AddLogo($title: String!, $image: String!) {
    createLogo(logo: { title: $title, image: $image }) {
      title
      image
      user_id
    }
  }
`;