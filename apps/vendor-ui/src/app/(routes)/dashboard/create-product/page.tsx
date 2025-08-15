'use client'
import { useQuery } from '@tanstack/react-query'
import ImagePlaceHolder from 'apps/vendor-ui/src/shared/components/image-placeholder'
import { enhancements } from 'apps/vendor-ui/src/utils/AI.enhancement'
import axiosInstance from 'apps/vendor-ui/src/utils/axiosInstance'
import { ChevronRight, Wand, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ColorSelector from 'packages/components/color-selector'
import CustomProperties from 'packages/components/Custom-properties'
import CustomSpecifications from 'packages/components/custom-specifications'
import Input from 'packages/components/input'
import RichTextEditor from 'packages/components/rich-text-editor'
import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface UploadedImage {
  fileId: string;
  file_url: string;
}

const Page = ({ mobileOpen }: { mobileOpen: boolean }) => {
    const {register, control, watch, setValue, handleSubmit, formState:{errors},} = useForm()
    const [openImageModal, setOpenImageModal] = useState(false)
    // const [isChanged, setIsChanged] = useState(true)
    const [isChanged] = useState(true)
    const [activeEffect, setActiveEffect] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState('')
    const [pictureUploadingLoader, setPictureUploadingLoader] = useState(false)
    const [images, setImages] = useState<(UploadedImage | null)[]>([null])
    const [loading, setLoading] = useState(false)
    const [processing, setProcessing] = useState(false)
    const router  = useRouter()

    const {data, isLoading, error} = useQuery({
      queryKey: ["categories"],
      queryFn: async() => {
        try {
          const res = await axiosInstance.get("/product/api/get-categories")
          return res.data
        } catch (error) {
          console.log(error)
        }
      },
      staleTime: 1000 * 60 * 5,
      retry: 2,
        })

        const {data: discountCodes = [], isLoading:discountLoading} = useQuery({
          queryKey:["shop-discounts"],
          queryFn: async () => {
              const res = await axiosInstance.get("/product/api/get-discount-code")
              return res?.data?.discount_codes  || []
          }
      })

        const categories = data?.categories || []
        const subCategoriesData = data?.subCategories || {}

        const selectedCategory = watch("category")
        const regularPrice = watch("regular_price")

        const subCategories = useMemo(() => {
           return selectedCategory ? subCategoriesData[selectedCategory] || [] : []
        }, [selectedCategory, subCategoriesData])

     

   

    // const onSubmit = async (data:any) => {
    //   try {
    //     setLoading(true)
    //     await axiosInstance.post("/product/api/create-product", data)
    //     router.push("/dashboard/all-products")
    //   } catch (error: any) {
    //     toast.error(error?.data?.message);
        
    //   } finally {
    //     setLoading(false)
    //   }

       
    // }
    const onSubmit = async (data: any) => {
      try {
        setLoading(true);
    
        // Clean out null image entries before submission
        const cleanedImages = images.filter(img => img && img.fileId && img.file_url);
    
        if (cleanedImages.length === 0) {
          toast.error("Please upload at least one product image.");
          setLoading(false);
          return;
        }
    
        // Set cleaned images back into form data
        data.images = cleanedImages;
        data.unit = data.bulk_unit;
    
        await axiosInstance.post("/product/api/create-product", data);
        router.push("/dashboard/all-products");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Error creating product");
      } finally {
        setLoading(false);
      }
    };
    
    

    const convertFileToBase64 = (file:File) => {
return new Promise((resolve, reject) =>{
  const reader = new FileReader()
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
})
    }

    const handleImageChange = async (file: File | null, index: number) => {
      if(!file) return

      setPictureUploadingLoader(true)

      try {
        const fileName = await convertFileToBase64(file)
       const response = await axiosInstance.post("/product/api/upload-product-image", {fileName} )

       const uploadedImage:UploadedImage = {
        fileId: response.data.fileId,
        file_url: response.data.file_url
       }
    
       const updatedImages = [...images] 

       updatedImages[index] = uploadedImage

       if(index === images.length - 1 && updatedImages.length < 8){
        updatedImages.push(null)
       }

       setImages(updatedImages)
       setValue("images", updatedImages)
      } catch (error) {
        console.log(error)
      }finally{
        setPictureUploadingLoader(false)
      }

    }

const handleRemoveImage = async (index: number) => {
   try {
    const updatedImages = [...images]

    const imageToDelete = updatedImages[index]
    if(imageToDelete && typeof imageToDelete === "object") {
      await axiosInstance.delete("/product/api/delete-product-image", {
        data: {
          fileId: imageToDelete.fileId!
        }
      })


    }

    updatedImages.splice(index, 1)

    // Add null placeholder
    if(!updatedImages.includes(null) && updatedImages.length < 8) {
      updatedImages.push(null)
    }

    setImages(updatedImages)
    setValue("images", updatedImages)

   } catch (error) {
    console.log(error)
   }
    }

    const applyTransformation = async (transformation: string) => {
      if (!selectedImage || processing) return;
    
      setProcessing(true);
      setActiveEffect(transformation);
    
      try {
        const baseImageUrl = selectedImage.split('?')[0]; // remove any old ?tr=
        const transformedUrl = `${baseImageUrl}?tr=${transformation}`;
        setSelectedImage(transformedUrl);
      } catch (error) {
        console.error('Transformation failed:', error);
      } finally {
        setProcessing(false);
      }
    };
    

    const handleSaveDraft = () => {

    }

return (
<form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full max-w-5xl px-4 sm:px-6 md:px-8 py-6 mx-auto"
>
{/* Heading & Breadcrumbs */}
<h2 className="text-2xl py-2 font-semibold font-Poppins text-white">
Create Product
</h2>
<div className="flex items-center">
<Link href={"/dashboard"} className="text-[#80Deea] cursor-pointer">Dashboard</Link>
<ChevronRight size={20} className='opacity-[.8]'/>
<span>Create Product</span>
</div>



{/* Content Layout */}
<div className="py-4 w-full flex flex-col lg:flex-row gap-8">


{/* Left Side - Image upload section*/}
<div className="w-full lg:w-[35%] min-w-0">

{images.length > 0 && (
  <ImagePlaceHolder
  setOpenImageModal={setOpenImageModal}
  size='765 x 850'
  small={false}
  images={images}
  pictureUploadingLoader={pictureUploadingLoader}
  index={0}
  onImageChange={handleImageChange}
  setSelectedImage={setSelectedImage}
    onRemove={handleRemoveImage}
    />
)}


<div className="grid grid-cols-2 gap-3 mt-4">
  {
    images.slice(1).map((_, index) => (
      <ImagePlaceHolder
      setOpenImageModal={setOpenImageModal}
      size='765 x 850'
      images={images}
      pictureUploadingLoader={pictureUploadingLoader}
      key={index}
      small
      setSelectedImage={setSelectedImage}
      index={index + 1}
      onImageChange={handleImageChange}
        onRemove={handleRemoveImage}
        />
      
    ))
  }
</div>
</div>



{/* right side -- Form Input */}
<div className="w-full lg:w-[65%] mt-6 lg:mt-0 min-w-0">
  <div className="w-full flex flex-col lg:flex-row gap-6">

{/* Product Title Input  */}
<div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-4">

<Input
label='Product Title *'
placeholder='Enter product title'
{...register("title", { required: "Product title is required" })}
/>
{
        errors.title && (
          <p className="text-red-500 text-xs mt-1">
          {errors.title?.message as string}</p>
        )
        }

<div className="mt-2">
<Input
type='textarea'
rows={7}
cols={10}
label='Short Description * (Max 150 words)'
placeholder='Enter product description for quick view'
{...register("short_description", { required: "Description is required",
validate: (value) => {
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= 150 || `Description cannot exceed 150 words (Current: ${wordCount} words)`;
}
})}

/>
{
        errors.description && (
          <p className="text-red-500 text-xs mt-1">
          {errors.description?.message as string}</p>
        )
        }
</div>

<div className="mt-2">
<Input

label='Tags *'
placeholder='gold, silver, jewelry'
{...register("tags", { required: "Separate related products tags with a coma," })}

/>
{
        errors.title && (
          <p className="text-red-500 text-xs mt-1">
          {errors.title?.message as string}</p>
        )
        }

</div>

<div className="mt-2">
<Input
label='Warranty *'
placeholder='1 Year / No Warranty'
{...register("warranty", { required: "Warranty is required" })}
/>
{
        errors.warranty && (
          <p className="text-red-500 text-xs mt-1">
          {errors.warranty?.message as string}</p>
        )
        }
</div>

<div className="mt-2">
<Input
label='Slug *'
placeholder='product_slug'
{...register("slug", { required: "Slug is required",
pattern: {
  value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  message: "Slug must be lowercase and can only contain letters, numbers, and hyphens."
},
minLength: {
  value: 3,
  message: "Slug must be at least 3 characters long."
},
maxLength: {
  value: 50,
  message: "Slug cannot exceed 50 characters."
}

})}
/>
{
        errors.slug && (
          <p className="text-red-500 text-xs mt-1">
          {errors.slug?.message as string}</p>
        )
        }
</div>

<div className="mt-2">
<Input
label='Brand *'
placeholder='Buccellati, Cartier, etc.'
{...register("brand", { required: "Brand is required" })}
/>
{
        errors.brand && (
          <p className="text-red-500 text-xs mt-1">
          {errors.brand?.message as string}</p>
        )
        }
</div>

<div className="mt-2">
<ColorSelector control={control} errors={errors} />
</div>

<div className="mt-2">
<CustomSpecifications control={control} errors={errors} />
</div>


<div className="mt-2">
<CustomProperties control={control} errors={errors} />
</div>

<div className="mt-2">
<label className="block font-semibold text-gray-300 mb-1">
  Cash On Delivery *
</label>
<select 
{...register("cash_on_delivery", {
  required: "Cash on Delivery is required",
})}
defaultValue="no"
className='w-full border outline-none bg-transparent text-white border-gray-700 rounded-md p-2'>
  <option value="yes" className='bg-black'>Yes</option>
  <option value="no" className='bg-black'>No</option>
</select>
{
        errors.cash_on_delivery && (
          <p className="text-red-500 text-xs mt-1">
          {errors.cash_on_delivery?.message as string}</p>
        )
        }
</div>

</div>

{/* Price & Stock Inputs */}  
<div className="w-full lg:w-1/2 min-w-0 flex flex-col gap-4">

<label className="block font-semibold text-gray-300 mb-1">
Category *
</label>

{
isLoading ? (
  <p className="text-gray-500">Loading categories...</p>
) : error ? (
  <p className="text-red-500">Error loading categories</p>
) : (
  <Controller
  name='category'
  control={control}
  rules={{ required: "Category is required" }}
  render={({ field }) => (
    <select
      {...field}
      className='w-full border outline-none bg-transparent text-white border-gray-700 rounded-md p-2'
    >
      <option value="" className='bg-black'>Select Category</option>
      {categories?.map((category: string) => (
        <option key={category} value={category} className='bg-black'>
          {category}
        </option>
      ))}
    </select>
  )}
/>
)
}
{
          errors.category && (
          <p className="text-red-500 text-xs mt-1">
          {errors.category?.message as string}</p>
        )
        }

        <div className="mt-2">
<label className="block font-semibold text-gray-300 mb-1">
Sub Category *
</label>
<Controller
name='subCategory'
control={control}
rules={{ required: "Sub Category is required" }}
render={({ field }) => (
<select
  {...field}
  className='w-full border outline-none bg-transparent text-white border-gray-700 rounded-md p-2'
>
  <option value="" className='bg-black'>Select Sub Category</option>
  {subCategories && subCategoriesData[selectedCategory]?.map((subCategory: string) => (
    <option key={subCategory} value={subCategory} className='bg-black'>
      {subCategory}
    </option>
  ))}
</select>
)}
/>
        </div>

        <div className="mt-2">
        <label className="block font-semibold text-gray-300 mb-1">
          Detailed Description * (min 100 words)
        </label>
        <Controller
          name='detailed_description'
          control={control}
          rules={{
            required: "Detailed description is required",
            validate: (value) => {
              const wordCount = value?.split(/\s+/).filter((word: string) =>word).length;
              return wordCount >= 100 || `Description must be at least 100 words (Current: ${wordCount} words)`;
            }
          }}
          render={({ field }) => (
            <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            
            />
          )}
        />
        {errors.detailed_description && (
          <p className="text-red-500 text-xs mt-1">
            {errors.detailed_description.message as string}
          </p>
        )}
        </div>

        <div className="mt-2">
        <Input
          label='Video URL'
          placeholder='https://www.youtube.com/watch?v=example'
          {...register("video_url", {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/,
              message: "Invalid YouTube URL format! Use format: https://www.youtube.com/watch?v=example"
            }
          })}
        />
        {errors.video_url && (
          <p className="text-red-500 text-xs mt-1">
            {errors.video_url.message as string}
          </p>
        )}
        </div>

        <div className="mt-2">
        <Input
          label='Regular Price *'
          placeholder='20$'
          {...register("regular_price", {
            valueAsNumber: true,
            required: "Regular price is required",
            min: {
              value: 1,
              message: "Price must be at least 1$"
            },
            validate: (value) => 
              !isNaN(value) || "Price must be a valid number"
          })}
        />
        {errors.regular_price && (
          <p className="text-red-500 text-xs mt-1">
            {errors.regular_price.message as string}
          </p>
        )}
        </div>

        <div className="mt-2">
        <Input
          label='Sale Price'
          placeholder='15$'
          {...register("sale_price", {
            required: "Sale price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Sale price cannot be at less than 1$"
            },
            validate: (value) => {
              if (isNaN(value)) return "Sale price must be a valid number";
              if (regularPrice && value >= regularPrice) {
                return "Sale price must be less than regular price";
              }
              return
              
            }
          })}
        />
        {errors.sale_price && (
          <p className="text-red-500 text-xs mt-1">
            {errors.sale_price.message as string}
          </p>
        )}
        </div>

        <div className="mt-2 ">
        <div className="flex gap-2  flex-col md:flex-row">
          <Input
            label='Stock Quantity *'
            placeholder='100'
            {...register("stock", {
              required: "Stock quantity is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Stock quantity must be at least 1"
              },
              max: {
                value: 10000, 
                message: "Stock quantity cannot exceed 1,000"
              },
              validate: (value) => {
                if (isNaN(value)) return "Stock quantity must be a valid number";
                if (!Number.isInteger(value)) return "Stock quantity must be a whole number!";                
                return true;
              }
            })}
          />
            {/* Unit Selector */}
            <div className="flex flex-col space-y-1">
