type BlogProps = {
    id: string;
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

type NewsProps = {
    status: string;
    totalResults: number;
    articles: BlogProps[];
};

type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    bio: string;
    password: string;
    emailVerified: Date | null;
    image: string | null;
}

export type { BlogProps, NewsProps, User };