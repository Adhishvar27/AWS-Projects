
export async function authFetch(url, option = {}) {
    const token = localStorage.getItem('token');
    // console.log('Token:', token);

    if (!token || typeof token !== 'string') {
        throw new Error('Token missing or not a string.');
    }
    const authHeader = {
        ...option.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    // console.log('Fetch URL:', url);
    return fetch(url, {
        ...option,
        headers: authHeader
    });
}