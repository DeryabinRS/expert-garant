export const login = (email: string, password:string): boolean => {
    if (email === 'test@test.ru' && password === 'test') {
        localStorage.setItem('user', 'Test');
        return true;   
    } else {
        return false;
    }
}

export const logout = () => {
    localStorage.removeItem('user');
}

export const getAuthUser = () => {
    const user = localStorage.getItem('user');
    if(null !== user) {
      return true;
    }
    return false;
}