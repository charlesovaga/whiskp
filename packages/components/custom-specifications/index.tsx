

import React from 'react'
import { Controller, useFieldArray } from 'react-hook-form';
import Input from '../input';
import { PlusCircle, Trash } from 'lucide-react';

const CustomSpecifications = ({control, errors}:any) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: 'custom_specifications'
    });

  return (
    <div>
      <label className='block font-semibold text-gray-300 mb-1'>
        Custom Specifications
      </label>
      <div className="flex flex-col gap-3">
        {fields ?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Controller
              name={`custom_specifications.${index}.name`}
              control={control}
              rules={{ required: 'Specification name is required' }}
              render={({ field }) => (
                <Input
                label='Specification Name *'
                  placeholder='e.g, Color, Size, etc.'
                  {...field}
                />
              )}
              />
              <Controller 
              name={'custom_specifications.${index}.value'}
              control={control}
                rules={{ required: 'Value is required' }}
                render={({ field }) => (
                <Input
                label='Value *'
                    placeholder='e.g., gold, silver, etc.'
                    {...field}
                />
                )}
                />
                <button type='button'
                className='text-red-500 hover:text-red-700'
                onClick={() => remove(index)}>
                    <Trash size={16} className=' mt-6' />

                </button>
          </div>
        ))}
      
      <button className='flex items-center gap-2 text-blue-500 hover:text-blue-700'
      onClick={() => append({ name: '', value: '' })}>

<PlusCircle size={16} /> Add Specification 
      </button>
      </div>

        {errors.custom_specifications && (
            <p className="text-red-500 text-xs mt-1">
            {errors.custom_specifications.message}
            </p>
        )}
    </div>
  )
}

export default CustomSpecifications