<label htmlFor="bulk_unit" className="block font-semibold text-gray-300">
  Unit *
</label>
<select
  id="bulk_unit"
  {...register("bulk_unit", {
    required: "Unit is required",
  })}
  defaultValue=""
  className="w-32 h-10 border border-gray-700 bg-transparent text-white rounded-md px-3 text-sm focus:outline-none"
>
  <option value="" disabled>Select unit</option>
  <option value="kg" className="bg-black">kg</option>
  <option value="ton" className="bg-black">ton</option>
  <option value="liter" className="bg-black">liter</option>
  <option value="meter" className="bg-black">meter</option>
  <option value="pack" className="bg-black">pack</option>
  <option value="box" className="bg-black">box</option>
  <option value="carton" className="bg-black">carton</option>
</select>
{errors.bulk_unit && (
  <p className="text-red-500 text-xs mt-1">
    {errors.bulk_unit.message as string}
  </p>
)}
</div>


          {errors.stock_quantity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.stock_quantity.message as string}
            </p>
          )}
            {errors.bulk_unit && (
  <p className="text-red-500 text-xs mt-1">
    {errors.bulk_unit.message as string}
  </p>
)}
</div>
          </div>


{/* size is for bb2c not b2b */}
        {/* <div className="mt-2">
          <SizeSelector control={control} errors={errors} />
        </div> */}

