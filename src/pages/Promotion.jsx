import Layout from '../components/Layout';

const Promotion = ({ navigate }) => {
  return (
    <Layout navigate={navigate} currentScreen="promotion">
      <div className="page p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Promotions</h1>
        <p className="text-gray-400">Promotional content coming soon...</p>
      </div>
    </Layout>
  );
};

export default Promotion;
