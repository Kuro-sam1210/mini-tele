import React, { useState } from 'react';

const Dashboard = ({ user, onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState('games');

  const gameCategories = [
    { id: 'slots', name: 'Slots', icon: '🎰', count: 150 },
    { id: 'table', name: 'Table Games', icon: '🃏', count: 25 },
    { id: 'live', name: 'Live Casino', icon: '🎲', count: 30 },
    { id: 'fishing', name: 'Fishing', icon: '🎣', count: 12 }
  ];

  const popularGames = [
    { name: 'Fortune Tiger', category: 'Slots', players: '2.1k', hot: true },
    { name: 'Sweet Bonanza', category: 'Slots', players: '1.8k', hot: true },
    { name: 'Gates of Olympus', category: 'Slots', players: '1.5k', hot: false },
    { name: 'Mahjong Ways', category: 'Slots', players: '1.2k', hot: true },
    { name: 'Dragon Hatch', category: 'Slots', players: '980', hot: false },
    { name: 'Wild Bandito', category: 'Slots', players: '850', hot: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={user.avatar} 
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white mr-3"
              />
              <div>
                <h2 className="font-bold text-lg">{user.name}</h2>
                <p className="text-sm opacity-80">@{user.username}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="text-white hover:text-red-300 transition-colors"
            >
              🚪
            </button>
          </div>
          
          {/* Balance */}
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Balance</p>
                <p className="text-2xl font-bold">${user.balance.toFixed(2)}</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-sm">
                  💰 Deposit
                </button>
                <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg font-medium text-sm">
                  💸 Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {[
            { id: 'games', name: 'Games', icon: '🎮' },
            { id: 'promotions', name: 'Promos', icon: '🎁' },
            { id: 'agent', name: 'Agent', icon: '👥' },
            { id: 'profile', name: 'Profile', icon: '👤' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <div className="text-lg">{tab.icon}</div>
              <div className="text-xs">{tab.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === 'games' && (
          <div>
            {/* Game Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4">Game Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {gameCategories.map(category => (
                  <div 
                    key={category.id}
                    className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h4 className="font-bold text-gray-800">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.count} games</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Games */}
            <div>
              <h3 className="text-lg font-bold mb-4">🔥 Popular Games</h3>
              <div className="space-y-3">
                {popularGames.map((game, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                        🎰
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-bold text-gray-800">{game.name}</h4>
                          {game.hot && (
                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              HOT
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{game.category} • {game.players} playing</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-700 transition-colors">
                      Play
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">🎁 Active Promotions</h3>
            
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
              <h4 className="font-bold text-xl mb-2">Welcome Bonus</h4>
              <p className="mb-4">Get 100% match bonus up to $500 on your first deposit!</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold">
                Claim Now
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h4 className="font-bold text-xl mb-2">Daily Cashback</h4>
              <p className="mb-4">Get 10% cashback on all losses, credited daily!</p>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold">
                Learn More
              </button>
            </div>
          </div>
        )}

        {activeTab === 'agent' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">👥 Agent Program</h3>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h4 className="font-bold text-lg mb-4">Become an Agent</h4>
              <p className="text-gray-600 mb-4">
                Earn commissions by referring new players. Get up to 30% revenue share!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Referrals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">$0.00</div>
                  <div className="text-sm text-gray-600">Earnings</div>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold">
                Join Agent Program
              </button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">👤 Profile Settings</h3>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center mb-6">
                <img 
                  src={user.avatar} 
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-purple-200 mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">{user.name}</h4>
                  <p className="text-gray-600">@{user.username}</p>
                  <p className="text-sm text-gray-500">ID: {user.id}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  🎮 Game History
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  💰 Transaction History
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  🔔 Notifications
                </button>
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  ⚙️ Settings
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;