{/* <div className="mt-2">
<label className="block font-semibold text-gray-300 mb-1">
  Quantity & Unit *
</label>

<div className="flex gap-2">
  
  <Input
    type="number"
    placeholder="Enter quantity"
    min={1}
    {...register("bulk_quantity", {
      required: "Quantity is required",
      valueAsNumber: true,
      min: {
        value: 1,
        message: "Quantity must be at least 1",
      },
      validate: (value) =>
        !isNaN(value) || "Quantity must be a valid number",
    })}
  />


  <select
    {...register("bulk_unit", {
      required: "Unit is required",
    })}
    defaultValue=""
    className=" border border-gray-700 bg-transparent text-white rounded-md p-2"
  >
    <option value="" disabled>Select unit</option>
    <option value="kg" className="bg-black">kg</option>
    <option value="ton" className="bg-black">ton</option>
    <option value="liter" className="bg-black">liter</option>
    <option value="meter" className="bg-black">meter</option>
    <option value="pack" className="bg-black">pack</option>
    <option value="box" className="bg-black">box</option>
    <option value="carton" className="bg-black">carton</option>
  </select>
</div>


{errors.bulk_quantity && (
  <p className="text-red-500 text-xs mt-1">
    {errors.bulk_quantity.message as string}
  </p>
)}
{errors.bulk_unit && (
  <p className="text-red-500 text-xs mt-1">
    {errors.bulk_unit.message as string}
  </p>
)}
</div> */}

