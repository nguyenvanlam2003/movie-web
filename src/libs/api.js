export const getComments = async () => {
    return [
        {
            id: "1",
            body: "First comment",
            userName: "Jack",
            userId: "2",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "2",
            body: "Second comment",
            userName: "John",
            userId: "1",
            parentId: null,
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "3",
            body: "First comment first child",
            userName: "John",
            userId: "1",
            parentId: "1",
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
        {
            id: "4",
            body: "Second comment second child",
            userName: "John",
            userId: "1",
            parentId: "2",
            createdAt: "2021-08-16T23:00:33.010+02:00",
        },
    ];
};

export const createComment = async (text, parentId = null) => {
    return {
        id: crypto.randomUUID(),
        body: text,
        parentId,
        userId: "2",
        userName: "Jack",
        createdAt: new Date().toISOString(),
    };
};

export const updateComment = async (text) => {
    return { text };
};

export const deleteComment = async () => {
    return {};
};
