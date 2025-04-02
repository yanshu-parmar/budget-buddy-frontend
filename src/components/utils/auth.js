export const saveUserData = (userData, token, userType) => {
    if (!userData) return false;

    const formattedUserType =
        userType?.toLowerCase() ||
        userData.userType?.toLowerCase() ||
        userData.role?.toLowerCase() ||
        'user';

    const userDataToStore = {
        userId: userData.userId || userData._id || userData.id,
        username: userData.username || userData.name, // Fixed property access
        email: userData.email,
        token: token || userData.token,
        isLoggedin: new Date().toISOString(), // Fixed function call
        userType: formattedUserType, // Added missing userType
    };

    console.log('Storing user data in localStorage:', userDataToStore);

    localStorage.setItem('user', JSON.stringify(userDataToStore));
    return true;
};

export const getCurrentUser = () => {
    try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
    }
};

export const isLoggedIn = () => {
    const user = getCurrentUser();
    return !!user?.isLoggedin; // Fixed key name (was `isLoggedIn`)
};

export const getUserType = () => {
    const user = getCurrentUser();
    return user?.userType || null;
};

export const isUserType = (type) => {
    const userType = getUserType();
    return userType === type?.toLowerCase();
};

export const getUserDashboardRoute = () => {
    const userType = getUserType();

    console.log('Getting dashboard route for user type:', userType);

    if (userType === 'user') {
        return '/user/dashboard';
    }
    return '/dashboard';
};

export const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('signupData');
};

export const getToken = () => {
    const user = getCurrentUser();
    return user?.token || null;
};

export const getUserId = () => {
    const user = getCurrentUser();
    return user?.userId || null;
};

export const isTokenExpired = () => {
    return false; // Placeholder function, implement expiration logic if needed
};

export const getUsername = () => {
    const user = getCurrentUser();
    return user?.username || null;
};

export const debugAuthStorage = () => {
    try {
        const user = localStorage.getItem('user');
        const signupData = sessionStorage.getItem('signupData');

        return {
            hasUserData: !!user,
            userData: user ? JSON.parse(user) : null,
            hasSignupData: !!signupData,
            signupData: signupData ? JSON.parse(signupData) : null,
            allLocalStorageKeys: Object.keys(localStorage),
            allSessionStorageKeys: Object.keys(sessionStorage),
        };
    } catch (error) {
        return {
            error: error.message,
            stack: error.stack,
        };
    }
};
