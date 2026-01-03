

export const authFetch = async (
    url: string,
    options: RequestInit = {},
    logout: () => void
) => {
    const token = localStorage.getItem("token");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
    
    if (res.status === 401) {
        logout();
        throw new Error("Unauthorized");
    }

    return res;
};