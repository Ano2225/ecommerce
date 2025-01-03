'use client'
import {Order, Product, User} from '@prisma/client';
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import { formatPrice } from '@/utils/formatPrice';
import { formatNumber } from '@/utils/formatNumber';

interface SummaryProps {
    orders : Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
        [key: string]: {
            label: string;
            digit: number;
        }
}

const Summary: React.FC<SummaryProps> = ({
    orders,
    products,
    users
}) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Total des ventes',
            digit:0,
        },
        products: {
            label:'Total des articles',
            digit:0
        },
        orders: {
            label:'Total des commandes',
            digit:0
        },
        paidOrders: {
            label:'Commandes payées',
            digit:0
        },
        unpaidOrders: {
            label:'Commandes non payées',
            digit:0
        },
        users: {
            label: 'Total des utilisateurs',
            digit:0
        }
    })

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = {...prev}

            const totalSale = orders.reduce((acc, item) => {
                if(item.status ==='Payé'){
                    return acc + item.amount
                }else return acc
            },0)

            const paidOrders = orders.filter((order) => {
                return order.status === 'Payé'
            })

            const unpaidOrders = orders.filter((order) => {
               return order.status === 'En attente'
            })

            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = orders.length;

            return tempData;
        })
    }, [orders, products, users])

    const summaryKeys = Object.keys(summaryData);

  return (
    <div className='max-w-[1150px] m-auto'>
      <div className='mb-4 mt-8'>
            <Heading title='STATISTIQUES' center />
      </div>
      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
            {
                summaryKeys && summaryKeys.map((key) => {
                    return <div key={key} className='rounded-xl border-2 p-4 flex flex-col
                    items-center gap-2 transition'>
                        <div className='text-xl md:text-4xl font-bold'>
                            {
                                summaryData[key].label === "Total des ventes" ? 
                                <>{formatPrice(summaryData[key].digit)}</> :
                                <>{formatNumber(summaryData[key].digit)} </>
                            }
                        </div>
                        <div>{summaryData[key].label}</div>
                    </div>
                })
            }
      </div>
    </div>
  )
}

export default Summary
