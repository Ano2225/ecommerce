'use client'

import Heading from "@/app/components/Heading"
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import { categories } from "@/utils/Categories";
import {colors} from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    console.log('Images',images)


    const {register, 
        handleSubmit, 
        setValue,
         watch,
         reset,
         formState: {errors}
         } = useForm<FieldValues>({
            defaultValues: {
                name:"",
                description:'',
                brand:"",
                category: "",
                inStock: false,
                images: [],
                price:""
            }
    });

    useEffect(() => {
        setCustomValue("images", images);
    }, [images]);

    useEffect(() => {
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated])

    const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev){
                return [value];
            }
            return[...prev, value]
        })
    },[]);

    const removeImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev){
                const filteredImages = prev.filter(
                    (item) => item.color !== value.color
                );
                return filteredImages;
            }

            return prev;
        })
    },[]);


  return (
    <>
    <Heading  title="Ajouter un article" center/>
    <Input 
    id="name"
    label="Nom"
    disabled={isLoading}
    register={register}
    errors = {errors}
    required
    />
    <Input 
    id="price"
    label="Prix"
    disabled={isLoading}
    register={register}
    errors = {errors}
    type="number"
    required
    />
    <Input 
    id="brand"
    label="Marque"
    disabled={isLoading}
    register={register}
    errors = {errors}
    type="number"
    required
    />
    <TextArea
    id="description"
    label="Description"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
     />
    <CustomCheckBox 
    id="inStock"
     register={register} 
     label="Produit En Stock" 
     />
     <div className="w-full font-medium">
        <div className="mb-2 font-semibold">
            Selectionnez une categorie
        </div>
        <div className="grid grid-cols-2
        md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
            {categories.map((item) => {
                if(item.label === "Tous") {
                    return null;
                }
                
                return <div key={item.label} className="col-span">
                    <CategoryInput 
                    onClick={(category) => setCustomValue('category',category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                    />
             </div>;
            })}
        </div>
     </div>
     <div className="w-full
         flex
         flex-col
         flex-wrap
         gap-4
         ">
            <div>
                <div className="font-bold">
                    Selectionnez la couleur disponible et televerser la photo
                </div>
                <div className="text-sm">
                    Vous devez choisir une image pour chaque couleur selectionnée sinon 
                    les couleurs seront ignorées .
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {colors.map((item,index) => {
                    return (
                    <SelectColor
                    key={index}
                    item={item}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageToState}
                    isProductCreated={false}
                    />
                );
                })}
            </div>
    </div>


    </>
  )
}

export default AddProductForm
