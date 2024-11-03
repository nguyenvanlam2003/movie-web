export const getComments = async () => {
    return [
        {
            id: "1",
            movieId: "",
            content: "First comment",
            userName: "Jack",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
            replies: [
                {
                    id: "2",
                    userId: "1",
                    parentId: "1",
                    userName: "John",
                    content: "First reply",
                    createdAt: "2021-08-16T23:00:33.010+02:00",
                },
            ],
        },
        {
            id: "3",
            movieId: "",
            content: "Second comment",
            userName: "John",
            userId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
            replies: [
                {
                    id: "4",
                    userId: "2",
                    parentId: "3",
                    userName: "Jack",
                    content: "Second reply",
                    createdAt: "2021-08-16T23:00:33.010+02:00",
                },
            ],
        },
    ];
};

export const createComment = async (text, parentId = null) => {
    return {
        id: crypto.randomUUID(),
        userId: "2",
        parentId: parentId,
        userName: "Jack",
        content: text,
        createdAt: new Date().toISOString(),
        replies: [],
    };
};

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};
