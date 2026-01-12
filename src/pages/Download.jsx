import Layout from '../components/Layout';

const Download = ({ navigate }) => {
  return (
    <Layout navigate={navigate} currentScreen="download">
      <div className="page p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Download</h1>
        <p className="text-gray-400">Download content coming soon...</p>
      </div>
    </Layout>
  );
};

export default Download;
