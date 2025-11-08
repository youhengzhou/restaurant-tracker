
import React from 'react';
import type { Restaurant } from '../types';
import { FoodIcon, LinkIcon } from './icons';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
      {restaurant.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {restaurant.images.slice(0, 3).map((image, index) => (
            <div key={image.id} className={`
              ${index === 0 ? 'col-span-2 row-span-2 md:col-span-2' : ''}
              ${restaurant.images.length === 2 && index === 1 ? 'col-span-2' : ''}
              ${restaurant.images.length === 1 ? 'col-span-full' : ''}
            `}>
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-square" />
            </div>
          ))}
        </div>
      )}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">{restaurant.name}</h2>

        {restaurant.menus.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">
              <FoodIcon className="w-5 h-5 mr-2 text-indigo-500" />
              Menus
            </h3>
            <div className="space-y-4">
              {restaurant.menus.map(menu => (
                <div key={menu.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{menu.name}</h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                    {menu.items.map(item => (
                      <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span className="font-mono">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {restaurant.links.length > 0 && (
          <div>
            <h3 className="flex items-center text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3">
              <LinkIcon className="w-5 h-5 mr-2 text-indigo-500" />
              Links
            </h3>
            <ul className="space-y-2">
              {restaurant.links.map(link => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 underline"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
