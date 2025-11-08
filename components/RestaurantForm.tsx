
import React, { useState } from 'react';
import type { Restaurant, Menu, MenuItem, RestaurantLink, RestaurantImage } from '../types';
import { PlusIcon, TrashIcon, CameraIcon, FoodIcon, LinkIcon } from './icons';

interface RestaurantFormProps {
  onAddRestaurant: (restaurant: Restaurant) => void;
}

const initialRestaurantState = {
  name: '',
  menus: [],
  links: [],
  images: [],
};

const RestaurantForm: React.FC<RestaurantFormProps> = ({ onAddRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState<{
    name: string;
    menus: Menu[];
    links: RestaurantLink[];
    images: RestaurantImage[];
  }>(initialRestaurantState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRestaurant(prev => ({ ...prev, name: e.target.value }));
  };

  const handleAddMenu = () => {
    setNewRestaurant(prev => ({
      ...prev,
      menus: [...prev.menus, { id: crypto.randomUUID(), name: '', items: [] }],
    }));
  };

  const handleRemoveMenu = (menuId: string) => {
    setNewRestaurant(prev => ({ ...prev, menus: prev.menus.filter(m => m.id !== menuId) }));
  };

  const handleMenuChange = (menuId: string, value: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      menus: prev.menus.map(m => (m.id === menuId ? { ...m, name: value } : m)),
    }));
  };

  const handleAddMenuItem = (menuId: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      menus: prev.menus.map(m =>
        m.id === menuId
          ? { ...m, items: [...m.items, { id: crypto.randomUUID(), name: '', price: '' }] }
          : m
      ),
    }));
  };

  const handleRemoveMenuItem = (menuId: string, itemId: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      menus: prev.menus.map(m =>
        m.id === menuId ? { ...m, items: m.items.filter(i => i.id !== itemId) } : m
      ),
    }));
  };

  const handleMenuItemChange = (menuId: string, itemId: string, field: 'name' | 'price', value: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      menus: prev.menus.map(m =>
        m.id === menuId
          ? {
              ...m,
              items: m.items.map(i => (i.id === itemId ? { ...i, [field]: value } : i)),
            }
          : m
      ),
    }));
  };

  const handleAddLink = () => {
    setNewRestaurant(prev => ({
      ...prev,
      links: [...prev.links, { id: crypto.randomUUID(), title: '', url: '' }],
    }));
  };
  
  const handleRemoveLink = (linkId: string) => {
    setNewRestaurant(prev => ({ ...prev, links: prev.links.filter(l => l.id !== linkId) }));
  };

  const handleLinkChange = (linkId: string, field: 'title' | 'url', value: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      links: prev.links.map(l => (l.id === linkId ? { ...l, [field]: value } : l)),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // FIX: Explicitly type `file` as `File` to fix type inference issues.
      Array.from(e.target.files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newImage: RestaurantImage = {
              id: crypto.randomUUID(),
              src: event.target.result as string,
              alt: file.name,
            };
            setNewRestaurant(prev => ({ ...prev, images: [...prev.images, newImage] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (imageId: string) => {
    setNewRestaurant(prev => ({ ...prev, images: prev.images.filter(img => img.id !== imageId) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRestaurant.name) {
      alert('Please enter a restaurant name.');
      return;
    }
    onAddRestaurant({ ...newRestaurant, id: crypto.randomUUID() });
    setNewRestaurant(initialRestaurantState);
  };
  
  const renderFieldset = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <fieldset className="border border-slate-300 dark:border-slate-600 rounded-lg p-4 mb-6">
      <legend className="text-lg font-medium text-slate-700 dark:text-slate-200 px-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </legend>
      <div className="pt-2">
        {children}
      </div>
    </fieldset>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Add a New Restaurant</h2>
      <div>
        <label htmlFor="restaurant-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Restaurant Name</label>
        <input
          type="text"
          id="restaurant-name"
          value={newRestaurant.name}
          onChange={handleInputChange}
          placeholder="e.g., The Cozy Bistro"
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white"
          required
        />
      </div>

      {renderFieldset("Menus", <FoodIcon className="w-5 h-5 text-indigo-500"/>, (
        <>
          {newRestaurant.menus.map((menu, menuIndex) => (
            <div key={menu.id} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={menu.name}
                  onChange={(e) => handleMenuChange(menu.id, e.target.value)}
                  placeholder={`Menu ${menuIndex + 1} Name`}
                  className="flex-grow px-3 py-2 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-white"
                />
                <button type="button" onClick={() => handleRemoveMenu(menu.id)} className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50">
                  <TrashIcon className="w-5 h-5"/>
                </button>
              </div>
              <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-600 space-y-2">
                {menu.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input type="text" value={item.name} onChange={e => handleMenuItemChange(menu.id, item.id, 'name', e.target.value)} placeholder="Item Name" className="w-full px-2 py-1 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md text-sm text-slate-900 dark:text-white"/>
                    <input type="text" value={item.price} onChange={e => handleMenuItemChange(menu.id, item.id, 'price', e.target.value.replace(/[^0-9.]/g, ''))} placeholder="Price" className="w-24 px-2 py-1 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md text-sm text-slate-900 dark:text-white"/>
                    <button type="button" onClick={() => handleRemoveMenuItem(menu.id, item.id)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-4 h-4"/>
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddMenuItem(menu.id)} className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                  <PlusIcon className="w-4 h-4 mr-1"/> Add Item
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddMenu} className="w-full flex items-center justify-center p-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors">
            <PlusIcon className="w-5 h-5 mr-1"/> Add Menu
          </button>
        </>
      ))}

      {renderFieldset("Links", <LinkIcon className="w-5 h-5 text-indigo-500"/>, (
        <>
          <div className="space-y-2">
            {newRestaurant.links.map((link) => (
              <div key={link.id} className="flex items-center gap-2">
                <input type="text" value={link.title} onChange={e => handleLinkChange(link.id, 'title', e.target.value)} placeholder="Title (e.g., Website)" className="w-1/3 px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm text-slate-900 dark:text-white"/>
                <input type="url" value={link.url} onChange={e => handleLinkChange(link.id, 'url', e.target.value)} placeholder="https://example.com" className="w-2/3 px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md text-sm text-slate-900 dark:text-white"/>
                <button type="button" onClick={() => handleRemoveLink(link.id)} className="text-red-500 hover:text-red-700">
                  <TrashIcon className="w-4 h-4"/>
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddLink} className="w-full flex items-center justify-center p-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors mt-4">
            <PlusIcon className="w-5 h-5 mr-1"/> Add Link
          </button>
        </>
      ))}

      {renderFieldset("Pictures", <CameraIcon className="w-5 h-5 text-indigo-500"/>, (
        <>
          {newRestaurant.images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
              {newRestaurant.images.map(image => (
                <div key={image.id} className="relative group">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-md aspect-square"/>
                  <button type="button" onClick={() => handleRemoveImage(image.id)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashIcon className="w-4 h-4"/>
                  </button>
                </div>
              ))}
            </div>
          )}
          <label htmlFor="image-upload" className="w-full cursor-pointer flex items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors">
            <CameraIcon className="w-5 h-5 mr-2"/>
            <span>Upload Images</span>
            <input id="image-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange}/>
          </label>
        </>
      ))}

      <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-200 hover:scale-105">
        Save Restaurant
      </button>
    </form>
  );
};

export default RestaurantForm;