<div className="mt-3">
<label className='block font-semibold text-gray-300 mb-1'>
  Select Discount Codes (optional)
</label>
{
  discountLoading ? (
    <p className="text-gray-400">
      Loading discount codes ...
    </p>
  ) : (
    <div className="flex flex-wrap gap-2">
      {discountCodes?.map((code:any) => (
        <button key={code.id}
        type='button'
        className={`px-3 py-1 rounded-md text-sm font-semibold border ${watch("discountCodes")?.includes(code.id) 
          ? "bg-blue-600 text-white border-blue-600" 
          : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
        }`}
        onClick={() => {
          const currentSelection = watch("discountCodes") || []
          const updatedSelection = currentSelection?.includes(code.id)
          ? currentSelection.filter((id:string) => id !== code.id)
          : [...currentSelection, code.id]
          setValue("discountCodes", updatedSelection)
        }}
        >
          {code?.public_name } ({code.discountValue}
          {code.discountType === "percentage" ? "%" : "$"}
          )
        </button>
      ))}
    </div>
  )
}

</div>


        
        
</div>

</div>
</div>
</div>

{openImageModal && (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
  <div className="bg-gray-800 p-6 rounded-lg w-[450px] text-white">
    <div className="flex justify-between items-center pb-3 mb-4">
    <h2 className="text-lg font-semibold">Enhance Product Image</h2>
    <X size={20} className='cursor-pointer' onClick={() => setOpenImageModal(!openImageModal)} />
</div>
<div className="w-full h-[250px] relative rounded-md overflow-hidden border border-gray-600">
<Image
src={selectedImage}
alt="product-image"
fill
sizes="(max-width: 768px) 100vw, 450px"
style={{ objectFit: 'cover' }}
/>

</div>

{
  selectedImage && (
    <div className="mt-4 space-y-2">
      <h3 className="text-white text-sm font-semibold">
        AI Enhancements
      </h3>
      <div className="grid grid-cols-2 gap-3 max-h-[250px] overflow-y-auto">
        {enhancements?.map(({label,effect}) => (
          <button
          key={effect}
          className={`p-2 rounded-md flex items-center gap-2 ${activeEffect ===effect ? "bg-blue-600 text-white" : 
            "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => applyTransformation (effect)}
          disabled={processing}
          >
            <Wand size={18}/>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

</div>
  </div>
  )
}

<div className="mt-6 flex justify-end gap-3">
{
  isChanged && (
    <button
    type='button'
    onClick={handleSaveDraft}
    className='px-4 py-2 bg-gray-700 text-white rounded-md'>
      Save Draft
    </button>
  )
}
<button
type='submit'
className='px-4 py-2 bg-blue-600 text-white rounded-md'
disabled={loading}
>
  {loading ? "Creating ..." : "Create"}
</button>
</div>

</form>
)
}

export default Page
