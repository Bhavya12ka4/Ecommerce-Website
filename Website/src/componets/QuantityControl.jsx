import React from 'react'
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

function QuantityControl({ handleQuantityChange, handleRemoveItem, quantity, item, value }) {
    return (
        <>
            {value === 1 ?
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-zinc-800 rounded px-2 py-1">
                        <button className="text-gray-400 hover:text-white" onClick={() => handleQuantityChange(item.id, -1)}><Minus size={14} /></button>
                        <span className="text-white text-sm font-medium">{quantity}</span>
                        <button className="text-gray-400 hover:text-white" onClick={() => handleQuantityChange(item.id, 1)}><Plus size={14} /></button>
                    </div>
                    <button className="text-red-500/80 hover:text-red-500 transition-colors" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 size={18} />
                    </button>
                </div>
                :
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-2 border border-zinc-700 text-white
                    hover:bg-[#D63A1F] hover:text-white p-3
                    ">
                        <button className="text-gray-400 hover:text-white" onClick={() => handleQuantityChange(item.id, -1)}><Minus size={17} /></button>
                        <span className="text-white font-medium text-lg">{quantity}</span>
                        <button className="text-gray-400 hover:text-white" onClick={() => handleQuantityChange(item.id, 1)}><Plus size={17} /></button>
                    </div>
                </div>
            }
        </>
    )
}

export default QuantityControl