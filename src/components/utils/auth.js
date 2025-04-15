// Auth utility functions
export const saveUserData = (userData, token, userType) => {
  if (!userData || !token) return false;

  try {
    const formattedUserType =
      userType?.toLowerCase() ||
      userData.userType?.toLowerCase() ||
      userData.role?.toLowerCase() ||
      'user';

    const userDataToStore = {
      userId: userData.userId || userData._id || userData.id,
      username: userData.username || userData.name,
      email: userData.email,
      token: token,
      isLoggedin: true,
      userType: formattedUserType,
      lastLogin: new Date().toISOString(),
    };

    localStorage.setItem('user', JSON.stringify(userDataToStore));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const isLoggedIn = () => {
  const user = getCurrentUser();
  return !!user?.token && !!user?.isLoggedin;
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
  return userType === 'admin' ? '/admin/dashboard' : '/dashboard';
};

export const logout = () => {
  try {
    localStorage.removeItem('user');
    sessionStorage.removeItem('signupData');
    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
  }
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
  const user = getCurrentUser();
  if (!user?.lastLogin) return true;

  const lastLogin = new Date(user.lastLogin);
  const now = new Date();
  const hoursDiff = (now - lastLogin) / (1000 * 60 * 60);
  
  // Token expires after 24 hours
  return hoursDiff > 24;
};

export const getUsername = () => {
  const user = getCurrentUser();
  return user?.username || null;
}; 