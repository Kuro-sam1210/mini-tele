import Layout from '../components/Layout';

const Customer = ({ navigate }) => {
  return (
    <Layout navigate={navigate} currentScreen="customer">
      <div className="page p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Customer Service</h1>
        <p className="text-gray-400">Customer service content coming soon...</p>
      </div>
    </Layout>
  );
};

export default Customer;
