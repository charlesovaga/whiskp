import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const defaultColors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FFFF33', // Yellow
    '#FF33FF', // Magenta
    '#33FFFF', // Cyan
    '#FFFFFF', // White
    '#808080', // Gray
    '#FFA500'  // Orange
]

const ColorSelector = ({ control, errors }: any) => {
    const [customColors, setCustomColors] = useState<string[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [newColor, setNewColor] = useState('#FFFFFF');
    return (
        <div className="mt-2">
            <label className="block mb-1 font-semibold text-gray-300">Colors</label>
            <Controller 
            name="colors"
            control={control}
            render={({ field}) => (
                <div className="flex flex-wrap gap-3">
                    {[...defaultColors, ...customColors].map((color) => {
                        const isSelected = (field.value || []). includes(color);
                        const isLightColor =['#FFFFFF', '#FFFFOO'].includes(color);

                        return ( <button type="button" key={color}
                        onClick={() => field.onChange(
                            isSelected ? field.value.filter((c: string) => c !== color) : [...(field.value || []),  color]
                        )}
                        className={`w-7 h-7 rounded-md my-1  flex items-center justify-center border-2 transition ${isSelected ? 'scale-110 border-white' : 'border-transparent'} ${isLightColor ? 'border-gray-600' : ''}`}
                        style={{ backgroundColor: color }}
                        />
                    )
                        })}

                        {/* Add new color */} 
                        <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-gray-500bg-gray-800 hover:bg-gray-700 transition"
                        onClick={() => setShowColorPicker(!showColorPicker)}>
                            <Plus size={16} color="white"/>
                        </button>

                        {/* color picker */}
                        {
                            showColorPicker && (
                                <div className="relative flex items-center gap-2">
                            <input type="color" value={newColor}
                            onChange={(e) => setNewColor(e.target.value)} 
                            className="w-10 h-10 p-0 border-none cursor-pointer"
                            />
                            <button type="button"
                            onClick={() => {
                                setCustomColors([...customColors, newColor]);
                                setShowColorPicker(false);
                            }}
                            className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm"
                            
                            >
                                Add
                                </button>
                        </div>
                            )
                        }
            </div>
            )}/>
            </div>
    )
}
export default ColorSelector;
