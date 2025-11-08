
import React, { useState } from 'react';
import type { Restaurant } from './types';
import RestaurantForm from './components/RestaurantForm';
import RestaurantCard from './components/RestaurantCard';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const handleAddRestaurant = (restaurant: Restaurant) => {
    setRestaurants(prev => [restaurant, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Restaurant Tracker
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Your personal culinary diary.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky top-24">
            <RestaurantForm onAddRestaurant={handleAddRestaurant} />
          </div>
          <div className="lg:col-span-2 space-y-8">
            {restaurants.length > 0 ? (
              restaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div className="text-center bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-xl font-medium text-slate-900 dark:text-white">No restaurants yet</h3>
                <p className="mt-1 text-slate-500 dark:text-slate-400">Get started by adding a new restaurant using the form.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
