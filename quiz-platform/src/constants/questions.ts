import type { Question } from "@/types";

export const questionsByTopic: Record<string, Question[]> = {
    react: [
        {
            id: 1,
            question: "What is React's virtual DOM?",
            options: [
                "A complete copy of the actual DOM",
                "A lightweight copy of the actual DOM",
                "A programming language",
                "A database system"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which hook is used for side effects in React?",
            options: [
                "useState",
                "useEffect",
                "useContext",
                "useReducer"
            ],
            correctAnswer: 1
        },
        {
            id: 3,
            question: "What is the purpose of useState in React?",
            options: [
                "To manage component side effects",
                "To store and update state in functional components",
                "To handle routing in React",
                "To fetch data from an API"
            ],
            correctAnswer: 1
        },
    ],
    express: [
        {
            id: 1,
            question: "What is Express.js?",
            options: [
                "A front-end framework",
                "A Node.js framework for building web applications",
                "A database management system",
                "A programming language"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which middleware is used for parsing JSON in Express?",
            options: [
                "express.static()",
                "express.json()",
                "express.urlencoded()",
                "express.middleware()"
            ],
            correctAnswer: 1
        },
        {
            id: 3,
            question: "What is the default HTTP method for form submissions?",
            options: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ],
            correctAnswer: 1
        }
    ],
    golang: [
        {
            id: 1,
            question: "Which keyword is used to declare a function in Go?",
            options: [
                "func",
                "def",
                "function",
                "fn"
            ],
            correctAnswer: 0
        },
        {
            id: 2,
            question: "What package is used for formatted I/O in Go?",
            options: [
                "io",
                "fmt",
                "print",
                "console"
            ],
            correctAnswer: 1
        },
        {
            id: 3,
            question: "What data type is used to store a collection of key-value pairs in Go?",
            options: [
                "slice",
                "map",
                "array",
                "struct"
            ],
            correctAnswer: 1
        }
    ],
    javascript: [
        {
            id: 1,
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: [
                "let",
                "int",
                "var",
                "Both let and var"
            ],
            correctAnswer: 3
        },
        {
            id: 2,
            question: "What is the purpose of the `this` keyword in JavaScript?",
            options: [
                "Refers to the current function",
                "Refers to the global object",
                "Refers to the object that owns the function being executed",
                "Refers to the previous function"
            ],
            correctAnswer: 2
        },
        {
            id: 3,
            question: "Which of the following is not a primitive data type in JavaScript?",
            options: [
                "String",
                "Boolean",
                "Object",
                "Number"
            ],
            correctAnswer: 2
        }
    ],
    python: [
        {
            id: 1,
            question: "Which keyword is used to define a function in Python?",
            options: [
                "func",
                "define",
                "def",
                "function"
            ],
            correctAnswer: 2
        },
        {
            id: 2,
            question: "What will `print(type([]))` output in Python?",
            options: [
                "<class 'list'>",
                "<class 'tuple'>",
                "<class 'dict'>",
                "<class 'set'>"
            ],
            correctAnswer: 0
        },
        {
            id: 3,
            question: "Which of the following is a mutable data type in Python?",
            options: [
                "String",
                "Tuple",
                "List",
                "Integer"
            ],
            correctAnswer: 2
        }
    ],
    databases: [
        {
            id: 1,
            question: "Which SQL command is used to retrieve data from a database?",
            options: [
                "INSERT",
                "SELECT",
                "DELETE",
                "UPDATE"
            ],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Which NoSQL database is document-based?",
            options: [
                "MongoDB",
                "PostgreSQL",
                "MySQL",
                "SQLite"
            ],
            correctAnswer: 0
        },
        {
            id: 3,
            question: "What is the primary key in a relational database?",
            options: [
                "A unique identifier for a row",
                "A foreign key reference",
                "A column that stores passwords",
                "A function to retrieve data"
            ],
            correctAnswer: 0
        }
    ]
};
