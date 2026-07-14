const resolvers = {
    Query: {
        User: () => ({
            id: '1',
            name: 'John Doe',
            email: 'dnsjkndns@gmail.com"',
            age: 25
        }),
    },
};


export default resolvers;