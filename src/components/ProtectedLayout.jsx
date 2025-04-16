import Layout from './Layout';
import ProtectedRoute from './ProtectedRoutes';

const ProtectedLayout = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

export default ProtectedLayout;