'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading"
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/input";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import {colors} from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import axios from "axios";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/actions/getCurrentUser";

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


const AddProductForm = ({currentUser:any}) => {

        
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);


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

      
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log('Product data', data);
        //Upload images to firebase
        //Save products to mongodb
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = [];

        if(!data.category) {
            setIsLoading(false)
            return toast.error("Categorie n'est pas selectionnée ")
        }

        if(!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error("Pas d'images selectionnées !")
        }

        const handleImageUploads = async () => {
            toast("Creation de l'article en cours..., patientez... ")
            try {
                for(const item of data.images){
                    if(item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                }
                            },
                            (error) => {
                                console.log('Error uploading image',error);
                                reject(error)
                            },
                            () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                    console.log('File available at', downloadURL)
                                    resolve()
                            }).catch((error) => {
                                console.log('Error getting the download Link', error);
                                reject(error);
                            });
                        }
                 )})
                }
            }
            }catch(error){
                setIsLoading(false)
                console.log('Error handling image uploads', error);
                return toast.error('Error handling image uploads');
            }
        };

        await handleImageUploads();
        const productData = {...data, images: uploadedImages}

        axios.post('/api/product/route', productData)
        .then(()  => {
            toast.success('Article crée');
            setIsProductCreated(true);
            router.refresh();
        })
        .catch((error) => {
            console.log(error.response.data);
            toast.error("Quelque chose s'est mal passée lors de l'insertion du produit")
        })
        .finally(() => {
            setIsLoading(false);
        })
        

    };

    const category = watch('category');
  

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
            <Button label={isLoading ? 'En cours...':"Ajouter un article"}
            onClick={handleSubmit(onSubmit)}
        />
    </>
  )
}

export default AddProductForm
